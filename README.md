# WOW Webshop (React + Node) — README-driven implementation

This repository is intentionally README-first: the entire working app must be generated from this specification by Claude Code (web).
Goal: a fast WOW demo that runs within 1–2 minutes after generation.

## 1) Product scope (minimum viable WOW)
Implement a tiny webshop with:
- Product list page
- Product detail page
- Cart (frontend local state)
- Checkout (backend mock endpoint)

No authentication, no admin UI, no payments.

## 2) Tech constraints (must)
### Frontend
- React + Vite
- Client-side routing (can be hash routing or a minimal router)
- The cart is stored only in frontend state (no DB, no backend cart)

### Backend
- Node.js + Express
- Exposes REST API under `/api/*`
- CORS enabled for local dev
- In-memory product catalog (hardcoded sample data for demo)

### Docker
- Docker Compose with exactly two services:
  1) `backend` (Express API)
  2) `frontend` (production build served by nginx or similar)
- In Docker mode:
  - Frontend must call backend via `/api` without CORS issues
  - Frontend container must proxy `/api` to backend container

## 3) Functional requirements

### 3.1 Product list
- Route: `/` (or `/products`)
- Displays all products with: image, name, price, and “Add to cart” button
- Clicking a product opens its detail page

### 3.2 Product detail
- Route: `/product/:id`
- Shows: image, name, price, description
- “Add to cart” button
- Link back to product list

### 3.3 Cart
- Route: `/cart`
- Shows items with:
  - name
  - unit price
  - quantity (editable)
  - remove button
- Shows total price
- Input for customer email (simple text input)
- “Checkout (mock)” button

### 3.4 Checkout (mock backend)
- Endpoint: `POST /api/checkout`
- Request body:
  - `customer.email` string
  - `items` array of `{ id, qty }`
- Response body:
  - `ok: true`
  - `orderId` (string, random)
  - `total` (number)
  - `currency` (e.g., "CZK")
  - `message` (human readable)
- On successful checkout:
  - Frontend shows confirmation (orderId + total)
  - Cart is cleared

### 3.5 Error handling (minimal but present)
- Product not found -> show friendly message
- Checkout with empty cart -> show friendly error message

## 4) Data model (in-memory demo data)
Hardcode 4 products in backend with fields:
- `id` (e.g., p1..p4)
- `name`
- `price` (number)
- `currency` ("CZK")
- `description`
- `image` (use any public placeholder image URLs)

Expose:
- `GET /api/products` -> list
- `GET /api/products/:id` -> detail
- `GET /health` -> `{ ok: true }`

## 5) Non-functional constraints
- Keep it minimal and fast to build.
- No database for this demo (in-memory only).
- Avoid heavy libraries.
- Use simple, clean UI (inline styles ok; no need for Tailwind).
- Must run on Windows + Docker Desktop.

## 6) Developer experience
After generation, the repo must support:

### Local dev (no Docker)
- One command to start both frontend and backend in dev mode
- Frontend dev server available on port 5173 (default Vite)
- Backend on port 3001 (or similar)
- Frontend dev must proxy `/api` to backend

### Docker demo
- One command: `docker compose up --build`
- Web UI exposed on port 8080
- Backend exposed on port 3001 (optional but ok)

## 7) Definition of Done (DoD)
- `docker compose up --build` starts and you can:
  - open product list
  - open product detail
  - add items to cart
  - edit quantity / remove items
  - checkout and receive orderId
- `npm install` + one dev command runs both services locally.

---

# Claude Code instructions (copy/paste into Claude)
Implement this repository from scratch based on README.
- Choose a clean folder structure.
- Generate all required files.
- Ensure both "Local dev" and "Docker demo" commands work.
- After generating, verify the endpoints and basic UI flows.
- Keep it minimal; do not add extra features beyond this spec.
- Prefer simple structure: /frontend and /backend,
  root docker-compose.yml, and a root script to run both.
