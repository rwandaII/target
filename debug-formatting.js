import XLSX from 'xlsx';
import { writeFileSync } from 'fs';

import { readFileSync } from 'fs';
const buf = readFileSync("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx");
const wb = XLSX.read(buf, { type: 'buffer', cellStyles: true, cellFormula: false });
const ws = wb.Sheets['Sheet1'];

// Check cell styles/formatting for subcategory rows
const ref = ws['!ref'];
const range = XLSX.utils.decode_range(ref);
console.log("Range:", JSON.stringify(range));

// Check merges
console.log("\n=== MERGED CELLS ===");
if (ws['!merges']) {
  ws['!merges'].forEach(m => {
    const s = XLSX.utils.encode_cell({r: m.s.r, c: m.s.c});
    const e = XLSX.utils.encode_cell({r: m.e.r, c: m.e.c});
    const val = ws[s] ? ws[s].v : '';
    console.log(`  ${s}:${e} = "${String(val).slice(0,60)}"`);
  });
} else {
  console.log("  (none)");
}

// Check styles on key rows (4=category, 5=subcat, 6=product)
console.log("\n=== CELL STYLES (cols A-C for rows 4-10) ===");
for (let r = 3; r <= 10; r++) {
  const rowNum = r + 1;
  for (let c = 0; c <= 2; c++) {
    const addr = XLSX.utils.encode_cell({r, c});
    const cell = ws[addr];
    if (cell) {
      const val = cell.v !== undefined ? String(cell.v).slice(0,50) : '(empty)';
      const bold = cell.s && cell.s.font && cell.s.font.bold ? 'BOLD' : '';
      const sz = cell.s && cell.s.font && cell.s.font.sz ? cell.s.font.sz : '';
      console.log(`  Row ${rowNum} col${c}: "${val}" ${bold} ${sz ? 'sz='+sz : ''}`);
    }
  }
}

// Check all rows for bold cells in col C
console.log("\n=== ALL BOLD CELLS IN COL C (potential subcategories) ===");
for (let r = 3; r <= range.e.r; r++) {
  const addr = XLSX.utils.encode_cell({r, c: 2});
  const cell = ws[addr];
  if (cell && cell.v) {
    const val = String(cell.v).trim();
    if (val && cell.s && cell.s.font && cell.s.font.bold) {
      console.log(`  Row ${r+1}: "${val.slice(0,60)}"`);
    }
  }
}
