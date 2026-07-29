import { useState } from 'react';
import { getBrand } from '../data/categories';

export default function ProductDetailPage({ product, onBack, onAddToCart, categoryPath }) {
  const [qty, setQty] = useState(1);
  const [descExpanded, setDescExpanded] = useState(false);
  const [added, setAdded] = useState(false);

  const brand = getBrand(product.name);
  const subtotal = (product.price || 0) * qty;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    const id = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    onAddToCart({ ...product, id }, qty);
  };

  return (
    <div className="page-content">
      <div className="pdp">
        <div className="pdp-left">
          <div className="pdp-breadcrumb">
            <a href="/">Home</a>
            {categoryPath && categoryPath.map((crumb, i) => (
              <span key={i}>
                <span className="sep">&gt;</span>
                <span>{crumb}</span>
              </span>
            ))}
          </div>

          <div className="pdp-image">
            {product.name.charAt(0)}
          </div>
        </div>

        <div className="pdp-right">
          <h1 className="pdp-title">{product.name}</h1>
          {brand && <div className="pdp-brand">{brand}</div>}

          <div className="pdp-rating">
            <span className="pdp-stars">{'★'.repeat(0)}{'☆'.repeat(5)}</span>
            <span className="pdp-reviews">0 reviews</span>
          </div>

          <div className="pdp-price-block">
            <div className="pdp-current-price">{(product.price || 0).toLocaleString()} RWF</div>
            <div className="pdp-unit-price">{(product.price || 0).toLocaleString()} RWF / piece</div>
          </div>

          <div className="pdp-stock">
            {product.qtyInStock != null
              ? product.qtyInStock > 0
                ? <>{'\u2713'} {product.qtyInStock} in stock</>
                : <>{'\u274C'} Out of stock</>
              : <>{'\u2713'} In stock</>}
          </div>

          <div className="pdp-qty-row">
            <div className="qty-stepper">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>&minus;</button>
              <span className="qty-val">{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <div className="pdp-total-price">
              Total: <strong className="price-update">{(subtotal).toLocaleString()} RWF</strong>
            </div>
          </div>

          <button
            className={`pdp-add-btn ${added ? 'added' : ''}`}
            onClick={handleAdd}
          >
            {added ? '&#10003; Added!' : '&#128722; Add to cart'}
          </button>

          <div className="pdp-loyalty">
            &#9733; Earn {(product.price * 0.01).toFixed(0)} loyalty points on this product
          </div>

          <div className="pdp-shipping">
            &#10003; Free shipping on orders over 59,000 RWF
          </div>

          <div className="pdp-description">
            <div className="pdp-desc-text">
              {descExpanded
                ? `${product.name} - Product available at our pharmacy. Price: ${(product.price || 0).toLocaleString()} RWF. ${product.barcode ? `Barcode: ${product.barcode}` : ''}`
                : `${product.name} - Product available at our pharmacy.`.substring(0, 120) + '...'
              }
            </div>
            <button className="pdp-desc-toggle" onClick={() => setDescExpanded(!descExpanded)}>
              {descExpanded ? 'Show less' : 'Show more'}
            </button>
          </div>

          {product.barcode && (
            <div className="pdp-data-row">
              <span className="pdp-data-label">Barcode</span>
              <span className="pdp-data-value mono">{product.barcode}</span>
            </div>
          )}
          {product.discontinued === "Y" && (
            <div className="pdp-data-row">
              <span className="pdp-data-label">Status</span>
              <span className="pdp-data-value" style={{ color: 'var(--pink)' }}>Discontinued</span>
            </div>
          )}
          <div className="pdp-data-row">
            <span className="pdp-data-label">Data source</span>
            <span className="pdp-data-value">DEPOT KGLI DPMT.xlsx</span>
          </div>

          <div className="pdp-links">
            <button className="pdp-link" onClick={onBack}>
              &larr; Back to products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
