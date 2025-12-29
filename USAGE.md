# WOW Webshop - Usage Guide

## Project Structure

```
claude-code-wow-webshop2/
├── backend/               # Express API server
│   ├── index.js          # Main server file with routes
│   ├── package.json      # Backend dependencies
│   └── Dockerfile        # Backend Docker configuration
├── frontend/             # React + Vite application
│   ├── src/
│   │   ├── App.jsx      # Main app component with routing
│   │   ├── main.jsx     # Entry point
│   │   └── pages/       # Page components
│   │       ├── ProductList.jsx
│   │       ├── ProductDetail.jsx
│   │       └── Cart.jsx
│   ├── index.html       # HTML template
│   ├── vite.config.js   # Vite configuration with API proxy
│   ├── nginx.conf       # Nginx configuration for production
│   └── Dockerfile       # Frontend Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── dev.sh              # Development script (Linux/Mac)
└── dev.bat             # Development script (Windows)
```

## Local Development

### Prerequisites
- Node.js 18+ installed
- npm installed

### Setup
1. Install dependencies for both backend and frontend:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Running Locally

**Option 1: Using dev scripts**
- On Linux/Mac: `./dev.sh`
- On Windows: `dev.bat`

**Option 2: Manual start**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed

### Running with Docker
```bash
docker compose up --build
```

### Access the Application
- Web UI: http://localhost:8080
- Backend API: http://localhost:3001 (optional)

### Stop Docker Containers
```bash
docker compose down
```

## API Endpoints

### Health Check
- `GET /health` - Returns `{"ok": true}`

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID

### Checkout
- `POST /api/checkout` - Process checkout (mock)
  - Request body:
    ```json
    {
      "customer": {"email": "user@example.com"},
      "items": [{"id": "p1", "qty": 2}]
    }
    ```
  - Response:
    ```json
    {
      "ok": true,
      "orderId": "ORD-ABC123",
      "total": 51980,
      "currency": "CZK",
      "message": "Order ORD-ABC123 confirmed..."
    }
    ```

## Features

### Product List Page (/)
- Displays all products with images, names, and prices
- Click product to view details
- Add to cart directly from list

### Product Detail Page (/product/:id)
- Shows product image, name, price, and description
- Add to cart button
- Back to products link

### Shopping Cart Page (/cart)
- View all items in cart
- Edit quantities
- Remove items
- Enter email for checkout
- Mock checkout with order confirmation
- Shows total price

### Checkout Flow
1. Add products to cart
2. Navigate to cart page
3. Review items and total
4. Enter email address
5. Click "Checkout (mock)"
6. Receive order confirmation with order ID

## Technologies Used

### Backend
- Node.js
- Express
- CORS middleware
- In-memory product storage

### Frontend
- React 18
- Vite
- Hash-based routing
- Client-side state management

### DevOps
- Docker & Docker Compose
- Nginx (production frontend server)
- Multi-stage Docker builds

## Notes
- Cart is stored in frontend state (not persisted)
- No authentication required
- No real payment processing
- Products are hardcoded in backend
- Checkout is a mock endpoint for demonstration
