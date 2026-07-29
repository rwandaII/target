import XLSX from 'xlsx';
import { writeFileSync } from 'fs';

import { readFileSync } from 'fs';
const buf = readFileSync("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx");
const wb = XLSX.read(buf, { type: 'buffer', cellStyles: true });
const ws = wb.Sheets['Sheet1'];
const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

const isRoman = s => s && s.length <= 5 && /^X{0,3}(IX|IV|V?I{0,3})?$/.test(s);

function getRowHpt(rowIdx) {
  const r = ws['!rows'] && ws['!rows'][rowIdx];
  return r ? r.hpt : 0;
}

function isRowEmpty(row, start, end) {
  for (let j = start; j <= (end || start); j++) {
    if (String(row[j] || '').trim() !== '') return false;
  }
  return true;
}

let categories = [];
let currentCat = null;
let currentSub = null;
let productCount = 0;

for (let i = 3; i < data.length; i++) {
  const row = data[i];
  const c0 = String(row[0] || '').trim();
  const c1 = String(row[1] || '').trim();
  const c2 = String(row[2] || '').trim();

  if (c2 === '' && c0 === '') continue;
  if (c0 === 'TOTAL' && c2 === '') continue;

  const hpt = getRowHpt(i);

  // Category header (Roman numeral in col A)
  if (isRoman(c0) && !c1 && c2) {
    currentCat = { name: c2, subcategories: [] };
    categories.push(currentCat);
    currentSub = null;
    continue;
  }

  if (!currentCat) continue;
  if (c0) continue; // skip rows with col A data (only categories should have it)

  const isAllCaps = c2 === c2.toUpperCase();
  const prevRow = data[i - 1] || [];
  const prevRowContent = !isRowEmpty(prevRow, 0, 2);
  const prevRowBlank = !prevRowContent;

  // Subcategory: col A+B empty, ALL CAPS, and (row height >= 17 OR preceded by blank row)
  if (!c1 && isAllCaps && c2.length > 2 && (hpt >= 17 || prevRowBlank)) {
    currentSub = { name: c2, products: [] };
    currentCat.subcategories.push(currentSub);
    continue;
  }

  // Product
  if (c2) {
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
  console.log("  "+c.name+": "+c.subcategories.length+" subcats, "+p+" products");
  c.subcategories.forEach(sub => {
    console.log("    - "+sub.name+": "+sub.products.length+" items");
    sub.products.slice(0,2).forEach(p => console.log("        "+p.name.slice(0,60)));
    if (sub.products.length > 2) console.log("        ... +"+(sub.products.length-2)+" more");
  });
});
console.log("\nTotal products:", productCount);

// Write menu JSON
const menu = categories.map((cat, idx) => ({
  id: idx + 1,
  label: cat.name,
  slug: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  children: cat.subcategories.map((sub, si) => ({
    id: (idx+1)+"-"+(si+1),
    label: sub.name,
    slug: sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    productCount: sub.products.length,
    products: sub.products,
  })),
}));

writeFileSync('src/data/categories-menu.json', JSON.stringify(menu, null, 2));
console.log("\nWritten src/data/categories-menu.json");
