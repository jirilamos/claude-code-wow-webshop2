import React, { useState, useEffect } from 'react';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, qty: quantity }];
    });
  };

  const updateCartItemQty = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const navigate = (path) => {
    window.location.hash = path;
  };

  let content;
  if (route === '#/cart') {
    content = (
      <Cart
        cart={cart}
        updateQty={updateCartItemQty}
        removeItem={removeFromCart}
        clearCart={clearCart}
        navigate={navigate}
      />
    );
  } else if (route.startsWith('#/product/')) {
    const productId = route.replace('#/product/', '');
    content = (
      <ProductDetail
        productId={productId}
        addToCart={addToCart}
        navigate={navigate}
      />
    );
  } else {
    content = (
      <ProductList
        addToCart={addToCart}
        navigate={navigate}
        cartItemCount={cart.reduce((sum, item) => sum + item.qty, 0)}
      />
    );
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.title} onClick={() => navigate('#/')}>
          WOW Webshop
        </h1>
        <button style={styles.cartButton} onClick={() => navigate('#/cart')}>
          🛒 Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})
        </button>
      </header>
      <main style={styles.main}>
        {content}
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    margin: 0,
    padding: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  title: {
    margin: 0,
    cursor: 'pointer'
  },
  cartButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  }
};

export default App;
