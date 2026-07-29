import XLSX from 'xlsx';
import { writeFileSync } from 'fs';

const wb = XLSX.read("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx", { type: 'file' });
const data = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], { header: 1, defval: '' });

const romanNumeral = /^(X{0,3}(IX|IV|V?I{0,3})?)$/;
const skipNames = new Set([
  'BABY RANGE', 'MOTHER & LADY RANGE', 'FATHER CARE & GROOMING',
  'DIETS & NATURAL REMEDY & FOOD SUPPLEMENTS', 'COSMETICS & SKIN CARE RPDUCTS',
  'PERSONAL CARE & HYGIENICS', 'MEDICAL DEVICES & HOSPITAL NEEDS',
  'HOUSEHOLD & HOME NEEDS PRODUCTS', 'CHEMICALS & ESSENTIAL  OILS',
  'FOOD RANGE & DIETS & FOOD SUPPLEMENTS', 'SEXUAL HEALTH & ACCESSORIES PRODUCTS',
  'ORAL CARE & ACCESSORIES', 'HEALTHCARE PRODUCTS', 'MOBILITY & ORTHOPEDY',
  'MEDICATED FLAGRANCE & PARFUMS & ROLL-ONS', 'MAKE-UPS & ACCESSORIES',
  'HAIRCARE PRODUCTS & ACCESSORIES', 'TARGET BRAND', 'OTCs',
  'OTHERS/ CHINA TOILETRIES', 'TOTAL'
]);

// is a row effectively "blank" (no meaningful text content)?
function isBlankRow(row) {
  for (let j = 0; j <= 15; j++) {
    const v = String(row[j] || '').trim();
    if (v !== '') return false;
  }
  return true;
}

// Check if row before index i is blank
function prevRowBlank(data, i) {
  if (i <= 0) return true;
  return isBlankRow(data[i-1]);
}

// Check if row after index i (within 3 rows) is blank  
function nextRowsEmpty(data, i) {
  for (let k = 1; k <= 3; k++) {
    if (i + k >= data.length) return true;
    if (isBlankRow(data[i+k])) return true;
  }
  return false;
}

let categories = [];
let currentCat = null;
let productCount = 0;
let issues = [];

for (let i = 3; i < data.length; i++) {
  const row = data[i];
  const c0 = String(row[0]).trim();
  const c1 = String(row[1]).trim();
  const c2 = String(row[2] || '').trim();
  if (!c2 && !c0) continue;

  const up = c2.toUpperCase();
  const isAllCaps = c2 === up;

  if (skipNames.has(up)) continue;

  // Category header (Roman numeral in col A)
  if (romanNumeral.test(c0) && c0.length <= 5 && !c1 && isAllCaps) {
    currentCat = { name: c2, subcategories: [] };
    categories.push(currentCat);
    continue;
  }

  if (currentCat && !c0 && !c1 && isAllCaps) {
    // Determine if subcategory or product
    // Subcategory if: prev row was blank (has gap above)
    // or if it's clearly a category label (generic, no brand/size)
    const prevBlank = prevRowBlank(data, i);
    
    if (prevBlank && c2.length > 3) {
      // This is a subcategory header
      currentCat.subcategories.push({ name: c2, products: [] });
      continue;
    }
  }

  // Everything else with col C = product
  if (currentCat && c2 && !c0) {
    // Make sure we have a subcategory to put it in
    let sub = currentCat.subcategories.length > 0 
      ? currentCat.subcategories[currentCat.subcategories.length-1] 
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

// Clean up: remove empty subcategories & categories
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

// Write menu JSON
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
