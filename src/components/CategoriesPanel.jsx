import { useState } from 'react';

function CatNode({ node, onNavigate, depth = 0 }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <li
      className="cp-item"
      onClick={() => {
        if (hasChildren) {
          onNavigate(node, 'push');
        } else {
          onNavigate(node, 'leaf');
        }
      }}
    >
      <span className="cp-item-label" style={{ paddingLeft: depth * 12 }}>{node.label}</span>
      {hasChildren && <span className="cp-item-arrow">&rarr;</span>}
    </li>
  );
}

export default function CategoriesPanel({ open, onClose, tree, onSelectCategory }) {
  const [history, setHistory] = useState([]);

  const currentLevel = history.length === 0
    ? { label: 'CATEGORIES', items: tree, parentSlug: null }
    : history[history.length - 1];

  const handleNavigate = (node, type) => {
    if (type === 'push') {
      const parentSlug = history.length === 0 ? node.slug : (history[history.length - 1].parentSlug || history[0].parentSlug);
      setHistory(prev => [...prev, { label: node.label, items: node.children, parentSlug: node.slug }]);
    } else if (type === 'leaf') {
      const parentSlug = history.length > 0 ? history[history.length - 1].parentSlug : null;
      onSelectCategory(node, parentSlug);
      setHistory([]);
      onClose();
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const handleClose = () => {
    setHistory([]);
    onClose();
  };

  return (
    <>
      <div className={`cats-overlay ${open ? 'open' : ''}`} onClick={handleClose} />
      <div className={`cats-panel ${open ? 'open' : ''}`}>
        <div className="cp-header">
          {history.length > 0 && (
            <button className="cp-back" onClick={handleBack}>&larr;</button>
          )}
          <span className="cp-title">{currentLevel.label}</span>
          <button className="cp-close" onClick={handleClose}>&times;</button>
        </div>

        <div className="cp-body">
          {history.length > 0 && (
            <div
              className="cp-voir-tout"
              onClick={() => {
                const parentSlug = history.length > 1 ? history[history.length - 2].parentSlug : null;
                onSelectCategory(
                  { label: currentLevel.label, slug: currentLevel.parentSlug },
                  parentSlug
                );
                setHistory([]);
                onClose();
              }}
            >
              View All
            </div>
          )}

          <ul className="cp-list">
            {currentLevel.items.map((item, i) => (
              <CatNode key={item.slug || i} node={item} onNavigate={handleNavigate} depth={history.length} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
