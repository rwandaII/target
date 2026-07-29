import XLSX from 'xlsx';
import { readFileSync } from 'fs';

const buf = readFileSync("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx");
const wb = XLSX.read(buf, { type: 'buffer', cellStyles: true });
const ws = wb.Sheets['Sheet1'];

// Check !rows for row heights
console.log("=== ROW METADATA ===");
if (ws['!rows']) {
  console.log("!rows length:", ws['!rows'].length);
  // Show first 20 rows with non-default height
  let count = 0;
  ws['!rows'].forEach((r, i) => {
    if (r && r.hpt && r.hpt !== 15) {
      console.log(`Row ${i+1}: hpt=${r.hpt}`);
      count++;
    }
  });
  console.log("Total non-default height rows:", count);
} else {
  console.log("No !rows metadata");
}

// Try reading with raw options
console.log("\n=== XLSX READ WITH DIFFERENT OPTIONS ===");
const wb2 = XLSX.read(buf, { type: 'buffer', cellStyles: true, cellDates: false, sheetRows: 0 });
const ws2 = wb2.Sheets['Sheet1'];

// Check col widths
if (ws2['!cols']) {
  console.log("Col widths available");
} else {
  console.log("No col widths");
}

// Compare row 5 vs row 6 cell properties
console.log("\n=== RAW CELL COMPARISON (rows 5-6) ===");
for (let r = 4; r <= 5; r++) {
  for (let c = 0; c <= 2; c++) {
    const addr = XLSX.utils.encode_cell({r, c});
    const cell = ws2[addr];
    if (cell) {
      console.log(`Row ${r+1} col${c}: t=${cell.t} v="${cell.v}"`, cell.s ? 'has s' : 'no s');
    } else {
      console.log(`Row ${r+1} col${c}: (empty)`);
    }
  }
}
