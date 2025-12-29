import React, { useState, useEffect } from 'react';

function ProductList({ addToCart, navigate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={styles.message}>Loading products...</div>;
  if (error) return <div style={styles.message}>Error: {error}</div>;

  return (
    <div>
      <h2>Products</h2>
      <div style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.image}
              onClick={() => navigate(`#/product/${product.id}`)}
            />
            <h3
              style={styles.productName}
              onClick={() => navigate(`#/product/${product.id}`)}
            >
              {product.name}
            </h3>
            <p style={styles.price}>{product.price} {product.currency}</p>
            <button
              style={styles.button}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  productName: {
    margin: '1rem 0 0.5rem 0',
    fontSize: '1.2rem',
    cursor: 'pointer'
  },
  price: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: '0.5rem 0'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '0.5rem'
  },
  message: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem'
  }
};

export default ProductList;
