import os
from PIL import Image

routes_dir = 'public/images/routes'
os.makedirs(routes_dir, exist_ok=True)

# 1. Prepare Route Images
route_sources = {
    'route_eu.jpg': 'public/images/products/peppermint.jpg',
    'route_usa.jpg': 'public/images/products/chamomile.jpg',
    'route_gulf.jpg': 'public/images/products/golden_sesame.jpg',
    'route_asia.jpg': 'public/images/products/chamomile_oil.jpg',
    'route_uk.jpg': 'public/images/products/basil.jpg',
}

for dest_name, src_path in route_sources.items():
    dest_path = os.path.join(routes_dir, dest_name)
    if os.path.exists(src_path):
        with Image.open(src_path) as img:
            img = img.convert('RGB')
            # Resize if very large
            img.thumbnail((1200, 900), Image.Resampling.LANCZOS)
            img.save(dest_path, 'JPEG', quality=84, optimize=True)
            print(f"Created route image: {dest_path} ({os.path.getsize(dest_path)} bytes)")
    else:
        print(f"Warning: source {src_path} not found!")

# 2. Optimize images over 800KB in public/images
print("\n--- Optimizing heavy images for blazing fast load speeds ---")
for root, dirs, files in os.walk('public/images'):
    for f in files:
        if f.lower().endswith(('.jpg', '.jpeg', '.png')):
            p = os.path.join(root, f)
            sz = os.path.getsize(p)
            if sz > 800_000:
                try:
                    with Image.open(p) as img:
                        img = img.convert('RGB')
                        # Keep max dimension reasonable
                        w, h = img.size
                        if max(w, h) > 1600:
                            img.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
                        img.save(p, 'JPEG', quality=82, optimize=True)
                        new_sz = os.path.getsize(p)
                        print(f"Optimized {p}: {sz/1024/1024:.2f}MB -> {new_sz/1024:.1f}KB ({100 - new_sz*100/sz:.1f}% reduction)")
                except Exception as e:
                    print(f"Failed to optimize {p}: {e}")

print("ALL OPTIMIZATIONS COMPLETE!")
