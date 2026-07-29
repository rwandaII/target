import XLSX from 'xlsx';
import { writeFileSync } from 'fs';

const wb = XLSX.read("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx", { type: 'file' });
const data = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], { header: 1, defval: '' });

// Known subcategory patterns (generic category names, not specific products)
const subcategoryPatterns = [
  /^BABY MILK POWDER$/i, /^BABY FOOD & CEREALS$/i, /^BABY ORAL-CARE & HEALTH-CARE PRODUCTS$/i,
  /^BABY BOTTLES & OTHER DINNING UTENSILS$/i, /^BABY DIAPERING & ACCESSORIES PRODUCTS$/i,
  /^BABY COSMETICS & BABY SKINCARE PRODUCTS$/i, /^PREGNANT & BREASTFIDING MOTHER$/i,
  /^FEMININE INTIMATE CARE TOILETRIES$/i, /^FACE CARE$/i, /^FOOT & HAND CARE$/i,
  /^TOOTHPASTE\s*,?\s*TOOTHBRUSH AND FLOSS$/i, /^MOUTHWASH$/i, /^MOUTHSPRAY$/i,
  /^TOOTHBRUSH & FLOSS$/i, /^MEDICAL SCRUBS UNIFORM SHORT SLEEVE$/i,
  /^MEDICAL SCRUBS UNIFORM LONG SLEEVE$/i, /^MEDICAL DOCTOR'S LAB COAT WHITE WITH BLUE DESIGN LONG SLEEVE$/i,
  /^MEDICAL NURSE'S LAB COAT WHITE STOPPER SLEEVE$/i, /^HOSPITAL BED IN BOX$/i,
  /^MEDICAL \(DOCTOR'S & NURSES\) SHOES CLOG & BLOCK$/i, /^DIABETIC SHOES$/i,
  /^MEDICAL MASSAGE SHOES$/i, /^OTHER MEDICAL DEVICES & PARAPHARMACEUTICALS$/i,
  /^HOT WATER BAG$/i, /^OVER THE COUNTER MEDICINES AND TOPICAL$/i,
];

// hardcoded product names to exclude from subcategory detection
const skipRows = new Set(['BABY RANGE', 'MOTHER & LADY RANGE', 'FATHER CARE & GROOMING',
  'DIETS & NATURAL REMEDY & FOOD SUPPLEMENTS', 'COSMETICS & SKIN CARE RPDUCTS',
  'PERSONAL CARE & HYGIENICS', 'MEDICAL DEVICES & HOSPITAL NEEDS',
  'HOUSEHOLD & HOME NEEDS PRODUCTS', 'CHEMICALS & ESSENTIAL  OILS',
  'FOOD RANGE & DIETS & FOOD SUPPLEMENTS', 'SEXUAL HEALTH & ACCESSORIES PRODUCTS',
  'ORAL CARE & ACCESSORIES', 'HEALTHCARE PRODUCTS', 'MOBILITY & ORTHOPEDY',
  'MEDICATED FLAGRANCE & PARFUMS & ROLL-ONS', 'MAKE-UPS & ACCESSORIES',
  'HAIRCARE PRODUCTS & ACCESSORIES', 'TARGET BRAND', 'OTCs',
  'OTHERS/ CHINA TOILETRIES', 'TOTAL']);

const romanNumeral = /^(X{0,3}(IX|IV|V?I{0,3})?)$/;
let categories = [];
let currentCat = null;
let currentSub = null;
let issues = [];
let productCount = 0;

for (let i = 3; i < data.length; i++) {
  const row = data[i];
  const c0 = String(row[0]).trim();
  const c1 = String(row[1]).trim();
  const c2 = String(row[2]).trim();
  if (!c2 && !c0) continue;

  const c2Upper = c2.toUpperCase();
  const hasData = row.slice(3).some(x => String(x).trim() !== '' && String(x).trim() !== '0');

  // Category header (Roman numeral in col A)
  if (romanNumeral.test(c0) && c0.length <= 5) {
    currentCat = { name: c2, subcategories: [] };
    categories.push(currentCat);
    currentSub = null;
    continue;
  }

  // Skip total row
  if (c0 === 'TOTAL' || skipRows.has(c2Upper)) continue;

  // Check if it's a subcategory: col A+B empty, matches subcategory patterns
  const isSubcategory = !c0 && !c1 && c2Upper === c2 && (
    subcategoryPatterns.some(p => p.test(c2)) || 
    (!hasData && c2.length > 5 && c2Upper === c2 && i < data.length - 1 && 
     String(data[i+1][2]).trim().toUpperCase() !== c2Upper)
  );

  if (isSubcategory) {
    currentSub = { name: c2, products: [] };
    if (currentCat) currentCat.subcategories.push(currentSub);
    else {
      // Orphan subcategory
      currentCat = { name: 'General', subcategories: [] };
      categories.push(currentCat);
      currentCat.subcategories.push(currentSub);
    }
    continue;
  }

  // Product row
  if (c2 && !c0) {
    productCount++;
    const paRaw = String(row[6]).trim().replace(/[^0-9.]/g, '');
    const spRaw = String(row[8]).trim().replace(/[^0-9.]/g, '');

    const product = {
      name: c2,
      barcode: c1 || null,
      sellingPrice: spRaw ? parseFloat(spRaw) : null,
      unitPrice: paRaw ? parseFloat(paRaw) : null,
      qtyInStock: row[7] !== '' && row[7] !== undefined ? parseFloat(row[7]) : null,
      discontinued: String(row[15]).trim().toUpperCase() || null,
    };

    if (product.barcode && product.barcode.length < 8) {
      issues.push(`Row ${i+1}: Short barcode "${c1}" for "${c2.slice(0,40)}"`);
    }

    if (currentSub) {
      currentSub.products.push(product);
    } else if (currentCat) {
      if (!currentCat.subcategories.length || currentCat.subcategories[currentCat.subcategories.length-1].products.length > 0) {
        currentSub = { name: currentCat.name, products: [] };
        currentCat.subcategories.push(currentSub);
      }
      currentSub.products.push(product);
    }
  }
}

// Filter out empty categories
categories = categories.filter(c => c.subcategories.some(s => s.products.length > 0));

console.log(`\n=== FINAL SUMMARY ===`);
console.log(`Categories: ${categories.length}`);
console.log(`Total products: ${productCount}`);
categories.forEach(c => {
  const p = c.subcategories.reduce((sum, s) => sum + s.products.length, 0);
  console.log(`  ${c.name}: ${c.subcategories.length} subcats, ${p} prods`);
});
console.log(`\nIssues: ${issues.length}`);
issues.slice(0, 20).forEach(i => console.log(`  ${i}`));

// Generate output
const menu = categories.map((cat, idx) => ({
  id: idx + 1,
  label: cat.name,
  slug: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  children: cat.subcategories.map((sub, si) => ({
    id: `${idx+1}-${si+1}`,
    label: sub.name,
    slug: sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    products: sub.products.map(p => ({
      name: p.name,
      barcode: p.barcode,
      sellingPrice: p.sellingPrice,
      unitPrice: p.unitPrice,
      qtyInStock: p.qtyInStock,
      discontinued: p.discontinued,
    })),
  })),
}));

writeFileSync('src/data/categories-menu.json', JSON.stringify(menu, null, 2));
writeFileSync('src/data/parse-issues.json', JSON.stringify(issues, null, 2));
console.log(`\nWritten: src/data/categories-menu.json`);
