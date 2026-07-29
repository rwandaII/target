import XLSX from 'xlsx';
import { readFileSync } from 'fs';

const buf = readFileSync("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx");
const wb = XLSX.read(buf, { type: 'buffer', cellStyles: true });
const ws = wb.Sheets['Sheet1'];

// Check specific rows I care about
const targets = [
  // Row numbers (Excel, 1-indexed)
  5, 33, 64, 109, 176, 197, 216, 217, 246, 287, 307, 325, 326, 344, 366, 367, 
  391, 392, 413, 429, 435, 441, 447, 461, 475, 486, 509, 533, 534, 564, 566, 
  604, 605, 630, 631, 653, 687, 699, 765, 793, 807, 829, 848, 878, 904, 905, 925,
  496, 508 // Tensiometre, Household
];

console.log("Row | hpt | A | C");
console.log("----+-----+---+---");
targets.forEach(r => {
  const rowIdx = r - 1;
  const hr = ws['!rows'] && ws['!rows'][rowIdx];
  const hpt = hr ? hr.hpt : (ws['!rows'] ? 'dflt' : 'n/a');
  const aCell = ws[XLSX.utils.encode_cell({r: rowIdx, c: 0})];
  const cCell = ws[XLSX.utils.encode_cell({r: rowIdx, c: 2})];
  const a = aCell && aCell.v !== undefined && aCell.v !== null ? String(aCell.v).trim() : '';
  const c = cCell && cCell.v !== undefined && cCell.v !== null ? String(cCell.v).trim().slice(0, 50) : '';
  console.log(String(r).padStart(4)+" | "+String(hpt).padStart(4)+" | "+(a||'-').padStart(3)+" | "+(c||'-'));
});
