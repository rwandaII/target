export default function ProductCard({ product, onSelect, onAddToCart }) {
  const { name, price, brand, id, barcode, qtyInStock } = product;

  return (
    <div className="prod-card" onClick={() => onSelect && onSelect(product)}>
      <div className="pc-img">
        <span>{name.charAt(0)}</span>
        <button className="pc-wishlist" onClick={e => { e.stopPropagation(); }}>&#9825;</button>
      </div>
      {barcode && <div className="pc-badge-verified">&#10003; Verified</div>}
      <div className="pc-rating">
        {'★'.repeat(0)}{'☆'.repeat(5)}
        <span className="reviews">(0)</span>
      </div>
      {brand && <div className="pc-brand">{brand}</div>}
      <div className="pc-name">{name}</div>
      {barcode && <div className="pc-barcode">&#128196; {barcode}</div>}
      {qtyInStock != null && (
        <div className="pc-stock">
          {qtyInStock > 0 ? `\u2713 ${qtyInStock}` : '\u274C Out of stock'}
        </div>
      )}
      <div className="pc-prices">
        <div className="pc-current-price">{(price || 0).toLocaleString()} RWF</div>
        <div className="pc-unit-price">{(price || 0).toLocaleString()} RWF / piece</div>
      </div>
      <button
        className="pc-add-btn"
        onClick={e => {
          e.stopPropagation();
          onAddToCart && onAddToCart({ ...product, id });
        }}
      >
        &#128722; Add
      </button>
    </div>
  );
}
