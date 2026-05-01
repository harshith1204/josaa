"""
POST /chat — Streaming SSE endpoint.

Request body:
  {
    "question": "How are the hostels at NIT Manipur?",
    "college":  "NIT Manipur",      # human-readable name
    "history":  [                    # optional prior turns
      { "role": "user",      "content": "..." },
      { "role": "assistant", "content": "..." }
    ]
  }

Response: text/event-stream
  data: {"token": "The hostels..."}
  data: {"token": " at NIT"}
  ...
  data: [DONE]

On error:
  data: {"error": "message"}
  data: [DONE]
"""
from __future__ import annotations

import json
import re
from typing import List, Optional

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from pydantic import BaseModel

from app.agent.graph import agent_graph

router = APIRouter()


class HistoryItem(BaseModel):
    role: str   # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    question: str
    college: Optional[str] = None
    history: Optional[List[HistoryItem]] = None


def _slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def _build_messages(req: ChatRequest) -> list:
    messages = []

    # Inject a brief college context message so tools know the college_id
    if req.college:
        college_id = _slugify(req.college)
        messages.append(
            HumanMessage(
                content=(
                    f"[Context: the user is asking about {req.college} "
                    f"(college_id: {college_id}). "
                    "Use this college_id when calling tools.]"
                )
            )
        )
        messages.append(
            AIMessage(content=f"Understood. I'll answer questions about {req.college}.")
        )

    # Append conversation history
    for item in req.history or []:
        if item.role == "user":
            messages.append(HumanMessage(content=item.content))
        elif item.role == "assistant":
            messages.append(AIMessage(content=item.content))

    # Current user question
    messages.append(HumanMessage(content=req.question))
    return messages


async def _token_stream(req: ChatRequest):
    messages = _build_messages(req)
    try:
        async for event in agent_graph.astream_events(
            {"messages": messages}, version="v2"
        ):
            kind = event.get("event", "")
            if kind == "on_chat_model_stream":
                chunk = event["data"].get("chunk")
                if chunk and chunk.content:
                    yield f"data: {json.dumps({'token': chunk.content})}\n\n"
    except Exception as exc:
        yield f"data: {json.dumps({'error': str(exc)})}\n\n"
    finally:
        yield "data: [DONE]\n\n"


@router.post("/chat")
async def chat(req: ChatRequest):
    return StreamingResponse(
        _token_stream(req),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",   # disable nginx buffering
            "Connection": "keep-alive",
        },
    )
