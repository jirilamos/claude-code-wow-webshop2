import React, { useState, useEffect } from 'react';

function ProductDetail({ productId, addToCart, navigate }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to fetch product');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div style={styles.message}>Loading...</div>;
  if (error) return (
    <div style={styles.errorContainer}>
      <div style={styles.error}>{error}</div>
      <button style={styles.backButton} onClick={() => navigate('#/')}>
        Back to Products
      </button>
    </div>
  );

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate('#/')}>
        ← Back to Products
      </button>
      <div style={styles.detail}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.info}>
          <h2>{product.name}</h2>
          <p style={styles.price}>{product.price} {product.currency}</p>
          <p style={styles.description}>{product.description}</p>
          <button
            style={styles.addButton}
            onClick={() => {
              addToCart(product);
              alert('Added to cart!');
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '1rem',
    fontSize: '1rem'
  },
  detail: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem'
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  info: {
    display: 'flex',
    flexDirection: 'column'
  },
  price: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: '1rem 0'
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#555',
    flex: 1
  },
  addButton: {
    padding: '1rem',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '1rem'
  },
  message: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem'
  },
  errorContainer: {
    textAlign: 'center',
    padding: '2rem'
  },
  error: {
    color: '#e74c3c',
    fontSize: '1.2rem',
    marginBottom: '1rem'
  }
};

export default ProductDetail;
