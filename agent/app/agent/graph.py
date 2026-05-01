"""
LangGraph ReAct agent — wraps all four tools and Kimi K2.5.

Uses create_react_agent from langgraph.prebuilt for minimal boilerplate.
The agent is a module-level singleton; import `agent_graph` to use it.
"""
from __future__ import annotations

from langgraph.prebuilt import create_react_agent

from app.core.llm import get_llm
from app.agent.prompts import SYSTEM_PROMPT
from app.tools.knowledge import search_college_knowledge
from app.tools.cutoffs import lookup_cutoffs
from app.tools.placements import get_placement_stats
from app.tools.media import get_media_urls


_tools = [
    search_college_knowledge,
    lookup_cutoffs,
    get_placement_stats,
    get_media_urls,
]

agent_graph = create_react_agent(
    model=get_llm(streaming=True),
    tools=_tools,
    state_modifier=SYSTEM_PROMPT,
)
