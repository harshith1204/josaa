"""
Extract placement data from PDFs using PyMuPDF4LLM (best library for RAG).
- Primary: pymupdf4llm -> clean Markdown output with tables preserved
- Fallback: fitz (PyMuPDF) raw text for pages pymupdf4llm misses
- OCR: OpenCV preprocessing + pytesseract for image-heavy pages
- Output: Markdown (for RAG), raw text, and structured metadata per college
"""

import pymupdf4llm
import fitz
import cv2
import numpy as np
import os
import re
import json
from pathlib import Path

BASE_DIR = Path(__file__).parent
EXTRACTED_DIR = BASE_DIR / "extracted"
CLASSIFICATION_FILE = BASE_DIR / "classification.json"


def extract_markdown(pdf_path):
    """Extract PDF content as clean Markdown using pymupdf4llm."""
    try:
        md_text = pymupdf4llm.to_markdown(str(pdf_path))
        return md_text
    except Exception as e:
        print(f"    pymupdf4llm failed: {e}")
        return None


def extract_text_fallback(pdf_path):
    """Fallback: extract raw text page by page using fitz."""
    doc = fitz.open(str(pdf_path))
    pages = []
    for i in range(len(doc)):
        text = doc[i].get_text()
        pages.append(text)
    doc.close()
    return '\n\n---\n\n'.join(pages)


def count_image_pages(pdf_path):
    """Count pages that are mostly images (little extractable text)."""
    doc = fitz.open(str(pdf_path))
    image_pages = 0
    total = len(doc)
    for i in range(total):
        text = doc[i].get_text().strip()
        if len(text) < 50:
            image_pages += 1
    doc.close()
    return image_pages, total


def ocr_image_pages(pdf_path, max_pages=15):
    """OCR image-heavy pages using OpenCV + pytesseract."""
    doc = fitz.open(str(pdf_path))
    ocr_texts = []

    try:
        import pytesseract
    except ImportError:
        doc.close()
        return None, "pytesseract not installed"

    for i in range(min(len(doc), max_pages)):
        page = doc[i]
        text = page.get_text().strip()
        if len(text) >= 50:
            continue  # has text, skip OCR

        # Render page as image
        pix = page.get_pixmap(dpi=200)
        img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.h, pix.w, pix.n)

        # Convert to BGR for OpenCV
        if pix.n == 4:  # RGBA
            img = cv2.cvtColor(img, cv2.COLOR_RGBA2BGR)
        elif pix.n == 3:  # RGB
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

        # Preprocessing pipeline
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        # CLAHE for contrast enhancement
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced = clahe.apply(gray)
        # Adaptive threshold
        thresh = cv2.adaptiveThreshold(
            enhanced, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 15, 4
        )
        # Denoise
        denoised = cv2.fastNlMeansDenoising(thresh, h=10)

        try:
            ocr_text = pytesseract.image_to_string(denoised, lang='eng')
            if ocr_text.strip():
                ocr_texts.append(f"[Page {i+1} - OCR]\n{ocr_text}")
        except Exception as e:
            ocr_texts.append(f"[Page {i+1} - OCR Error: {e}]")

    doc.close()
    return '\n\n'.join(ocr_texts) if ocr_texts else None, "ok"


def extract_structured_data(text, college_name):
    """Extract structured placement metrics from text."""
    t = text.lower()
    data = {'institute': college_name}

    # Year
    for pat, year in [
        (r'2025[\s\-]*(?:20)?26', '2025-26'),
        (r'2024[\s\-]*(?:20)?25', '2024-25'),
        (r'2023[\s\-]*(?:20)?24', '2023-24'),
    ]:
        if re.search(pat, t):
            data['year'] = year
            break

    # Packages (LPA) - search for various patterns
    pkg_patterns = {
        'highest_package_lpa': [
            r'highest\s+(?:package|ctc|salary|domestic\s+ctc|offer)[^.]{0,30}?(\d+\.?\d*)\s*(?:lpa|lakhs?\s*per|l\.?p\.?a)',
            r'highest\s+(?:package|ctc)[^.]{0,20}?(?:inr|rs\.?|₹)\s*(\d+\.?\d*)\s*(?:lpa|lakhs?|l\.?p\.?a)',
            r'highest\s+ctc[^.]{0,30}?(\d+\.?\d*)\s*(?:lpa|l\.?p\.?a)',
        ],
        'average_package_lpa': [
            r'average\s+(?:package|ctc|salary)[^.]{0,30}?(\d+\.?\d*)\s*(?:lpa|lakhs?\s*per|l\.?p\.?a)',
            r'avg\.?\s+(?:package|ctc)[^.]{0,20}?(\d+\.?\d*)\s*(?:lpa|l\.?p\.?a)',
        ],
        'median_package_lpa': [
            r'median\s+(?:package|ctc|salary)[^.]{0,30}?(\d+\.?\d*)\s*(?:lpa|lakhs?\s*per|l\.?p\.?a)',
        ],
    }

    for field, patterns in pkg_patterns.items():
        for pat in patterns:
            m = re.search(pat, t)
            if m:
                val = float(m.group(1))
                if 1 <= val <= 300:  # sanity: 1 LPA to 3 Cr
                    data[field] = val
                    break

    # Total offers
    for pat in [
        r'(\d{2,4})\s+(?:total\s+)?(?:job\s+)?offers',
        r'total\s+(?:offers|placements?)[:\s]*(\d{2,4})',
        r'(\d{3,4})\s+students?\s+(?:were\s+)?placed',
    ]:
        m = re.search(pat, t)
        if m:
            data['total_offers'] = int(m.group(1))
            break

    # Companies
    for pat in [
        r'(\d{2,4})\+?\s+(?:companies|recruiters|organisations?|corporates)',
        r'(?:companies|recruiters)\s*(?:visited)?[:\s]*(\d{2,4})',
    ]:
        m = re.search(pat, t)
        if m:
            val = int(m.group(1))
            if 10 <= val <= 1000:
                data['total_companies'] = val
                break

    # Placement %
    for pat in [
        r'(\d{2,3}\.?\d*)\s*%\s*(?:of\s+)?(?:placement|placed|students)',
        r'placement\s+(?:rate|percentage)[:\s]*(\d{2,3}\.?\d*)\s*%',
        r'overall\s+placement[:\s]*(\d{2,3}\.?\d*)\s*%',
    ]:
        m = re.search(pat, t)
        if m:
            val = float(m.group(1))
            if 20 <= val <= 100:
                data['placement_percentage'] = val
                break

    # Top recruiters
    companies = [
        'google', 'microsoft', 'amazon', 'apple', 'meta', 'facebook',
        'goldman sachs', 'morgan stanley', 'jpmorgan', 'jp morgan',
        'deloitte', 'mckinsey', 'bcg', 'bain', 'accenture',
        'infosys', 'tcs', 'wipro', 'cognizant', 'hcl',
        'oracle', 'adobe', 'qualcomm', 'intel', 'samsung',
        'flipkart', 'uber', 'paytm', 'razorpay', 'phonepe',
        'texas instruments', 'nvidia', 'salesforce', 'vmware',
        'deutsche bank', 'barclays', 'hsbc', 'citibank', 'hdfc',
        'reliance', 'tata steel', 'tata motors', 'l&t', 'vedanta',
        'hpcl', 'bpcl', 'iocl', 'ongc', 'bhel', 'isro', 'drdo',
        'mahindra', 'bajaj', 'hero', 'maruti', 'hyundai',
        'bosch', 'siemens', 'schlumberger', 'shell',
        'sprinklr', 'atlassian', 'intuit', 'paypal',
        'zs associates', 'tower research', 'de shaw', 'graviton',
        'american express', 'mastercard', 'visa',
        'ibm', 'capgemini', 'ey', 'kpmg', 'pwc',
    ]
    found = sorted(set(c.title() for c in companies if c in t))
    if found:
        data['top_recruiters'] = found

    return data


def process_college(college_name, pdf_path, output_dir, all_pdfs=None):
    """Process a college's PDFs and save extracted data."""
    print(f"\n{'='*50}")
    print(f"  {college_name}")
    print(f"{'='*50}")

    output_dir.mkdir(parents=True, exist_ok=True)

    # Count image pages
    img_pages, total_pages = count_image_pages(pdf_path)
    text_ratio = (total_pages - img_pages) / max(total_pages, 1)
    print(f"  Main PDF: {pdf_path.name} ({total_pages}p, {img_pages} image-only pages)")

    # Extract with pymupdf4llm (primary - best for RAG)
    print(f"  Extracting with pymupdf4llm...")
    md_text = extract_markdown(pdf_path)

    if md_text and len(md_text.strip()) > 200:
        print(f"  pymupdf4llm: {len(md_text)} chars of Markdown")
    else:
        print(f"  pymupdf4llm returned little text, trying fallback...")
        fallback = extract_text_fallback(pdf_path)
        if fallback and len(fallback.strip()) > 200:
            md_text = fallback
            print(f"  Fallback: {len(md_text)} chars")

    # OCR for image-heavy pages
    ocr_text = None
    if img_pages > 0:
        print(f"  Attempting OCR on {img_pages} image pages...")
        ocr_text, status = ocr_image_pages(pdf_path)
        if ocr_text:
            print(f"  OCR recovered: {len(ocr_text)} chars")
        elif status != "ok":
            print(f"  OCR skipped: {status}")

    # Combine all text
    all_text = md_text or ""
    if ocr_text:
        all_text += f"\n\n---\n\n## OCR EXTRACTED TEXT\n\n{ocr_text}"

    # Save Markdown (primary format for RAG)
    md_path = output_dir / 'content.md'
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write(f"# {college_name} - Placement Brochure\n\n")
        f.write(f"Source: {pdf_path.name}\n\n---\n\n")
        f.write(all_text)
    print(f"  Saved: {md_path.name} ({len(all_text)} chars)")

    # Extract structured data
    structured = extract_structured_data(all_text, college_name)

    # Save metadata
    metadata = {
        'college': college_name,
        'source_pdf': pdf_path.name,
        'total_pages': total_pages,
        'image_pages': img_pages,
        'text_chars': len(all_text),
        'extraction_method': 'pymupdf4llm' if md_text else 'fitz_fallback',
        'ocr_applied': ocr_text is not None,
        'structured_data': structured,
    }

    with open(output_dir / 'metadata.json', 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)

    # Print key stats
    if structured.get('highest_package_lpa'):
        print(f"  Highest: {structured['highest_package_lpa']} LPA")
    if structured.get('average_package_lpa'):
        print(f"  Average: {structured['average_package_lpa']} LPA")
    if structured.get('total_companies'):
        print(f"  Companies: {structured['total_companies']}")
    if structured.get('top_recruiters'):
        print(f"  Recruiters: {len(structured['top_recruiters'])} found")

    # Process additional PDFs for this college
    if all_pdfs:
        additional_dir = output_dir / 'additional'
        for other_pdf_path in all_pdfs:
            if other_pdf_path == pdf_path:
                continue
            if not other_pdf_path.exists():
                continue
            try:
                other_md = extract_markdown(other_pdf_path)
                if other_md and len(other_md.strip()) > 200:
                    additional_dir.mkdir(parents=True, exist_ok=True)
                    fname = other_pdf_path.stem + '.md'
                    with open(additional_dir / fname, 'w', encoding='utf-8') as f:
                        f.write(f"# {college_name} - {other_pdf_path.stem}\n\n")
                        f.write(other_md)
                    print(f"  + Additional: {other_pdf_path.name} -> {len(other_md)} chars")
            except Exception as e:
                print(f"  + Additional failed: {other_pdf_path.name}: {e}")

    return metadata


def main():
    if not CLASSIFICATION_FILE.exists():
        print("ERROR: Run classify_brochures.py first!")
        return

    with open(CLASSIFICATION_FILE, 'r', encoding='utf-8') as f:
        classification = json.load(f)

    print(f"Processing {len(classification)} colleges...\n")

    all_metadata = {}
    processed = 0
    skipped = 0

    for college_name, data in sorted(classification.items()):
        best = data.get('best_brochure')
        if not best:
            print(f"\n  SKIP {college_name}: no suitable brochure")
            skipped += 1
            continue

        # Find PDF path
        if college_name.startswith('IIT'):
            college_dir = BASE_DIR / 'IIT' / college_name
        else:
            college_dir = BASE_DIR / 'NIT' / college_name

        pdf_path = college_dir / best
        if not pdf_path.exists():
            print(f"\n  SKIP {college_name}: {best} not found")
            skipped += 1
            continue

        # Gather all PDFs for this college
        all_pdfs = [college_dir / f['filename'] for f in data['files']]

        output_dir = EXTRACTED_DIR / college_name
        metadata = process_college(college_name, pdf_path, output_dir, all_pdfs)
        all_metadata[college_name] = metadata
        processed += 1

    # Save master summary
    summary_path = EXTRACTED_DIR / 'extraction_summary.json'
    EXTRACTED_DIR.mkdir(parents=True, exist_ok=True)
    with open(summary_path, 'w', encoding='utf-8') as f:
        json.dump({
            'total': len(classification),
            'processed': processed,
            'skipped': skipped,
            'colleges': all_metadata,
        }, f, indent=2, ensure_ascii=False, default=str)

    print(f"\n{'='*60}")
    print(f"  EXTRACTION COMPLETE")
    print(f"{'='*60}")
    print(f"  Processed: {processed}")
    print(f"  Skipped: {skipped}")
    print(f"  Output: {EXTRACTED_DIR}")


if __name__ == '__main__':
    main()
