import json
import subprocess
import sys

with open('C:/Users/sivak/Desktop/cutoffs.ai/data/iit-kgp-knowledge-base.json', 'r', encoding='utf-8') as f:
    kb = json.load(f)

def flatten_to_chunks(section_key, data, prefix=""):
    """Convert nested JSON to readable text chunks."""
    chunks = []

    if isinstance(data, str):
        chunks.append(f"{prefix}: {data}")
    elif isinstance(data, list):
        for item in data:
            if isinstance(item, dict):
                parts = []
                for k, v in item.items():
                    if isinstance(v, (str, int, float, bool)):
                        parts.append(f"{k}: {v}")
                chunks.append(f"{prefix} - {', '.join(parts)}")
            elif isinstance(item, str):
                chunks.append(f"{prefix}: {item}")
    elif isinstance(data, dict):
        # Check if it has simple values or nested
        simple_parts = []
        for k, v in data.items():
            if isinstance(v, (str, int, float, bool)):
                simple_parts.append(f"{k}: {v}")
            elif isinstance(v, (list, dict)):
                sub_prefix = f"{prefix} > {k}" if prefix else k
                chunks.extend(flatten_to_chunks(section_key, v, sub_prefix))

        if simple_parts:
            chunk_text = f"{prefix}: " + ". ".join(simple_parts) if prefix else ". ".join(simple_parts)
            chunks.append(chunk_text)

    return chunks

# Generate all chunks
all_chunks = []
for section_key, section_data in kb['sections'].items():
    section_label = section_key.replace('_', ' ').title()
    chunks = flatten_to_chunks(section_key, section_data, section_label)

    # Some chunks might be too long - split them
    for chunk in chunks:
        if len(chunk) > 1000:
            # Split on sentences
            sentences = chunk.split('. ')
            current = ""
            for s in sentences:
                if len(current) + len(s) > 800:
                    if current:
                        all_chunks.append((section_key, current.strip()))
                    current = s
                else:
                    current = current + ". " + s if current else s
            if current:
                all_chunks.append((section_key, current.strip()))
        else:
            all_chunks.append((section_key, chunk))

print(f"Total chunks: {len(all_chunks)}")

# Write SQL file
sql_lines = []
for section, text in all_chunks:
    safe_text = text.replace("'", "''")
    sql_lines.append(f"INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIT Kharagpur', '{section}', '{safe_text}');")

with open('C:/Users/sivak/Desktop/cutoffs.ai/chatbot/seed.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines))

print(f"Written {len(sql_lines)} SQL inserts to seed.sql")

# Preview first 5 chunks
for section, text in all_chunks[:5]:
    print(f"\n[{section}] {text[:150]}...")
