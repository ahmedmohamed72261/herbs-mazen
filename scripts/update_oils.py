import json

oil_map = {
    52: '/images/products/black_seed_oil.jpg',
    53: '/images/products/peppermint_oil.jpg',
    54: '/images/products/chamomile_oil.jpg',
    55: '/images/products/anise_oil.jpg',
    56: '/images/products/rosemary_oil.jpg',
    57: '/images/products/cumin_oil.jpg',
    58: '/images/products/thyme_oil.jpg',
    59: '/images/products/jojoba_oil.jpg'
}

with open('src/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

for p in products:
    pid = p.get('id')
    if pid in oil_map:
        p['image'] = oil_map[pid]
        print(f"Updated {pid} ({p.get('slug')}) -> {p['image']}")

with open('src/data/products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print('SUCCESS')

