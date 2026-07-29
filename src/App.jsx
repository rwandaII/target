import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { CartProvider, useCart } from './CartContext';
import NavBar from './components/NavBar';
import CategoriesPanel from './components/CategoriesPanel';
import CategoryListingPage from './components/CategoryListingPage';
import ProductDetailPage from './components/ProductDetailPage';
import CartDrawer from './components/CartDrawer';
import CartPage from './components/CartPage';
import { categoryMenu, findProductById } from './data/categories';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <div className="home">
        <h1>TARGET TRADERS LTD</h1>
        <p>Your trusted pharmacy &amp; baby care supplier. Browse our complete catalog below.</p>
        <div className="home-grid">
          {categoryMenu.map(cat => (
            <div
              key={cat.slug}
              className="home-cat-card"
              onClick={() => navigate(`/category/${cat.slug}`)}
            >
              <div className="home-cat-icon">{cat.label.charAt(0)}</div>
              <div className="home-cat-label">{cat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryPage() {
  const { catSlug, subSlug } = useParams();
  const navigate = useNavigate();
  const { addItem, openDrawer } = useCart();

  return (
    <CategoryListingPage
      catSlug={catSlug}
      subSlug={subSlug}
      onSelectProduct={(product) => {
        const id = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        navigate(`/product/${id}`);
      }}
      onAddToCart={(product, qty = 1) => {
        addItem(product, qty);
        openDrawer();
      }}
    />
  );
}

function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem, openDrawer } = useCart();

  const product = findProductById(productId);

  if (!product) {
    return (
      <div className="page-content" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p style={{ color: '#999', marginTop: 8 }}>The product &quot;{productId}&quot; does not exist.</p>
        <a href="/" style={{ color: 'var(--blue)', marginTop: 16, display: 'inline-block' }}>Back to home</a>
      </div>
    );
  }

  return (
    <ProductDetailPage
      product={product}
      onBack={() => navigate(-1)}
      categoryPath={[product.categoryLabel, product.subcategoryLabel]}
      onAddToCart={(p, qty) => {
        addItem(p, qty);
        openDrawer();
      }}
    />
  );
}

function CartPageWrapper() {
  return <CartPage />;
}

function AppContent() {
  const [catsOpen, setCatsOpen] = useState(false);
  const navigate = useNavigate();
  const { openDrawer } = useCart();

  const handleSelectCategory = (node, parentSlug) => {
    const slug = node.slug;
    if (parentSlug) {
      navigate(`/category/${parentSlug}/${slug}`);
    } else {
      navigate(`/category/${slug}`);
    }
  };

  return (
    <div className="app">
      <NavBar onOpenCategories={() => setCatsOpen(true)} />

      <CategoriesPanel
        open={catsOpen}
        onClose={() => setCatsOpen(false)}
        tree={categoryMenu}
        onSelectCategory={handleSelectCategory}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:catSlug" element={<CategoryPage />} />
        <Route path="/category/:catSlug/:subSlug" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<CartPageWrapper />} />
      </Routes>

      <CartDrawer
        onViewCart={() => navigate('/cart')}
        onSelectProduct={(product) => {
          const id = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          navigate(`/product/${id}`);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}
