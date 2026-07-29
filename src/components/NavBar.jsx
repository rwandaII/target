import { useCart } from '../CartContext';

export default function NavBar({ onOpenCategories }) {
  const { totalItems, openDrawer } = useCart();

  return (
    <nav className="top-nav">
      <div className="top-nav-inner">
        <a href="/" className="nav-logo">TARGET TRADERS</a>

        <div className="nav-links">
          <button className="nav-link cats-btn" onClick={onOpenCategories}>
            &#9776; Categories
          </button>
        </div>

        <div className="nav-right">
          <button className="nav-icon-btn" onClick={openDrawer}>
            &#128722; My Cart
            {totalItems > 0 && <span className="cart-badge-count">{totalItems}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
