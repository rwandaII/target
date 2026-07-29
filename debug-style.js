import XLSX from 'xlsx';
import { readFileSync } from 'fs';

const buf = readFileSync("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx");
const wb = XLSX.read(buf, { type: 'buffer', cellStyles: true });
const ws = wb.Sheets['Sheet1'];

// Find first few cells with styles
let styleCount = 0;
console.log("=== CELLS WITH STYLES ===");
for (let r = 3; r <= 950; r++) {
  for (let c = 0; c <= 2; c++) {
    const addr = XLSX.utils.encode_cell({r, c});
    const cell = ws[addr];
    if (cell && cell.s) {
      const s = cell.s;
      if (s.font) {
        console.log(`Row ${r+1} col${c}: ${JSON.stringify({bold: s.font.bold, italic: s.font.italic, sz: s.font.sz, name: s.font.name, color: s.font.color})} val="${String(cell.v).slice(0,40)}"`);
        styleCount++;
      } else {
        console.log(`Row ${r+1} col${c}: font undefined, keys=${Object.keys(s).join(',')}`);
      }
    }
  }
}
if (styleCount === 0) console.log("No cells with font styles found");

// Try to detect subcategories by checking font size or other properties
console.log("\n=== Checking all cells for ANY style info ===");
let totalWithStyle = 0;
for (let r = 3; r <= 950; r++) {
  for (let c = 0; c <= 2; c++) {
    const addr = XLSX.utils.encode_cell({r, c});
    const cell = ws[addr];
    if (cell && cell.s) {
      totalWithStyle++;
      if (totalWithStyle <= 20) {
        console.log(`Row ${r+1} col${c}: s=${JSON.stringify(cell.s)} val="${String(cell.v).slice(0,30)}"`);
      }
    }
  }
}
console.log(`Total cells with style info: ${totalWithStyle}`);
