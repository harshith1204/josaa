import json
import re

with open('C:/Users/sivak/Desktop/cutoffs.ai/data/iit-kgp-knowledge-base.json', 'r', encoding='utf-8') as f:
    kb = json.load(f)

def extract_facts(data, section, prefix=""):
    """Recursively extract individual facts from nested JSON."""
    facts = []

    if isinstance(data, str) and len(data) > 10:
        label = f"{prefix}: {data}" if prefix else data
        facts.append((section, label))

    elif isinstance(data, list):
        for item in data:
            if isinstance(item, str) and len(item) > 10:
                label = f"{prefix}: {item}" if prefix else item
                facts.append((section, label))
            elif isinstance(item, dict):
                # Build a readable sentence from dict
                parts = []
                for k, v in item.items():
                    if isinstance(v, (str, int, float, bool)):
                        parts.append(f"{k}: {v}")
                if parts:
                    label = f"{prefix} - {'. '.join(parts)}" if prefix else '. '.join(parts)
                    facts.append((section, label))
                # Recurse into nested values
                for k, v in item.items():
                    if isinstance(v, (list, dict)):
                        facts.extend(extract_facts(v, section, f"{prefix} > {k}" if prefix else k))

    elif isinstance(data, dict):
        for k, v in data.items():
            readable_key = k.replace('_', ' ').title()
            new_prefix = f"{prefix} > {readable_key}" if prefix else readable_key

            if isinstance(v, str) and len(v) > 10:
                facts.append((section, f"{new_prefix}: {v}"))
            elif isinstance(v, (int, float, bool)):
                facts.append((section, f"{new_prefix}: {v}"))
            elif isinstance(v, (list, dict)):
                facts.extend(extract_facts(v, section, new_prefix))

    return facts

# Extract all facts
all_facts = []
for section_key, section_data in kb['sections'].items():
    section_label = section_key.replace('_', ' ').title()
    facts = extract_facts(section_data, section_key, section_label)
    all_facts.extend(facts)

# Further split any facts that are too long (>300 chars) on sentence boundaries
final_chunks = []
for section, text in all_facts:
    if len(text) > 300:
        # Split on '. '
        sentences = text.split('. ')
        current = ""
        for s in sentences:
            if len(current) + len(s) > 250 and current:
                final_chunks.append((section, current.strip().rstrip('.')))
                current = s
            else:
                current = current + ". " + s if current else s
        if current.strip():
            final_chunks.append((section, current.strip().rstrip('.')))
    else:
        final_chunks.append((section, text))

# Remove duplicates and very short chunks
seen = set()
unique_chunks = []
for section, text in final_chunks:
    if text not in seen and len(text) > 15:
        seen.add(text)
        unique_chunks.append((section, text))

print(f"Total unique chunks: {len(unique_chunks)}")

# Write SQL
sql_lines = ["DELETE FROM knowledge_chunks WHERE college = 'IIT Kharagpur';"]
for i, (section, text) in enumerate(unique_chunks):
    safe = text.replace("'", "''")
    sql_lines.append(f"INSERT INTO knowledge_chunks (college, section, chunk_text) VALUES ('IIT Kharagpur', '{section}', '{safe}');")

with open('C:/Users/sivak/Desktop/cutoffs.ai/chatbot/seed_v2.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines))

print(f"Written {len(sql_lines)} SQL statements")

# Preview
for section, text in unique_chunks[:10]:
    print(f"  [{section}] {text[:120]}")
