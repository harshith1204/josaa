"""
Classify placement brochure PDFs:
- Detect year (2024-25, 2025-26, etc.)
- Detect type (brochure, report, annual report, department brochure)
- Flag irrelevant ones (MBA-only, department-specific)
- Pick the best brochure per college
"""

import fitz  # PyMuPDF
import os
import re
import json
from pathlib import Path

BASE_DIR = Path(__file__).parent
IIT_DIR = BASE_DIR / "IIT"
NIT_DIR = BASE_DIR / "NIT"

# Department keywords - if these appear in title/first page, it's department-specific
DEPT_KEYWORDS = [
    "department of computer", "department of electrical", "department of mechanical",
    "department of civil", "department of chemical", "department of electronics",
    "department of aerospace", "department of metallurg", "department of mining",
    "department of physics", "department of chemistry", "department of mathematics",
    "department of biomedical", "department of materials", "school of materials",
    "department of ceramic", "department of textile",
    "cse brochure", "ece brochure", "eee brochure", "me brochure",
    "engineering physics", "artificial intelligence department",
]

# MBA/management keywords - irrelevant unless also has BTech data
MBA_KEYWORDS = [
    "mba placement", "mba brochure", "department of management studies",
    "school of management", "doms ", "dms ", "vgsom", "sjmsom",
    "mba admission", "mba batch", "mba final placement",
    "master of business administration",
]

# Official placement brochure indicators
OFFICIAL_KEYWORDS = [
    "placement brochure", "placement and internship brochure",
    "training and placement", "training & placement",
    "campus placement", "placement season",
    "placement report", "placement statistics",
    "career development", "placement cell",
]

YEAR_PATTERNS = [
    (r'2025[\s-]*(?:20)?26', '2025-26'),
    (r'2024[\s-]*(?:20)?25', '2024-25'),
    (r'2023[\s-]*(?:20)?24', '2023-24'),
    (r'2022[\s-]*(?:20)?23', '2022-23'),
    (r'2021[\s-]*(?:20)?22', '2021-22'),
    (r'2020[\s-]*(?:20)?21', '2020-21'),
    (r'\b2026\b', '2025-26'),
    (r'\b2025\b', '2024-25'),
    (r'\b2024\b', '2023-24'),
]

YEAR_PRIORITY = {
    '2025-26': 6, '2024-25': 5, '2023-24': 4,
    '2022-23': 3, '2021-22': 2, '2020-21': 1, 'unknown': 0,
}

TYPE_PRIORITY = {
    'placement_brochure': 4,
    'placement_report': 3,
    'annual_report': 2,
    'department_brochure': 1,
    'other': 0,
}


def extract_first_pages_text(pdf_path, max_pages=5):
    """Extract text from first N pages of a PDF using PyMuPDF."""
    try:
        doc = fitz.open(str(pdf_path))
        pages_text = []
        total_pages = len(doc)
        for i in range(min(max_pages, total_pages)):
            page = doc[i]
            text = page.get_text()
            pages_text.append(text)

        # Also check if pages have extractable text at all
        has_text = any(len(t.strip()) > 50 for t in pages_text)

        doc.close()
        return {
            'text': '\n'.join(pages_text),
            'total_pages': total_pages,
            'has_text': has_text,
            'first_page': pages_text[0] if pages_text else '',
        }
    except Exception as e:
        return {
            'text': '',
            'total_pages': 0,
            'has_text': False,
            'first_page': '',
            'error': str(e),
        }


def detect_year(text, filename):
    """Detect the academic year from text and filename."""
    combined = (filename + ' ' + text).lower()
    for pattern, year in YEAR_PATTERNS:
        if re.search(pattern, combined):
            return year
    return 'unknown'


def detect_type(text, filename):
    """Classify the PDF type."""
    combined = (filename + ' ' + text).lower()

    # Check department-specific first
    for kw in DEPT_KEYWORDS:
        if kw in combined[:2000]:  # Check first 2000 chars only (title area)
            return 'department_brochure'

    # Check if it's a placement brochure
    if any(kw in combined for kw in ['placement brochure', 'placement and internship brochure']):
        return 'placement_brochure'

    # Check if it's a placement report
    if any(kw in combined for kw in ['placement report', 'placement statistics', 'placement record', 'placement summary']):
        return 'placement_report'

    # Check if annual report
    if 'annual report' in combined:
        return 'annual_report'

    # Check if it mentions placement at all
    if any(kw in combined for kw in OFFICIAL_KEYWORDS):
        return 'placement_brochure'

    return 'other'


def is_mba_only(text, filename):
    """Check if the PDF is MBA/management specific without BTech data."""
    combined = (filename + ' ' + text).lower()

    has_mba = any(kw in combined for kw in MBA_KEYWORDS)
    has_btech = any(kw in combined for kw in [
        'b.tech', 'btech', 'b tech', 'undergraduate', 'ug placement',
        'engineering placement', 'bachelor of technology',
    ])

    return has_mba and not has_btech


def is_institute_wide(text, filename, pdf_type):
    """Check if this is an institute-wide brochure (not department-specific)."""
    if pdf_type == 'department_brochure':
        return False

    combined = (filename + ' ' + text[:3000]).lower()

    # Check filename for department indicators
    dept_in_filename = any(d in filename.lower() for d in [
        '-cse-', '-ece-', '-eee-', '-mec-', '-civ-', '-che-',
        '-ae-', '-mse-', '-mst-', '-bme-', '-met-', '-min-',
        '-cer-', '-phy-', '-chy-', '-ai-', '-mae-', '-textile-',
        'cse_brochure', 'ece_brochure', 'metallurgy', 'mining',
    ])

    if dept_in_filename:
        return False

    return True


def classify_pdf(pdf_path):
    """Classify a single PDF file."""
    filename = pdf_path.name
    size_mb = pdf_path.stat().st_size / (1024 * 1024)

    info = extract_first_pages_text(pdf_path)

    if 'error' in info:
        return {
            'filename': filename,
            'year': 'unknown',
            'type': 'error',
            'is_official': False,
            'is_institute_wide': False,
            'is_mba_only': False,
            'pages': 0,
            'size_mb': round(size_mb, 1),
            'has_extractable_text': False,
            'error': info['error'],
        }

    text = info['text']
    first_page = info['first_page']

    year = detect_year(text, filename)
    pdf_type = detect_type(text, filename)
    mba_only = is_mba_only(text, filename)
    institute_wide = is_institute_wide(text, filename, pdf_type)

    is_official = (
        pdf_type in ('placement_brochure', 'placement_report', 'annual_report')
        and not mba_only
    )

    return {
        'filename': filename,
        'year': year,
        'type': pdf_type,
        'is_official': is_official,
        'is_institute_wide': institute_wide,
        'is_mba_only': mba_only,
        'pages': info['total_pages'],
        'size_mb': round(size_mb, 1),
        'has_extractable_text': info['has_text'],
        'first_100_chars': first_page[:100].replace('\n', ' ').strip(),
    }


def pick_best_brochure(files):
    """Pick the best brochure for a college from classified files."""
    # Filter to official, institute-wide only
    candidates = [f for f in files if f['is_official'] and f['is_institute_wide']]

    if not candidates:
        # Fall back to any official file
        candidates = [f for f in files if f['is_official']]

    if not candidates:
        # Fall back to anything with extractable text
        candidates = [f for f in files if f['has_extractable_text']]

    if not candidates:
        return None

    # Sort by year priority (desc), then type priority (desc), then size (desc)
    candidates.sort(key=lambda f: (
        YEAR_PRIORITY.get(f['year'], 0),
        TYPE_PRIORITY.get(f['type'], 0),
        f['size_mb'],
    ), reverse=True)

    return candidates[0]['filename']


def classify_all():
    """Classify all PDFs in IIT and NIT directories."""
    results = {}

    for category_dir in [IIT_DIR, NIT_DIR]:
        if not category_dir.exists():
            continue

        for college_dir in sorted(category_dir.iterdir()):
            if not college_dir.is_dir():
                continue

            college_name = college_dir.name
            pdfs = list(college_dir.glob('*.pdf'))

            if not pdfs:
                continue

            print(f"  Classifying {college_name} ({len(pdfs)} PDFs)...")

            files = []
            for pdf in sorted(pdfs):
                info = classify_pdf(pdf)
                files.append(info)

                # Status indicator
                status = ""
                if info['is_official'] and info['is_institute_wide']:
                    status = "OFFICIAL"
                elif info['is_official']:
                    status = "official (dept)"
                elif info['is_mba_only']:
                    status = "MBA-ONLY"
                else:
                    status = info['type']

                print(f"    [{info['year']}] [{status}] {info['filename']} ({info['pages']}p, {info['size_mb']}MB)")

            best = pick_best_brochure(files)

            results[college_name] = {
                'files': files,
                'best_brochure': best,
                'total_files': len(files),
                'official_count': sum(1 for f in files if f['is_official']),
                'institute_wide_count': sum(1 for f in files if f['is_official'] and f['is_institute_wide']),
            }

            if best:
                print(f"    -> Best: {best}")
            else:
                print(f"    -> WARNING: No suitable brochure found!")

    return results


def print_summary(results):
    """Print a summary of classification results."""
    print("\n" + "=" * 70)
    print("  CLASSIFICATION SUMMARY")
    print("=" * 70)

    total_files = 0
    official_files = 0
    colleges_with_best = 0
    colleges_without = []

    for college, data in sorted(results.items()):
        total_files += data['total_files']
        official_files += data['official_count']
        if data['best_brochure']:
            colleges_with_best += 1
        else:
            colleges_without.append(college)

    print(f"\nTotal colleges: {len(results)}")
    print(f"Total PDFs: {total_files}")
    print(f"Official PDFs: {official_files}")
    print(f"Colleges with best brochure: {colleges_with_best}")

    if colleges_without:
        print(f"\nColleges WITHOUT a suitable brochure ({len(colleges_without)}):")
        for c in colleges_without:
            print(f"  - {c}")

    print("\n--- Best Brochure Per College ---")
    for college, data in sorted(results.items()):
        best = data['best_brochure']
        if best:
            # Find the best file's info
            best_info = next((f for f in data['files'] if f['filename'] == best), None)
            if best_info:
                print(f"  {college}: [{best_info['year']}] {best} ({best_info['pages']}p)")
        else:
            print(f"  {college}: --- NONE ---")


if __name__ == '__main__':
    print("Classifying placement brochure PDFs...\n")
    results = classify_all()

    # Save to JSON
    output_path = BASE_DIR / 'classification.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"\nClassification saved to: {output_path}")

    print_summary(results)
