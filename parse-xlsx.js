import XLSX from 'xlsx';
import { writeFileSync } from 'fs';

const wb = XLSX.read("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx", { type: 'file' });
const data = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], { header: 1, defval: '' });

// Column indices
const COL_A = 0, COL_B = 1, COL_C = 2, COL_PA = 6, COL_QTY = 7, COL_SP = 8;

// Detect if text is ALL CAPS (with spaces, numbers, &, etc.)
function isAllCaps(s) {
  const cleaned = s.replace(/[^a-zA-Z]/g, '');
  return cleaned.length > 3 && cleaned === cleaned.toUpperCase();
}

// Check if a row has product data (barcode or prices)
function hasProductData(row) {
  const barcode = String(row[COL_B]).trim();
  const pa = String(row[COL_PA]).trim();
  const sp = String(row[COL_SP]).trim();
  const qty = String(row[COL_QTY]).trim();
  return (barcode.length >= 8) || (pa !== '' && !isNaN(parseFloat(pa))) || (sp !== '' && !isNaN(parseFloat(sp))) || (qty !== '' && !isNaN(parseFloat(qty)));
}

// Roman numeral pattern for column A
const romanNumeral = /^(X{0,3}(IX|IV|V?I{0,3})?)$/;

let categories = [];
let currentCategory = null;
let currentSubcategory = null;
let issues = [];
let rowProducts = 0;

for (let i = 3; i < data.length; i++) {
  const row = data[i];
  const c0 = String(row[COL_A]).trim();
  const c1 = String(row[COL_B]).trim();
  const c2 = String(row[COL_C]).trim();

  if (!c2 && !c0) continue;

  // Check if row 0 is a Roman numeral category header
  if (romanNumeral.test(c0) && c0.length <= 5 && c2 && isAllCaps(c2)) {
    currentCategory = { name: c2, subcategories: [] };
    categories.push(currentCategory);
    currentSubcategory = null;
    continue;
  }

  // Check if row is a subcategory: col A empty, col C is ALL CAPS, not a product
  if (!c0 && c2 && isAllCaps(c2) && c2.length > 3 && !hasProductData(row)) {
    currentSubcategory = { name: c2, products: [] };
    if (currentCategory) {
      currentCategory.subcategories.push(currentSubcategory);
    }
    continue;
  }

  // Must be a product row
  if (c2 && hasProductData(row)) {
    rowProducts++;
    const paRaw = String(row[COL_PA]).trim().replace(/[^0-9.]/g, '');
    const spRaw = String(row[COL_SP]).trim().replace(/[^0-9.]/g, '');
    const qtyRaw = String(row[COL_QTY]).trim();

    const product = {
      name: c2,
      barcode: c1 || null,
      unitPrice: paRaw ? parseFloat(paRaw) : null,
      qtyInStock: qtyRaw ? parseFloat(qtyRaw) : null,
      sellingPrice: spRaw ? parseFloat(spRaw) : null,
      discontinued: String(row[15]).trim().toUpperCase() || null,
    };

    if (product.sellingPrice === null && product.unitPrice !== null) {
      issues.push(`Row ${i+1}: Has unit price (${product.unitPrice}) but no selling price for "${product.name}"`);
    }
    if (product.barcode && (product.barcode.length < 8 || product.barcode.length > 14)) {
      issues.push(`Row ${i+1}: Suspicious barcode "${product.barcode}" for "${product.name}"`);
    }

    // Assign to current subcategory or create one
    if (currentSubcategory) {
      currentSubcategory.products.push(product);
    } else if (currentCategory) {
      if (!currentCategory.subcategories.length) {
        currentSubcategory = { name: currentCategory.name, products: [] };
        currentCategory.subcategories.push(currentSubcategory);
      } else {
        // Add to last subcategory
        currentCategory.subcategories[currentCategory.subcategories.length - 1].products.push(product);
      }
    }
  }
}

// Output
console.log(`\n=== PARSING SUMMARY ===`);
console.log(`Categories found: ${categories.length}`);
let totalProducts = 0;
categories.forEach(cat => {
  let cp = 0;
  cat.subcategories.forEach(sub => { cp += sub.products.length; });
  totalProducts += cp;
  console.log(`  ${cat.name}: ${cat.subcategories.length} subcategories, ${cp} products`);
});
console.log(`Total products: ${totalProducts}`);
console.log(`\n=== DATA ISSUES (${issues.length}) ===`);
issues.slice(0, 50).forEach(issue => console.log(`  - ${issue}`));
if (issues.length > 50) console.log(`  ... and ${issues.length - 50} more`);

// Generate clean menu
const menuCategories = categories.filter(c => c.subcategories.length > 0 || c.name !== 'TOTAL');
const menuData = menuCategories.map((cat, idx) => ({
  id: idx + 1,
  label: cat.name,
  slug: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  children: cat.subcategories
    .filter(sub => sub.products.length > 0)
    .map((sub, subIdx) => ({
      id: `${idx + 1}-${subIdx + 1}`,
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

writeFileSync('src/data/categories-menu.json', JSON.stringify(menuData, null, 2));
writeFileSync('src/data/parse-issues.json', JSON.stringify(issues, null, 2));
console.log(`\nWritten: src/data/categories-menu.json (${menuData.length} categories), src/data/parse-issues.json`);
