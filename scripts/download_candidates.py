import os
import urllib.request
from PIL import Image

out_dir = 'scripts/candidates'
os.makedirs(out_dir, exist_ok=True)

candidates = [
    ('amber_dropper_1.jpg', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'),
    ('amber_dropper_2.jpg', 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80'),
    ('amber_dropper_3.jpg', 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80'),
    ('amber_dropper_4.jpg', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'),
    ('amber_dropper_5.jpg', 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80'),
    ('amber_dropper_6.jpg', 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'),
    ('amber_dropper_7.jpg', 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80'),
    ('amber_dropper_8.jpg', 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=800&q=80')
]

for name, url in candidates:
    dest = os.path.join(out_dir, name)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as resp:
        with open(dest, 'wb') as f:
            f.write(resp.read())
    print(f"Saved {dest}")

print("DONE")

