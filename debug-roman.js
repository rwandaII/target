import XLSX from 'xlsx';
import { writeFileSync, readFileSync } from 'fs';

const buf = readFileSync("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx");
const wb = XLSX.read(buf, { type: 'buffer' });
const data = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], { header: 1, defval: '' });

const romanNumeral = /^(X{0,3}(IX|IV|V?I{0,3})?)$/;

// Check row 4 specifically
const row = data[3];
console.log("Row 4 test:");
console.log("c0:", JSON.stringify(row[0]));
console.log("c1:", JSON.stringify(row[1]));
console.log("c2:", JSON.stringify(row[2]));
console.log("romanNumeral.test('I'):", romanNumeral.test("I"));
console.log("romanNumeral.test('II'):", romanNumeral.test("II"));
console.log("romanNumeral.test('III'):", romanNumeral.test("III"));
console.log("romanNumeral.test('XIX'):", romanNumeral.test("XIX"));
console.log("romanNumeral.test('I'):", romanNumeral.test(String(row[0]).trim()));

// Check all rows that I think should be categories
const found = [];
for (let i = 3; i < data.length; i++) {
  const r = data[i];
  const c0 = String(r[0]).trim();
  const c2 = String(r[2] || '').trim();
  if (romanNumeral.test(c0) && c0.length <= 5 && c2) {
    found.push(`Row ${i+1}: c0="${c0}" c2="${c2}"`);
  }
}
console.log("\nRows matching roman numeral in col A:");
found.forEach(f => console.log("  "+f));

// Count total
console.log("\nTotal matches:", found.length);
