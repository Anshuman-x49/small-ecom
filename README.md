# Small Ecom 🛍️

A full-stack, modern e-commerce application built with **React 19**, **Vite**, **Express 5**, and **MongoDB**. Featuring a tactile claymorphic design system, role-based access control (Buyer & Seller), JWT authentication with automated token refresh, and cloud media management via ImageKit.

---

## 🌟 Key Features

### 🎨 Tactile Claymorphic UI
- **Custom Design System**: Inset shadows, soft volumetric pill badges, rounded cards, and smooth micro-interactions.
- **Responsive Layout**: Optimized navigation, mobile drawer friendly, and dynamic catalog grid.
- **Modern Typography & Icons**: Powered by Google Fonts (Montserrat & Poppins) and Lucide React icons.

### 🔐 Secure Authentication & RBAC
- **Dual-Token Architecture**: Short-lived in-memory Access Tokens + secure HttpOnly Refresh Tokens stored in cookies.
- **Silent Token Rotation**: Automatic token refresh handling via Axios interceptors with a non-blocking retry queue.
- **Role-Based Guards**: Protected routes for registered customers and dedicated Seller routes for dashboard access.

### 📦 Dynamic Product Catalog & Shopping Cart
- **Catalog Browsing**: Real-time category filtering (`Clothing`, `Footwear`, `Accessories`, `Electronics`), keyword search, and multi-field sorting (Price: Low/High, Newest Arrivals).
- **Product Detail**: Detailed multi-image preview, size selector (`XS` to `XXL`) with live stock indicators, and instant cart integration.
- **Persistent Cart State**: Redux Toolkit cart with automated price and quantity calculation.

### 💼 Seller Management Dashboard
- **Inventory Overview**: View and manage all seller-owned products in one centralized dashboard.
- **Product Modal**: Add and edit products with multi-size stock configuration (`size`, `stock`).
- **Media Upload**: Multi-image file upload (up to 5 images per product) processed by Multer and hosted via ImageKit CDN.

---

## 🛠️ Tech Stack

### Frontend (`client/`)
- **Core**: React 19, Vite 7
- **Routing**: React Router 7 (`createBrowserRouter`, `RouterProvider`)
- **State Management**: Redux Toolkit & React-Redux
- **Styling**: TailwindCSS v4, Custom Claymorphic CSS tokens
- **HTTP Client**: Axios with automatic 401 refresh queue interceptors
- **Icons**: Lucide React
- **Forms**: React Hook Form

### Backend (`server/`)
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 5
- **Database**: MongoDB via Mongoose 9 ODM
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cookie-parser`
- **Validation**: `express-validator`
- **File & Media Handling**: `multer` (memory storage) + ImageKit Node SDK (`@imagekit/nodejs`)

---

## 📁 Project Structure

```text
small-ecom/
├── client/                     # Frontend Application
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── app/                # Root store, routes, and main layouts
│   │   │   ├── layouts/        # MainLayout (with Navbar) & AuthLayout
│   │   │   ├── routes/         # AppRoutes, ProtectedRoute, SellerRoute
│   │   │   └── store/          # Redux configureStore
│   │   ├── components/         # Reusable UI components (ClayButton, ClayCard, ClayInput)
│   │   ├── config/             # Axios instance & token interceptors
│   │   ├── features/
│   │   │   ├── auth/           # Login, Register, authSlice, authThunks
│   │   │   ├── cart/           # CartPage, cartSlice, useCart
│   │   │   ├── home/           # Global Navbar
│   │   │   └── products/       # Catalog, ProductCard, Detail, Seller Dashboard
│   │   ├── index.css           # Claymorphism styles & Tailwind imports
│   │   └── main.jsx            # Application entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend REST API
│   ├── src/
│   │   ├── app/                # Express app setup and middleware
│   │   ├── config/             # Database connection & env config
│   │   ├── controllers/        # Auth & Product controllers
│   │   ├── middlewares/        # Authentication & Role authorization
│   │   ├── models/             # Mongoose schemas (User, Product)
│   │   ├── routes/             # Express API routes
│   │   ├── services/           # ImageKit storage service
│   │   ├── utils/              # Token generation & password utilities
│   │   ├── validators/         # Request validation rules
│   │   └── server.js           # Server entry point & listener
│   ├── package.json
│   └── .env                    # Environment secrets (DO NOT COMMIT)
└── README.md
```

---

## ⚙️ Prerequisites & Environment Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: A running local instance or MongoDB Atlas connection string
- **ImageKit Account**: Free account for storing product images ([imagekit.io](https://imagekit.io))

---

### Environment Variables

#### 1. Backend (`server/.env`)
Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=3000

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/small-ecom?retryWrites=true&w=majority

# JWT Secrets (Use strong random strings)
ACCESS_TOKEN_SECRET=your_jwt_access_secret_key_here
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret_key_here

# ImageKit Media Storage
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key_here
```

#### 2. Frontend (`client/.env`) *(Optional in local development)*
Create a `.env` file in the `client/` directory for production deployments:

```env
# Production backend base URL (In local dev, Vite automatically proxies /api to http://localhost:3000)
VITE_API_URL=http://localhost:3000/api
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/Anshuman-x49/small-ecom.git
cd small-ecom
```

### 2. Setup & Run the Backend
```bash
cd server
npm install
npm run dev
```
> The server will start on `http://localhost:3000` and automatically connect to MongoDB.

### 3. Setup & Run the Frontend
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
> The client will be available at `http://localhost:5173`.

---

## 📡 API Reference

### Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user with `name`, `email`, `password`, and optional `role` (`user` \| `seller`) |
| `POST` | `/api/auth/login` | Public | Login with email & password. Sets HttpOnly cookie and returns access token |
| `POST` | `/api/auth/refresh` | Public | Rotates and returns a fresh access token using the refresh cookie |
| `GET` | `/api/auth/me` | Protected | Returns the authenticated user's profile |
| `POST` | `/api/auth/logout` | Protected | Clears the refresh token cookie and database hash |

### Product Endpoints (`/api/product`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/product` | Public | Fetch all products |
| `GET` | `/api/product/:id` | Public | Fetch single product by ID |
| `POST` | `/api/product` | Seller Only | Create new product with multipart images (max 5) |
| `PUT` | `/api/product/:id` | Seller Only | Update an existing product |
| `DELETE`| `/api/product/:id` | Seller Only | Delete product by ID |