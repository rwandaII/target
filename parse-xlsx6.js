import XLSX from 'xlsx';
import { writeFileSync } from 'fs';

const wb = XLSX.read("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx", { type: 'file' });
const data = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], { header: 1, defval: '' });

const isRoman = s => s && s.length <= 5 && /^X{0,3}(IX|IV|V?I{0,3})?$/.test(s);

function isRowEmpty(row, start, end) {
  for (let j = start; j <= (end || start); j++) {
    if (String(row[j] || '').trim() !== '') return false;
  }
  return true;
}

let lastType = 'header'; // 'header', 'category', 'subcategory', 'product'
let categories = [];
let currentCat = null;
let currentSub = null;
let productCount = 0;

for (let i = 3; i < data.length; i++) {
  const row = data[i];
  const c0 = String(row[0] || '').trim();
  const c1 = String(row[1] || '').trim();
  const c2 = String(row[2] || '').trim();
  const colsEmpty = isRowEmpty(row, 3, 15);

  if (!c2 && !c0 && !c1) continue; // completely empty row

  // --- Category header (Roman numeral in col A, col B empty) ---
  if (isRoman(c0) && !c1) {
    const name = c2;
    if (name === 'TOTAL') continue;
    currentCat = { name, subcategories: [] };
    categories.push(currentCat);
    currentSub = null;
    lastType = 'category';
    continue;
  }

  if (!currentCat) continue;

  // --- Subcategory or product ---
  const isAllCaps = c2 === c2.toUpperCase();
  const prevRow = data[i - 1] || [];
  const prevRowHasContent = !isRowEmpty(prevRow, 0, 2);
  const prevRowBlank = !prevRowHasContent;
  // Also treat as "blank above" if prev row was a category header
  const prevWasCategory = lastType === 'category';

  if (!c0 && !c1 && isAllCaps && c2.length > 2 && (prevRowBlank || prevWasCategory)) {
    // Subcategory header
    currentSub = { name: c2, products: [] };
    currentCat.subcategories.push(currentSub);
    lastType = 'subcategory';
    continue;
  }

  // --- Product ---
  if (c2 && !c0) {
    if (!currentSub) {
      currentSub = { name: currentCat.name, products: [] };
      currentCat.subcategories.push(currentSub);
    }
    productCount++;
    currentSub.products.push({
      name: c2,
      barcode: c1 || null,
      sellingPrice: null,
      unitPrice: null,
      qtyInStock: null,
      discontinued: null,
    });
    lastType = 'product';
  }
}

// Clean up empty categories/subcategories
categories = categories.filter(cat => {
  cat.subcategories = cat.subcategories.filter(sub => sub.products.length > 0);
  return cat.subcategories.length > 0;
});

// Report
console.log("Categories:", categories.length);
categories.forEach(c => {
  const p = c.subcategories.reduce((s, sub) => s + sub.products.length, 0);
  console.log(`  ${c.name}: ${c.subcategories.length} subcats, ${p} products`);
  c.subcategories.forEach(sub => {
    console.log(`    - ${sub.name}: ${sub.products.length} items`);
    // Show first 3 product names
    sub.products.slice(0, 3).forEach(p => console.log(`        ${p.name.slice(0,60)}`));
    if (sub.products.length > 3) console.log(`        ... +${sub.products.length - 3} more`);
  });
});

console.log("\nTotal products:", productCount);

// Write output
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
