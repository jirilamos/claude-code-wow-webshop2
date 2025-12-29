import React, { useState } from 'react';

function Cart({ cart, updateQty, removeItem, clearCart, navigate }) {
  const [email, setEmail] = useState('');
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  const [error, setError] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    setError(null);

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: { email },
          items: cart.map(item => ({ id: item.id, qty: item.qty }))
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Checkout failed');
      }

      const data = await response.json();
      setCheckoutStatus(data);
      clearCart();
      setEmail('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (checkoutStatus) {
    return (
      <div style={styles.container}>
        <div style={styles.success}>
          <h2>✓ Order Confirmed!</h2>
          <p style={styles.successMessage}>{checkoutStatus.message}</p>
          <p><strong>Order ID:</strong> {checkoutStatus.orderId}</p>
          <p><strong>Total:</strong> {checkoutStatus.total} {checkoutStatus.currency}</p>
          <button
            style={styles.continueButton}
            onClick={() => {
              setCheckoutStatus(null);
              navigate('#/');
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <h2>Shopping Cart</h2>
        <p style={styles.emptyMessage}>Your cart is empty</p>
        <button style={styles.continueButton} onClick={() => navigate('#/')}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Shopping Cart</h2>
      {error && <div style={styles.error}>{error}</div>}
      <div style={styles.items}>
        {cart.map(item => (
          <div key={item.id} style={styles.item}>
            <img src={item.image} alt={item.name} style={styles.itemImage} />
            <div style={styles.itemInfo}>
              <h3>{item.name}</h3>
              <p>{item.price} {item.currency}</p>
            </div>
            <div style={styles.itemActions}>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 1)}
                style={styles.qtyInput}
              />
              <button
                style={styles.removeButton}
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
            <div style={styles.itemTotal}>
              {item.price * item.qty} CZK
            </div>
          </div>
        ))}
      </div>
      <div style={styles.summary}>
        <h3>Total: {total} CZK</h3>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.emailInput}
        />
        <button style={styles.checkoutButton} onClick={handleCheckout}>
          Checkout (mock)
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  items: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  item: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr auto auto',
    gap: '1rem',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid #eee'
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '5px'
  },
  itemInfo: {
    flex: 1
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  qtyInput: {
    width: '60px',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd'
  },
  removeButton: {
    padding: '0.5rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  itemTotal: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    minWidth: '100px',
    textAlign: 'right'
  },
  summary: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  emailInput: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '1rem'
  },
  checkoutButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  success: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  successMessage: {
    fontSize: '1.1rem',
    color: '#27ae60',
    margin: '1rem 0'
  },
  continueButton: {
    padding: '1rem 2rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '1rem'
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    padding: '2rem',
    color: '#7f8c8d'
  },
  error: {
    backgroundColor: '#fadbd8',
    color: '#c0392b',
    padding: '1rem',
    borderRadius: '5px',
    marginBottom: '1rem'
  }
};

export default Cart;
