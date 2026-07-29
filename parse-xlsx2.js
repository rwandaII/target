import XLSX from 'xlsx';
import { writeFileSync } from 'fs';

const wb = XLSX.read("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx", { type: 'file' });
const data = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], { header: 1, defval: '' });

// Print ALL row 0 values to see what's actually in column A
console.log("=== ALL NON-EMPTY COLUMN A VALUES (row number: value) ===");
for (let i = 0; i < data.length; i++) {
  const a = String(data[i][0]).trim();
  if (a) {
    const c = String(data[i][2]).trim().slice(0, 60);
    console.log(`Row ${i+1}: colA="${a}" | colC="${c}"`);
  }
}

// Print all rows where col A and B are empty but col C is > 3 chars 
// (potential subcategory headers)
console.log("\n=== POTENTIAL SUBCATEGORIES (col A empty, col B empty, col C all caps) ===");
for (let i = 0; i < data.length; i++) {
  const a = String(data[i][0]).trim();
  const b = String(data[i][1]).trim();
  const c = String(data[i][2]).trim();
  const hasData = data[i].slice(3).some(x => String(x).trim() !== '');
  if (!a && !b && c && c === c.toUpperCase() && c.length > 3 && !hasData) {
    console.log(`Row ${i+1}: "${c}"`);
  }
}
