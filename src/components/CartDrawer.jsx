import { useCart } from '../CartContext';

export default function CartDrawer({ onViewCart, onSelectProduct }) {
  const { items, drawerOpen, closeDrawer, updateQty, subtotal, total, recommendations, addItem } = useCart();

  return (
    <>
      <div className={`cd-overlay ${drawerOpen ? 'open' : ''}`} onClick={closeDrawer} />
      <div className={`cd-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="cd-header">
          <span className="cd-header-text">&#10003; ITEM ADDED SUCCESSFULLY</span>
          <button className="cd-close" onClick={closeDrawer}>&times;</button>
        </div>

        <div className="cd-body">
          {items.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '40px 0' }}>Your cart is empty</p>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="cd-product cd-product-anim">
                  <div className="cd-product-img">{item.name.charAt(0)}</div>
                  <div className="cd-product-info">
                    <div className="cd-product-name">{item.name}</div>
                    <div className="cd-product-qty">
                      <button className="cd-qty-btn" onClick={() => updateQty(item.id, item.quantity - 1)}>&minus;</button>
                      <span className="cd-qty-val">{item.quantity}</span>
                      <button className="cd-qty-btn" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="cd-product-price">{(item.price * item.quantity).toLocaleString()} RWF</div>
                </div>
              ))}

              <div className="cd-free-shipping">
                <div>Free shipping on orders over 59,000 RWF</div>
                <div className="cd-free-bar">
                  <div className="cd-free-bar-fill" style={{ width: `${Math.min(100, (subtotal / 59000) * 100)}%` }} />
                </div>
              </div>

              <div className="cd-reco">
                <div className="cd-reco-title">You may also like</div>
                <div className="cd-reco-grid">
                  {recommendations.slice(0, 2).map((p, i) => {
                    const id = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                      <div key={id + i} className="cd-reco-card" onClick={() => onSelectProduct && onSelectProduct(p)}>
                        <div className="cd-reco-card-img">{p.name.charAt(0)}</div>
                        <div className="cd-reco-card-name">{p.name}</div>
                        <div className="cd-reco-card-price">{(p.price || 0).toLocaleString()} RWF</div>
                        <button className="cd-reco-card-add" onClick={e => {
                          e.stopPropagation();
                          addItem({ ...p, id }, 1);
                        }}>Add</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="cd-footer">
          <div className="cd-total-row">
            <span className="total-label">Cart total</span>
            <span className="total-value">{total.toLocaleString()} RWF</span>
          </div>
          <div className="cd-buttons">
            <button className="cd-btn-primary" onClick={onViewCart}>Order now</button>
            <button className="cd-btn-secondary" onClick={closeDrawer}>Continue shopping</button>
          </div>
        </div>
      </div>
    </>
  );
}
