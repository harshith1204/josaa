"""
LLM: Kimi K2.5 via Cloudflare AI OpenAI-compatible endpoint.

Cloudflare exposes an OpenAI-compatible /v1/chat/completions endpoint so
we can use langchain_openai.ChatOpenAI without any custom HTTP code.
"""
from __future__ import annotations

import os
from functools import lru_cache

from langchain_openai import ChatOpenAI


@lru_cache(maxsize=2)
def get_llm(streaming: bool = True) -> ChatOpenAI:
    account_id = os.environ["CLOUDFLARE_ACCOUNT_ID"]
    return ChatOpenAI(
        model="@cf/moonshotai/kimi-k2.5",
        api_key=os.environ["CLOUDFLARE_AI_TOKEN"],
        base_url=f"https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1",
        streaming=streaming,
        temperature=0.2,
        max_tokens=1024,
        # Kimi K2.5 supports tool calling natively
        model_kwargs={"stream_options": {"include_usage": False}},
    )
