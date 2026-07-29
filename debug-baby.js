import XLSX from 'xlsx';
import { readFileSync } from 'fs';

const buf = readFileSync("C:\\Users\\USER\\OneDrive\\Documents\\TARGET\\DEPOT KGLI DPMT.xlsx");
const wb = XLSX.read(buf, { type: 'buffer', cellStyles: true });
const ws = wb.Sheets['Sheet1'];
const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

function getHpt(rowIdx) {
  const r = ws['!rows'] && ws['!rows'][rowIdx];
  return r && r.hpt ? r.hpt : 0;
}

function isEmpty(row, s, e) {
  for (let j = s; j <= (e || s); j++)
    if (String(row[j] || '').trim() !== '') return false;
  return true;
}

// Check ALL rows in BABY RANGE (Row 4 to Row 215) for subcategory conditions
console.log("BABY RANGE rows that are ALL CAPS, col B empty, length > 2:");
for (let i = 4; i < 215; i++) {
  const row = data[i];
  const c0 = String(row[0] || '').trim();
  const c1 = String(row[1] || '').trim();
  const c2 = String(row[2] || '').trim();
  if (!c2) continue;
  
  const hpt = getHpt(i);
  const isAllCaps = c2 === c2.toUpperCase();
  const prevRow = data[i - 1] || [];
  const prevRowBlank = !isEmpty(prevRow, 0, 2);
  const catFormatted = true; // BABY RANGE is formatted
  
  const wouldCatch = !c1 && isAllCaps && c2.length > 2 && (prevRowBlank || (catFormatted && hpt >= 17));
  
  if (wouldCatch) {
    console.log("  Row "+(i+1)+": hpt="+hpt+" prevBlank="+prevRowBlank+" caught="+wouldCatch+" val=\""+c2.slice(0,60)+"\"");
  }
}
