import json
import os
import sys
import time
import urllib.request

WORKER_URL = "https://cutoffs-upload.fresherschat.workers.dev/"
MEDIA_DIR = r"C:\Users\sivak\Desktop\cutoffs.ai\data\campus-ambassador-data\nit-nagaland\telegram-export"
COLLEGE = "nit-nagaland"

MIME_MAP = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.mov': 'video/quicktime',
    '.mp4': 'video/mp4',
}

results = []

def upload_file(filepath, folder):
    filename = os.path.basename(filepath)
    ext = os.path.splitext(filename)[1].lower()
    mime = MIME_MAP.get(ext, 'application/octet-stream')

    with open(filepath, 'rb') as f:
        data = f.read()

    size_mb = len(data) / 1024 / 1024
    print(f"  Uploading {filename} ({size_mb:.1f} MB)...", end=" ", flush=True)

    req = urllib.request.Request(WORKER_URL, data=data, method='PUT')
    req.add_header('Content-Type', mime)
    req.add_header('X-Filename', f"{COLLEGE}-{filename}")
    req.add_header('X-Folder', folder)
    req.add_header('User-Agent', 'Mozilla/5.0 cutoffs.ai-uploader/1.0')

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            result = json.loads(resp.read())
            print(f"OK -> {result.get('fileUrl', 'no url')[:80]}")
            return result.get('fileUrl')
    except Exception as e:
        print(f"FAILED: {e}")
        return None

# Upload photos
print("=== Uploading Photos ===")
photos_dir = os.path.join(MEDIA_DIR, "photos")
for f in sorted(os.listdir(photos_dir)):
    if f.lower().endswith(('.jpg', '.jpeg', '.png')):
        url = upload_file(os.path.join(photos_dir, f), f"colleges/{COLLEGE}/photos")
        if url:
            results.append({"type": "photo", "file": f, "url": url})
        time.sleep(0.5)

# Upload videos
print("\n=== Uploading Videos ===")
videos_dir = os.path.join(MEDIA_DIR, "video_files")
for f in sorted(os.listdir(videos_dir)):
    if f.lower().endswith(('.mov', '.mp4')):
        # Skip thumbnails
        if '_thumb' in f:
            continue
        url = upload_file(os.path.join(videos_dir, f), f"colleges/{COLLEGE}/videos")
        if url:
            results.append({"type": "video", "file": f, "url": url})
        time.sleep(0.5)

# Save URL mapping
with open(r"C:\Users\sivak\Desktop\cutoffs.ai\data\campus-ambassador-data\nit-nagaland\nit-nagaland-r2-urls.json", 'w') as f:
    json.dump(results, f, indent=2)

print(f"\n=== Done: {len(results)} files uploaded ===")
