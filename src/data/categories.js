import menuData from './categories-menu.json';

export const categoryMenu = menuData;

export const categories = menuData.map((cat, i) => ({
  name: cat.label,
  slug: cat.slug,
  productCount: cat.children.reduce((s, c) => s + c.productCount, 0),
  subcategoryCount: cat.children.length,
}));

export function findCategoryBySlug(slug) {
  return menuData.find(c => c.slug === slug) || null;
}

export function findAnyBySlug(slug) {
  for (const cat of menuData) {
    if (cat.slug === slug) return { type: 'category', data: cat };
    for (const sub of cat.children) {
      if (sub.slug === slug) return { type: 'subcategory', data: sub, parent: cat };
    }
  }
  return null;
}

export function findSubcategory(categorySlug, subSlug) {
  const cat = menuData.find(c => c.slug === categorySlug);
  if (!cat) return null;
  return cat.children.find(s => s.slug === subSlug) || null;
}

export function findSubcategoryBySlug(slug) {
  for (const cat of menuData) {
    const sub = cat.children.find(s => s.slug === slug);
    if (sub) return { subcategory: sub, parent: cat };
  }
  return null;
}

export function findProductById(id) {
  for (const cat of menuData) {
    for (const sub of cat.children) {
      for (const p of sub.products) {
        const pid = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (pid === id) {
          return { ...p, categoryLabel: cat.label, subcategoryLabel: sub.label, id };
        }
      }
    }
  }
  return null;
}

export function getAllProducts() {
  const out = [];
  for (const cat of menuData) {
    for (const sub of cat.children) {
      for (const p of sub.products) {
        const id = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        out.push({ ...p, categoryLabel: cat.label, subcategoryLabel: sub.label, id });
      }
    }
  }
  return out;
}

export function getBreadcrumbs(catSlug, subSlug) {
  const crumbs = [{ label: 'Home', slug: '/' }];
  const cat = menuData.find(c => c.slug === catSlug);
  if (!cat) return crumbs;
  crumbs.push({ label: cat.label, slug: `/category/${cat.slug}` });
  if (subSlug) {
    const sub = cat.children.find(s => s.slug === subSlug);
    if (sub) crumbs.push({ label: sub.label, slug: `/category/${cat.slug}/${sub.slug}` });
  }
  return crumbs;
}

export function getBrands() {
  const brandSet = new Set();
  for (const cat of menuData) {
    for (const sub of cat.children) {
      for (const p of sub.products) {
        const brand = p.name.split(' ')[0].replace(/[^a-zA-Z0-9&]+/g, '');
        if (brand) brandSet.add(brand);
      }
    }
  }
  return [...brandSet].sort();
}

export function getBrand(productName) {
  return productName.split(' ')[0].replace(/[^a-zA-Z0-9&]+/g, '');
}
