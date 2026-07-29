const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'src', 'data', 'categories-menu.json');

const newArrivals = [
  { no: 1,  name: "Dettol Liquid 125ml",                          qty: 96,  sp: 2800 },
  { no: 2,  name: "Dettol Wipes",                                  qty: 48,  sp: 4000 },
  { no: 3,  name: "Veet Cream Normal Skin 100ml",                  qty: 216, sp: 5500 },
  { no: 4,  name: "Veet Cream Dry Skin 100ml",                     qty: 120, sp: 5500 },
  { no: 5,  name: "Veet Cream Sensitive Skin 100ml",               qty: 240, sp: 5500 },
  { no: 6,  name: "Hot Water Bag 2L",                              qty: 96,  sp: 15000 },
  { no: 7,  name: "Smooth Shaver Triple Blade Razor",               qty: 144, sp: 11500 },
  { no: 8,  name: "Sensodyne Soft Toothbrush B/1",                 qty: 288, sp: 5000 },
  { no: 9,  name: "Sensodyne Soft Toothbrush B/3",                 qty: 287, sp: 8500 },
  { no: 10, name: "Oral-B Adult Toothbrush B/4 Black",             qty: 216, sp: 8500 },
  { no: 11, name: "Oral-B Kids 3+ Years Toothbrush B/1",           qty: 192, sp: 4200 },
  { no: 12, name: "Oral-B Kids Toothbrush B/3",                    qty: 48,  sp: 8200 },
  { no: 13, name: "Oral-B Dental Floss 50m",                       qty: 288, sp: 5500 },
  { no: 14, name: "Colgate Baby 0-2 Years Toothbrush B/1",         qty: 72,  sp: 4000 },
  { no: 15, name: "Colgate Kids 2-5 Years Toothbrush B/1",         qty: 72,  sp: 4000 },
  { no: 16, name: "Concord Single Brush (S,H,M) with Floss",       qty: 372, sp: 5000 },
  { no: 17, name: "Concord Nail Clipper Set",                      qty: 50,  sp: 16000 },
  { no: 18, name: "Concord Nail Clipper Single",                   qty: 60,  sp: 3500 },
  { no: 19, name: "Concord Nail Clipper Pair",                     qty: 96,  sp: 5000 },
  { no: 20, name: "Baby Nail Clipper",                              qty: 240, sp: 3500 },
  { no: 21, name: "Vicks Vaporub 50g",                             qty: 300, sp: 8000 },
  { no: 22, name: "Vicks Inhaler",                                 qty: 240, sp: 4000 },
  { no: 23, name: "Only Baby Fruit and Vegetable Feeder",          qty: 144, sp: 4000 },
  { no: 24, name: "Qutie Nasal Aspirator",                         qty: 288, sp: 5000 },
  { no: 25, name: "Durex Play Classic Lubricant H2O 50ml",         qty: 72,  sp: 16500 },
  { no: 26, name: "Baoda Manual Breast Pump",                      qty: 72,  sp: 38000 },
  { no: 27, name: "Baoda Electric Breast Pump",                    qty: 40,  sp: 55000 },
  { no: 28, name: "Vaseline Lip Therapy Original",                 qty: 144, sp: 8500 },
  { no: 29, name: "Vaseline Lip Therapy Rosy",                     qty: 120, sp: 8500 },
  { no: 30, name: "Vaseline Lip Therapy Aloe",                     qty: 96,  sp: 8500 },
  { no: 31, name: "Cherry Cotton Pads",                            qty: 144, sp: 2500 },
  { no: 32, name: "Sudocream 60g",                                 qty: 216, sp: 8500 },
  { no: 33, name: "Sudocream 125g",                                qty: 240, sp: 15000 },
  { no: 34, name: "Sudocream 250g",                                qty: 240, sp: 19500 },
];

// Explicit mappings for products the fuzzy algorithm can't distinguish
const explicitMappings = {
  "Veet Cream Sensitive Skin 100ml": "VEET CREAM SENSITIVE 100ML",
  "Sensodyne Soft Toothbrush B/3": "SENSODYNE TOOTH BRUSH B/3",
  "Oral-B Kids Toothbrush B/3": "ORAL B KID TOOTH BRUSH 3Y+ (TRIPLE PACK /3)",
  "Colgate Kids 2-5 Years Toothbrush B/1": "COLGETE KIDS 2-5 YEARS TOOTHBRUSH ( SINGLE PACK/1)",
  "Vaseline Lip Therapy Rosy": "VASELINE LIP THERAPY THERAPY ROSY",
  "Sensodyne Soft Toothbrush B/1": "SENSODYNE SOFT SINGLE TOOTHBRUSH",
  "Oral-B Kids 3+ Years Toothbrush B/1": "ORAL KIDS 3+ YEARS TOOTHBRUSH (SINLE PACK/1)",
  "Colgate Baby 0-2 Years Toothbrush B/1": "COLGETE BABY 0-2 YEARS TOOTHBRUSH ( SINGLE PACK/1)",
  "Dettol Liquid 125ml": "DETTOL ANTISEPTIC LIQUID 125ML",
  "Veet Cream Normal Skin 100ml": "VEET CREAM NORMAL SKIN 100ML",
  "Veet Cream Dry Skin 100ml": "VEET CREAM DRY SKIN 100ML",
  "Hot Water Bag 2L": "HOT WATER BAG",
  "Smooth Shaver Triple Blade Razor": "SMOOTH SHAVER TRIPPLE BLADE RAZOR",
  "Oral-B Adult Toothbrush B/4 Black": "ORAL B ADULT TOOTHBRUSH B/4 BLACK",
  "Oral-B Dental Floss 50m": "oral b essential floss 50m unwaxed",
  "Concord Single Brush (S,H,M) with Floss": "CONCORD SINGLE BRUSH (S,H,M) WITH FLOSS",
  "Concord Nail Clipper Set": "CONCORDE BABY NAIL CLIPPER SET",
  "Concord Nail Clipper Single": "COCORDE NAIL CLIPPER SINGLE",
  "Concord Nail Clipper Pair": "CONCORDE NAIL CLIPPER  PAIR",
  "Baby Nail Clipper": "BABY NAIL CLIPPER",
  "Vicks Vaporub 50g": "VICKS VAPORUB 50G",
  "Vicks Inhaler": "VICKS INHALER",
  "Only Baby Fruit and Vegetable Feeder": "ONLY BABY FRUIT AND VEGETABLE FEEDER",
  "Qutie Nasal Aspirator": "QUTIE NASAL ASPIRATOR",
  "Durex Play Classic Lubricant H2O 50ml": "DUREX  PLAY CLASSIC LUBRICANT H2O 50ml",
  "Baoda Manual Breast Pump": "BAODA MANUAL BREAST PUMP",
  "Baoda Electric Breast Pump": "BAODA ELECTRIC BREAST PUMP",
  "Vaseline Lip Therapy Original": "VASELINE LIP THERAPY ORIGINAL",
  "Vaseline Lip Therapy Aloe": "VASELINE LIP THERAPY ALOE",
  "Cherry Cotton Pads": "CHERRY COTTON PADS",
  "Sudocream 60g": "SUDOCREAM 60g",
  "Sudocream 125g": "SUDOCREAM 125g",
  "Sudocream 250g": "SUDOCREAM 250g",
  "Dettol Wipes": "DETTOL WIPES",
};

function normalize(name) {
  return name
    .toUpperCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s*[-–—]\s*/g, '-')
    .replace(/\s*\/\s*/g, '/')
    .replace(/\(|\)/g, '')
    .replace(/[^\w\s\/-]/g, '')
    .trim();
}

function getTokens(s) {
  return s.split(/[\s\/-]+/).filter(t => t.length >= 2);
}

function matchScore(search, target) {
  const s = normalize(search);
  const t = normalize(target);

  if (s === t) return { score: 100, label: 'exact' };

  // Check if search is fully contained in target or vice versa (whole word boundaries)
  if (t.includes(s) && s.length >= 4) return { score: 90, label: 'search-in-target' };
  if (s.includes(t) && t.length >= 4) return { score: 85, label: 'target-in-search' };

  // Token-based matching
  const sTokens = getTokens(s);
  const tTokens = getTokens(t);

  if (sTokens.length === 0 || tTokens.length === 0) return { score: 0, label: 'no-tokens' };

  // Count how many search tokens are found in target tokens (whole word or as prefix)
  let exactHits = 0;
  let partialHits = 0;

  for (const st of sTokens) {
    let found = false;
    for (const tt of tTokens) {
      if (st === tt) {
        exactHits++;
        found = true;
        break;
      }
    }
    if (!found) {
      for (const tt of tTokens) {
        if (st.includes(tt) || tt.includes(st)) {
          if (st.length >= 3 && tt.length >= 3) {
            partialHits++;
            found = true;
            break;
          }
        }
      }
    }
  }

  const meaningfulTokens = sTokens.filter(t => t.length >= 3);
  const meaningfulTargetTokens = tTokens.filter(t => t.length >= 3);
  const meaningfulMin = Math.min(meaningfulTokens.length, meaningfulTargetTokens.length);

  // Must match at least 70% of meaningful tokens
  if (meaningfulMin > 0 && exactHits >= Math.ceil(meaningfulMin * 0.7)) {
    return { score: 80, label: 'token-match', exactHits, totalTokens: meaningfulTokens.length };
  }

  if (meaningfulMin > 0 && (exactHits + partialHits) >= Math.ceil(meaningfulMin * 0.7) && exactHits >= 1) {
    return { score: 70, label: 'partial-token-match', exactHits, partialHits, totalTokens: meaningfulTokens.length };
  }

  return { score: 0, label: 'no-match' };
}

function main() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  const data = JSON.parse(raw);

  let updated = 0;
  let created = 0;
  const createdItems = [];
  const badMatches = [];

  // Build lookup of product name → product object for fast explicit matching
  const productByName = {};
  for (const cat of data) {
    for (const sub of cat.children || []) {
      for (const prod of sub.products || []) {
        productByName[prod.name] = prod;
      }
    }
  }

  for (const arrival of newArrivals) {
    // Check explicit mapping first
    const explicitTarget = explicitMappings[arrival.name];
    if (explicitTarget && productByName[explicitTarget]) {
      const prod = productByName[explicitTarget];
      const oldSp = prod.sellingPrice;
      const oldQty = prod.qtyInStock;
      prod.sellingPrice = arrival.sp;
      prod.price = arrival.sp;
      prod.qtyInStock = arrival.qty;
      updated++;
      console.log(`✓ UPDATED: "${arrival.name}" → "${explicitTarget}" [explicit], SP: ${oldSp ?? 'null'} → ${arrival.sp}, QTY: ${oldQty ?? 'null'} → ${arrival.qty}`);
      continue;
    }

    // Fall back to fuzzy matching for products not in explicit mapping
    let bestResult = { score: 0 };
    let bestMatch = null;
    let bestCat = null;
    let bestSub = null;

    for (const cat of data) {
      if (!cat.children) continue;
      for (const sub of cat.children) {
        if (!sub.products) continue;
        for (const prod of sub.products) {
          const result = matchScore(arrival.name, prod.name);
          if (result.score > bestResult.score) {
            bestResult = result;
            bestMatch = prod;
            bestCat = cat;
            bestSub = sub;
          }
        }
      }
    }

    if (bestResult.score >= 70 && bestMatch) {
      const oldSp = bestMatch.sellingPrice;
      const oldQty = bestMatch.qtyInStock;
      bestMatch.sellingPrice = arrival.sp;
      bestMatch.price = arrival.sp;
      bestMatch.qtyInStock = arrival.qty;
      updated++;
      console.log(`✓ UPDATED: "${arrival.name}" → "${bestMatch.name}" [${bestResult.label}], SP: ${oldSp ?? 'null'} → ${arrival.sp}, QTY: ${oldQty ?? 'null'} → ${arrival.qty}`);
    } else if (bestResult.score >= 60 && bestMatch) {
      // Low confidence match - flag for review
      badMatches.push({ arrival: arrival.name, matched: bestMatch.name, score: bestResult.score, label: bestResult.label });
      // Still update but warn
      const oldSp = bestMatch.sellingPrice;
      const oldQty = bestMatch.qtyInStock;
      bestMatch.sellingPrice = arrival.sp;
      bestMatch.price = arrival.sp;
      bestMatch.qtyInStock = arrival.qty;
      updated++;
      console.log(`⚠ LOW CONFIDENCE: "${arrival.name}" → "${bestMatch.name}" [score=${bestResult.score}, ${bestResult.label}], SP: ${oldSp ?? 'null'} → ${arrival.sp}, QTY: ${oldQty ?? 'null'} → ${arrival.qty}`);
    } else {
      // Create new in the best matching category
      const nameUpper = arrival.name.toUpperCase();
      let targetCat;
      if (/BABY|NURSING|INFANT|COTTON PAD|NAIL CLIPPER/.test(nameUpper)) {
        targetCat = data.find(c => c.label === "BABY RANGE");
      } else if (/TOOTHBRUSH|TOOTH|DENTAL|FLOSS|ORAL/.test(nameUpper)) {
        targetCat = data.find(c => c.label === "ORAL CARE & ACCESSORIES");
      } else if (/VEET|VASELINE|LIP THERAPY|CHERRY COTTON/.test(nameUpper)) {
        targetCat = data.find(c => c.label === "COSMETICS & SKIN CARE RPDUCTS");
      } else if (/VICKS|VAPORUB|INHALER|SUDOCREAM/.test(nameUpper)) {
        targetCat = data.find(c => c.label === "HEALTHCARE PRODUCTS" || c.label === "OTCs");
      } else if (/HOT WATER BAG|SMOOTH SHAVER/.test(nameUpper)) {
        targetCat = data.find(c => c.label === "PERSONAL CARE & HYGIENICS");
      } else if (/DETTOL/.test(nameUpper)) {
        targetCat = data.find(c => c.label === "HOUSEHOLD & HOME NEEDS PRODUCTS");
      } else if (/CONCORD|SHAVER|RAZOR|GROOMING/.test(nameUpper)) {
        targetCat = data.find(c => c.label === "FATHER CARE & GROOMING");
      } else if (/DUREX|LUBRICANT|SEXUAL/.test(nameUpper)) {
        targetCat = data.find(c => c.label === "SEXUAL HEALTH & ACCESSORIES PRODUCTS");
      } else if (/BAODA|BREAST PUMP|MOTHER|LADY/.test(nameUpper)) {
        targetCat = data.find(c => c.label === "MOTHER & LADY RANGE");
      } else if (/QUTIE|NASAL|ASPIRATOR/.test(nameUpper)) {
        targetCat = data.find(c => c.label === "BABY RANGE");
      } else if (/VEGETABLE|FEEDER|FRUIT/.test(nameUpper)) {
        targetCat = data.find(c => c.label === "BABY RANGE");
      }
      targetCat = targetCat || data.find(c => c.label === "TARGET BRAND") || data[0];
      if (!targetCat.children) targetCat.children = [];
      let targetSub = targetCat.children.find(c => c.label === "NEW ARRIVALS");
      if (!targetSub) {
        targetSub = {
          id: `${targetCat.id}-new`,
          label: "NEW ARRIVALS",
          slug: "new-arrivals",
          productCount: 0,
          products: []
        };
        targetCat.children.push(targetSub);
      }
      const newProd = {
        name: arrival.name.toUpperCase(),
        barcode: null,
        sellingPrice: arrival.sp,
        unitPrice: null,
        qtyInStock: arrival.qty,
        discontinued: null,
        price: arrival.sp,
        currency: "RWF"
      };
      targetSub.products.push(newProd);
      targetSub.productCount = targetSub.products.length;
      created++;
      createdItems.push({ name: arrival.name, category: `${targetCat.label} > ${targetSub.label}` });
      console.log(`✗ CREATED: "${arrival.name}" → ${targetCat.label} > ${targetSub.label}, SP=${arrival.sp}, QTY=${arrival.qty}`);
    }
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`\n===== SUMMARY =====`);
  console.log(`Matched & Updated: ${updated}`);
  console.log(`Newly Created:     ${created}`);
  if (badMatches.length > 0) {
    console.log(`\n⚠ Low-confidence matches (review recommended):`);
    for (const m of badMatches) {
      console.log(`  "${m.arrival}" → "${m.matched}" (${m.label}, score=${m.score})`);
    }
  }
  if (createdItems.length > 0) {
    console.log(`\nNew products created:`);
    for (const item of createdItems) {
      console.log(`  - "${item.name}" → ${item.category}`);
    }
  }
}

main();
