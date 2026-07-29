import XLSX from 'xlsx';

const wb = XLSX.read("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx", { type: 'file' });
const data = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], { header: 1, defval: '' });

// Debug first 10 rows - show all columns
console.log("=== FIRST 10 ROWS (all cols) ===");
for (let i = 0; i < 10; i++) {
  const row = data[i];
  const cols = [];
  for (let j = 0; j < Math.min(row.length, 16); j++) {
    const v = row[j];
    if (v !== '' && v !== undefined) cols.push(`[${j}]="${v}"`);
  }
  console.log(`Row ${i+1}: ${cols.join(', ') || '(all empty)'}`);
}

console.log("\n=== ROWS 3-40, col[0] and col[2] ===");
for (let i = 3; i < 40; i++) {
  const row = data[i];
  console.log(`Row ${i+1}: A="${row[0]}" B="${row[1]}" C="${row[2]}" D="${row[3]||''}" E="${row[4]||''}"`);
}

console.log("\n=== ROWS 3-40, columns 6-15 ===");
for (let i = 3; i < 40; i++) {
  const row = data[i];
  const cols68 = [];
  for (let j = 6; j <= 15; j++) {
    if (row[j] !== '' && row[j] !== undefined) cols68.push(`[${j}]="${row[j]}"`);
  }
  if (cols68.length) console.log("Row "+(i+1)+": "+cols68.join(', '));
}
