import { useState, useMemo } from 'react';
import { findCategoryBySlug, findSubcategoryBySlug, getBrand } from '../data/categories';
import ProductCard from './ProductCard';

export default function CategoryListingPage({ catSlug, subSlug, onSelectProduct, onAddToCart }) {
  const lookup = useMemo(() => {
    let cat = findCategoryBySlug(catSlug);
    let sub = null;
    if (!cat) {
      const result = findSubcategoryBySlug(catSlug);
      if (result) {
        cat = result.parent;
        sub = result.subcategory;
      }
    } else if (subSlug) {
      sub = cat.children.find(s => s.slug === subSlug) || null;
    }
    return { cat, sub };
  }, [catSlug, subSlug]);

  const { cat: category, sub: subcategory } = lookup;

  const products = useMemo(() => {
    if (subcategory) return subcategory.products || [];
    if (category) return category.children.flatMap(s => s.products || []);
    return [];
  }, [category, subcategory]);

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000);
  const [brandFilter, setBrandFilter] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const brands = useMemo(() => {
    const brandSet = new Set();
    products.forEach(p => brandSet.add(getBrand(p.name)));
    return [...brandSet].sort();
  }, [products]);

  const filteredBrands = brands.filter(b =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const visibleBrands = showAllBrands ? filteredBrands : filteredBrands.slice(0, 8);

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (p.price < priceMin || p.price > priceMax) return false;
      if (brandFilter && getBrand(p.name) !== brandFilter) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [products, priceMin, priceMax, brandFilter, sortBy]);

  const pageLabel = subcategory ? subcategory.label : (category ? category.label : catSlug);
  const pageTitle = pageLabel.toUpperCase();

  const [filtersOpen, setFiltersOpen] = useState({ price: true, brand: true });

  if (!category && !subcategory) {
    return (
      <div className="page-content" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Category not found</h2>
        <p style={{ color: '#999', marginTop: 8 }}>The category &quot;{catSlug}&quot; does not exist.</p>
        <a href="/" style={{ color: 'var(--blue)', marginTop: 16, display: 'inline-block' }}>Back to home</a>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="clp">
        <aside className="clp-sidebar">
          <div className="filter-panel">
            <div className="filter-title">FILTER</div>

            <div className="filter-section">
              <div className="filter-section-header" onClick={() => setFiltersOpen(p => ({ ...p, price: !p.price }))}>
                Price <span className={`arrow ${filtersOpen.price ? 'open' : ''}`}>&#9660;</span>
              </div>
              {filtersOpen.price && (
                <div className="filter-section-body">
                  <div className="price-range-inputs">
                    <input type="number" value={priceMin} onChange={e => setPriceMin(Number(e.target.value))} min={0} />
                    <span>&mdash;</span>
                    <input type="number" value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} min={0} />
                    <span>RWF</span>
                  </div>
                  <input
                    type="range"
                    className="price-slider"
                    min={0}
                    max={10000}
                    step={500}
                    value={priceMax}
                    onChange={e => setPriceMax(Number(e.target.value))}
                  />
                </div>
              )}
            </div>

            <div className="filter-section">
              <div className="filter-section-header" onClick={() => setFiltersOpen(p => ({ ...p, brand: !p.brand }))}>
                Brand <span className={`arrow ${filtersOpen.brand ? 'open' : ''}`}>&#9660;</span>
              </div>
              {filtersOpen.brand && (
                <div className="filter-section-body">
                  <input
                    type="text"
                    className="filter-search"
                    placeholder="Search..."
                    value={brandSearch}
                    onChange={e => setBrandSearch(e.target.value)}
                  />
                  {visibleBrands.map(b => (
                    <label key={b} className="filter-checkbox-row">
                      <input
                        type="checkbox"
                        checked={brandFilter === b}
                        onChange={() => setBrandFilter(brandFilter === b ? '' : b)}
                      />
                      {b}
                      <span className="count">({products.filter(p => getBrand(p.name) === b).length})</span>
                    </label>
                  ))}
                  {filteredBrands.length > 8 && (
                    <button className="filter-show-more" onClick={() => setShowAllBrands(!showAllBrands)}>
                      {showAllBrands ? 'Show less' : `Show more (${filteredBrands.length - 8})`}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className="clp-main">
          <div className="clp-breadcrumb">
            <a href="/">Home</a>
            <span className="sep">&gt;</span>
            {category && <a href={`/category/${category.slug}`}>{category.label}</a>}
            {subcategory && (
              <>
                <span className="sep">&gt;</span>
                <span>{subcategory.label}</span>
              </>
            )}
            {!category && !subcategory && <span>{catSlug}</span>}
          </div>

          <div className="clp-title-row">
            <h1 className="clp-title">{pageTitle}</h1>
          </div>
          <p className="clp-count">{products.length} product{products.length !== 1 ? 's' : ''}</p>

          <div className="clp-sort-row">
            <span className="clp-sort-label">Sort by</span>
            <select className="clp-sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {products.length === 0 ? (
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <p style={{ fontSize: 16, color: '#666', marginBottom: 8 }}>This category has no products yet.</p>
              <p style={{ fontSize: 13, color: '#999' }}>Check back later for new arrivals.</p>
            </div>
          ) : filtered.length === 0 ? (
            <p style={{ color: '#999', padding: '40px 0', textAlign: 'center' }}>No products match your filters.</p>
          ) : (
            <div className="product-grid">
              {filtered.map((p, i) => {
                const id = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const brand = getBrand(p.name);
                return (
                  <div key={id + i} className="prod-card-fade" style={{ animationDelay: `${i * 0.05}s` }}>
                    <ProductCard
                      product={{ ...p, id, brand }}
                      onSelect={onSelectProduct}
                      onAddToCart={onAddToCart}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
