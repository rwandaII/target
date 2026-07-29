import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="nav-item" ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="nav-link" onClick={() => setOpen(!open)}>
        {label} <span className="arrow">▼</span>
      </button>
      <div className={`nav-dropdown ${open ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

const NavLink = ({ to, children, active }) => {
  const location = useLocation();
  const isActive = active ? location.pathname === to : false;
  return (
    <Link className={`nav-link${isActive ? ' active' : ''}`} to={to}>
      {children}
    </Link>
  );
};

const DropdownLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to.includes('#') && location.pathname + location.hash === to);
  return (
    <Link className={`nav-dropdown-item${isActive ? ' active' : ''}`} to={to}>
      {children}
    </Link>
  );
};

export default function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          TARGET<span>TRADERS</span>
        </Link>
        <nav className="header-nav">
          <NavItem label="WHO ARE WE">
            <DropdownLink to="/our-mission">Our mission</DropdownLink>
            <DropdownLink to="/our-values">Our values</DropdownLink>
            <DropdownLink to="/our-commitments">Our commitments</DropdownLink>
            <DropdownLink to="/our-vision-for-future-healthcare">Our vision for future healthcare</DropdownLink>
            <div className="nav-dropdown-item has-sub">
              <Link className="nav-dropdown-item" to="/our-markets">
                Our markets <span className="sub-arrow">›</span>
              </Link>
              <div className="sub-dropdown">
                <DropdownLink to="/our-markets#kigali">Kigali</DropdownLink>
                <DropdownLink to="/our-markets#musanze">Musanze</DropdownLink>
                <DropdownLink to="/our-markets#rusagara">Rusagara</DropdownLink>
              </div>
            </div>
          </NavItem>
          <NavItem label="GOVERNANCE">
            <DropdownLink to="/our-leadership">Leadership</DropdownLink>
          </NavItem>
          <NavItem label="ACTIVITIES">
            <DropdownLink to="/target-depot">Target Depot</DropdownLink>
            <DropdownLink to="/target-parapharma">Target Parapharma</DropdownLink>
            <DropdownLink to="/target-traders">Target Traders</DropdownLink>
          </NavItem>
          <NavItem label="NEWS">
            <DropdownLink to="/our-news">Our news</DropdownLink>
            <DropdownLink to="/press-releases">Press releases</DropdownLink>
          </NavItem>
          <NavLink to="/contact">CONTACT</NavLink>
          <Link to="/our-career-opportunities" className="nav-link nav-career-btn">CAREER</Link>
          <div className="nav-lang">
            <span className={`nav-lang-item${isActive('/') || location.pathname.startsWith('/our') || isActive('/news') || isActive('/contact') || isActive('/press-releases') || isActive('/privacy') || isActive('/legal-notice') || isActive('/privacy-policy') ? ' active' : ''}`}>EN</span>
            <span className="nav-lang-sep">/</span>
            <Link to="/" className="nav-lang-item" onClick={(e) => { e.preventDefault(); }}>FR</Link>
            <span className="nav-lang-sep">/</span>
            <Link to="/" className="nav-lang-item" onClick={(e) => { e.preventDefault(); }}>NL</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
