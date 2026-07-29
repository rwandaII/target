import XLSX from 'xlsx';
import { readFileSync, writeFileSync } from 'fs';

const buf = readFileSync("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx");
const wb = XLSX.read(buf, { type: 'buffer', cellStyles: true });
const ws = wb.Sheets['Sheet1'];
const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

const isRoman = s => s && s.length <= 5 && /^X{0,3}(IX|IV|V?I{0,3})?$/.test(s);

function getHpt(rowIdx) {
  const r = ws['!rows'] && ws['!rows'][rowIdx];
  return r && r.hpt ? r.hpt : 0;
}

function isEmpty(row, s, e) {
  for (let j = s; j <= (e || s); j++) {
    if (String(row[j] || '').trim() !== '') return false;
  }
  return true;
}

let categories = [];
let currentCat = null;
let currentSub = null;
let productCount = 0;
let lastType = 'header'; // track if prev non-empty was a category

for (let i = 3; i < data.length; i++) {
  const row = data[i];
  const c0 = String(row[0] || '').trim();
  const c1 = String(row[1] || '').trim();
  const c2 = String(row[2] || '').trim();

  if (c2 === '' && c0 === '') continue;
  if (c0 === 'TOTAL') continue;

  const hpt = getHpt(i);
  const isAllCaps = c2 === c2.toUpperCase();

  // Category header
  if (isRoman(c0) && c2) {
    currentCat = { name: c2, subcategories: [] };
    categories.push(currentCat);
    currentSub = null;
    lastType = 'category';
    continue;
  }

  if (!currentCat) continue;
  if (c0) continue; // only categories use col A

  const prevRow = data[i - 1] || [];
  const prevContent = !isEmpty(prevRow, 0, 2);
  const prevRowBlank = !prevContent;

  // Subcategory detection:
  // - ALL CAPS, col B empty
  // - Confirmed by: blank row above, OR
  // - First subcat in category (prevWasCategory) with hpt >= 17
  const prevWasCategory = lastType === 'category';

  if (!c1 && isAllCaps && c2.length > 2 && (prevRowBlank || (prevWasCategory && hpt >= 17))) {
    currentSub = { name: c2, products: [] };
    currentCat.subcategories.push(currentSub);
    lastType = 'subcategory';
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
    lastType = 'product';
  }
}

// Report
console.log("Categories:", categories.length);
categories.forEach(c => {
  const p = c.subcategories.reduce((s, sub) => s + sub.products.length, 0);
  console.log("  "+c.name+": "+c.subcategories.length+" subcats, "+p+" products");
  c.subcategories.forEach(sub => {
    if (sub.products.length > 0) {
      console.log("    - "+sub.name+": "+sub.products.length+ " items");
      sub.products.slice(0,1).forEach(p => console.log("        e.g. "+(p.name.slice(0,70))));
    }
  });
});
console.log("\nTotal products:", productCount);

// Write JSON
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
