"""
Supabase client — singleton used across the entire app.

Uses the service-role key so the agent can read all tables
(RLS SELECT policies are public, but we use service role to
 be consistent and to allow upserts during /ingest).
"""
from __future__ import annotations

import os
from functools import lru_cache

from supabase import create_client, Client


@lru_cache(maxsize=1)
def get_supabase() -> Client:
    url = os.environ["SUPABASE_URL"]
    key = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    return create_client(url, key)


# Module-level convenience accessor
def supabase() -> Client:
    return get_supabase()
