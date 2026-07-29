import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('src/data/categories-menu.json', 'utf8'));

data.forEach(cat => {
  cat.children.forEach(sub => {
    sub.products.forEach(p => {
      p.price = 3000;
      p.currency = 'RWF';
    });
  });
});

writeFileSync('src/data/categories-menu.json', JSON.stringify(data, null, 2));
console.log('Added price 3000 to all products');

// Stats
let total = 0;
data.forEach(c => c.children.forEach(s => total += s.products.length));
console.log('Total products:', total);
