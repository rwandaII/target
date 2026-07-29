import { useCart } from '../CartContext';
import { getBrand } from '../data/categories';
import ProductCard from './ProductCard';

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, vat, total, totalItems, recommendations, addItem } = useCart();

  const freeShippingThreshold = 59000;
  const freeProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="page-content">
      <div className="cart-page-layout">
        <div className="cart-main">
          <h1 className="cp-title">MY CART ({totalItems} item{totalItems !== 1 ? 's' : ''})</h1>

          <div className="cp-shipping-notice">
            {subtotal >= freeShippingThreshold
              ? 'Congratulations, you qualify for free shipping!'
              : `Only ${(freeShippingThreshold - subtotal).toLocaleString()} RWF more for free shipping.`
            }
          </div>
          <div className="cp-free-bar">
            <div className="cp-free-bar-fill" style={{ width: `${freeProgress}%` }} />
          </div>

          {items.length === 0 ? (
            <p style={{ color: '#999', padding: '40px 0' }}>Your cart is empty.</p>
          ) : (
            <>
              <div className="cp-items">
                {items.map(item => (
                  <div key={item.id} className="cp-item cp-item-anim">
                    <div className="cp-item-img">{item.name.charAt(0)}</div>
                    <div className="cp-item-body">
                      <div className="cp-item-name">{item.name}</div>
                      <div className="cp-item-qty">
                        <button onClick={() => updateQty(item.id, item.quantity - 1)}>&minus;</button>
                        <span className="qty-val">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <div className="cp-item-right">
                      <div className="cp-item-price">{(item.price * item.quantity).toLocaleString()} RWF</div>
                      {item.quantity > 1 && (
                        <div className="cp-item-discount">{(item.price || 0).toLocaleString()} RWF / piece</div>
                      )}
                    </div>
                    <button className="cp-item-delete" onClick={() => removeItem(item.id)}>&times;</button>
                  </div>
                ))}
              </div>

              <div className="cp-reco">
                <h2 className="cp-reco-title">Inspired by your cart</h2>
                <div className="cp-reco-grid">
                  {recommendations.map((p, i) => {
                    const id = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                      <ProductCard
                        key={id + i}
                        product={{ ...p, id, brand: getBrand(p.name) }}
                        onAddToCart={(prod) => addItem(prod, 1)}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="cart-sidebar">
          <div className="cart-sidebar-inner">
            <div className="cs-coupon">
              <div className="cs-coupon-title">
                Discount coupon
                <span>&#9660;</span>
              </div>
              <div className="cs-coupon-input-row">
                <input type="text" className="cs-coupon-input" placeholder="Promo code" />
                <button className="cs-coupon-btn">OK</button>
              </div>
            </div>

            <div className="cs-summary-title">Summary</div>
            <div className="cs-row">
              <span>Subtotal (inc. VAT)</span>
              <span>{subtotal.toLocaleString()} RWF</span>
            </div>
            <div className="cs-row">
              <span>VAT (18%)</span>
              <span>{vat.toLocaleString()} RWF</span>
            </div>
            <div className="cs-row">
              <span>Discount</span>
              <span>0 RWF</span>
            </div>
            <div className="cs-row total">
              <span>Total (inc. VAT)</span>
              <span>{total.toLocaleString()} RWF</span>
            </div>
            <p className="cs-shipping-note">
              Shipping fees will be calculated at the next step.
            </p>

            <button className="cs-checkout-btn">Place my order</button>

            <div className="cs-loyalty">
              <div className="cs-loyalty-text">
                <strong>{(total * 0.01).toFixed(0)} points</strong> loyalty points<br />
                {(317 - (total * 0.01)).toFixed(0)} points to receive a 6,000 RWF discount coupon
              </div>
              <div className="cs-loyalty-bar">
                <div className="cs-loyalty-fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
