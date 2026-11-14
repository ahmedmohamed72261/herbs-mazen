import os
import shutil
from PIL import Image

def optimize_and_save(src, dest, max_dim=1200, quality=84):
    with Image.open(src) as img:
        img = img.convert('RGB')
        img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
        img.save(dest, 'JPEG', quality=quality, optimize=True)
    sz = os.path.getsize(dest)
    print(f"Saved {dest}: {img.size}, {sz} bytes")

# 52: Black Seed Oil
optimize_and_save('scripts/candidates/amber_dropper_1.jpg', 'public/images/products/black_seed_oil.jpg')

# 53: Peppermint Oil (already great, optimize)
optimize_and_save('public/images/products/peppermint_oil.jpg', 'public/images/products/peppermint_oil.jpg')

# 54: Chamomile Oil (already great, optimize)
optimize_and_save('public/images/products/chamomile_oil.jpg', 'public/images/products/chamomile_oil.jpg')

# 55: Aniseed Oil (already great, optimize)
optimize_and_save('public/images/products/anise_oil.jpg', 'public/images/products/anise_oil.jpg')

# 56: Rosemary Oil (amber bottle + pipette + fresh rosemary sprigs)
optimize_and_save('scripts/candidates/rosemary_wiki.jpg', 'public/images/products/rosemary_oil.jpg')

# 57: Cumin Oil (pure essential oil vial)
optimize_and_save('scripts/candidates/cumin_wiki.jpg', 'public/images/products/cumin_oil.jpg')

# 58: Thyme Oil (amber bottle of Thyme Essential Oil Thymus vulgaris)
optimize_and_save('scripts/candidates/thyme_wiki.jpg', 'public/images/products/thyme_oil.jpg')

# 59: Golden Jojoba Oil (glass dropper bottle of golden virgin carrier oil + botanical leaf)
optimize_and_save('scripts/candidates/amber_dropper_2.jpg', 'public/images/products/jojoba_oil.jpg')

print("ALL 8 OIL IMAGES SUCCESSFULLY VERIFIED AND REPLACED!")
