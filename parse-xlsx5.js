import XLSX from 'xlsx';
import { writeFileSync } from 'fs';

const wb = XLSX.read("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx", { type: 'file' });
const data = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], { header: 1, defval: '' });

const romanNumeral = /^X{0,3}(IX|IV|V?I{0,3})?$/;
const isRoman = s => s && /^X{0,3}(IX|IV|V?I{0,3})?$/.test(s) && s.length <= 5;

function isBlankRow(row) {
  for (let j = 0; j <= 15; j++) {
    if (String(row[j] || '').trim() !== '') return false;
  }
  return true;
}

let categories = [];
let currentCat = null;
let productCount = 0;
let issues = [];

for (let i = 3; i < data.length; i++) {
  const row = data[i];
  const c0 = String(row[0] || '').trim();
  const c1 = String(row[1] || '').trim();
  const c2 = String(row[2] || '').trim();
  if (!c2 && !c0) continue;

  const up = c2.toUpperCase();
  const isAllCaps = c2 === up;

  // Only skip TOTAL row (invoice footer)
  if (up === 'TOTAL' && !c0) continue;

  // Category header (Roman numeral in col A)
  if (isRoman(c0) && !c1 && isAllCaps) {
    currentCat = { name: c2, subcategories: [] };
    categories.push(currentCat);
    continue;
  }

  if (!currentCat) continue;

  if (!c0 && !c1 && isAllCaps) {
    // Check if prev non-empty row was blank or if this matches subcategory pattern
    // Subcategory = preceded by blank row
    let prevNonEmpty = i - 1;
    while (prevNonEmpty > 3 && !String(data[prevNonEmpty][2] || '').trim()) prevNonEmpty--;
    const prevBlank = isBlankRow(data[prevNonEmpty]);

    if (prevBlank && c2.length > 3) {
      currentCat.subcategories.push({ name: c2, products: [] });
      continue;
    }
  }

  // Product row
  if (c2 && !c0) {
    let sub = currentCat.subcategories.length > 0
      ? currentCat.subcategories[currentCat.subcategories.length - 1]
      : null;

    if (!sub) {
      sub = { name: currentCat.name, products: [] };
      currentCat.subcategories.push(sub);
    }

    productCount++;
    sub.products.push({
      name: c2,
      barcode: c1 || null,
      sellingPrice: null,
      unitPrice: null,
      qtyInStock: null,
      discontinued: null,
    });
  }
}

// Clean up
categories = categories.filter(cat => {
  cat.subcategories = cat.subcategories.filter(sub => sub.products.length > 0);
  return cat.subcategories.length > 0;
});

console.log("Categories:", categories.length);
categories.forEach(c => {
  const p = c.subcategories.reduce((s, sub) => s + sub.products.length, 0);
  console.log(`  ${c.name}: ${c.subcategories.length} subcats, ${p} products`);
  c.subcategories.forEach(sub => {
    console.log(`    - ${sub.name}: ${sub.products.length} items`);
  });
});
console.log("Total products:", productCount);

const menu = categories.map((cat, idx) => ({
  id: idx + 1,
  label: cat.name,
  slug: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  children: cat.subcategories.map((sub, si) => ({
    id: `${idx+1}-${si+1}`,
    label: sub.name,
    slug: sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    productCount: sub.products.length,
    products: sub.products,
  })),
}));

writeFileSync('src/data/categories-menu.json', JSON.stringify(menu, null, 2));
console.log("\nWritten categories-menu.json");
