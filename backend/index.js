const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory product catalog
const products = [
  {
    id: 'p1',
    name: 'Gaming Laptop',
    price: 25990,
    currency: 'CZK',
    description: 'High-performance gaming laptop with RTX graphics card and 16GB RAM. Perfect for gaming and creative work.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'
  },
  {
    id: 'p2',
    name: 'Mechanical Keyboard',
    price: 2490,
    currency: 'CZK',
    description: 'RGB mechanical keyboard with Cherry MX switches. Customize your typing experience with premium tactile feedback.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'
  },
  {
    id: 'p3',
    name: 'Wireless Mouse',
    price: 1290,
    currency: 'CZK',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life. Comfortable for all-day use.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
  },
  {
    id: 'p4',
    name: 'USB-C Hub',
    price: 890,
    currency: 'CZK',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Expand your laptop connectivity.',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400'
  }
];

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product by id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Checkout endpoint (mock)
app.post('/api/checkout', (req, res) => {
  const { customer, items } = req.body;

  // Validate request
  if (!customer || !customer.email) {
    return res.status(400).json({ error: 'Customer email is required' });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  // Calculate total
  let total = 0;
  items.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      total += product.price * item.qty;
    }
  });

  // Generate mock order ID
  const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  res.json({
    ok: true,
    orderId,
    total,
    currency: 'CZK',
    message: `Order ${orderId} confirmed for ${customer.email}. Total: ${total} CZK`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
