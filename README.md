# 🎧 Audiophile E-commerce Website

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

**A modern, full-stack e-commerce website for premium audio equipment**

[🚀 Live Demo](https://audiophile-nu-murex.vercel.app) • [📱 Frontend Code](https://github.com/MonarchRyuzaki/Audiophile/tree/master/client) • [⚡ Backend Code](https://github.com/MonarchRyuzaki/Audiophile/tree/master/server)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📱 Screenshots](#-screenshots)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Environment Setup](#️-environment-setup)
- [🏗️ Project Structure](#️-project-structure)
- [🔧 API Documentation](#-api-documentation)
- [💡 What I Learned](#-what-i-learned)
- [🎯 Challenges Faced](#-challenges-faced)
- [🔮 Future Improvements](#-future-improvements)
- [👤 Author](#-author)

## 🎯 Overview

This is a solution to the [Audiophile e-commerce website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/audiophile-ecommerce-website-C8cuSd_wx).

The Audiophile e-commerce website is a **full-stack, responsive web application** that delivers an exceptional user experience for browsing premium audio equipment, managing shopping carts, and completing secure purchases. Built with modern technologies, it showcases advanced features like user authentication, persistent cart storage, real-time notifications, and seamless payment integration.

### 🎯 Challenge Requirements

✅ **Responsive Design** - Optimal layout across all device sizes
✅ **Interactive Elements** - Hover states for all interactive components
✅ **Cart Management** - Add/remove products and edit quantities
✅ **Form Validation** - Comprehensive checkout form validation
✅ **Order Processing** - Complete checkout with order confirmation
✅ **Price Calculations** - Dynamic VAT (20%) and shipping ($50) calculations
✅ **Persistent Storage** - Cart data preserved across browser sessions

## ✨ Features

### 🛒 **E-commerce Functionality**

- 🎯 Browse premium audio products by category
- 🛍️ Add/remove items to/from cart with quantity controls
- 💰 Real-time price calculations (subtotal, VAT, shipping)
- 📦 Persistent cart storage tied to user accounts
- ✅ Order confirmation with detailed summary

### 🔐 **Authentication & Security**

- 🔒 Secure user authentication via Auth0
- 👤 User-specific cart and order management
- 🛡️ Role-based access control (RBAC)
- 🔄 Session persistence across browser refreshes

### 🎨 **User Experience**

- 📱 Mobile-first responsive design
- 🚀 Fast loading with optimized images
- 🔔 Real-time notifications for user actions
- ✨ Smooth animations and hover effects
- 🎭 Loading skeletons for better perceived performance

### 🧪 **Form Handling**

- ✅ Advanced form validation with Formik & Yup
- 💳 Payment method selection (Cash on Delivery)
- 📍 Shipping address validation
- ⚠️ Real-time error feedback

## 🛠️ Tech Stack

### **Frontend**

- ⚛️ **React 18** - Modern UI library with hooks
- 🔷 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🚀 **Vite** - Fast build tool and dev server
- 🛣️ **React Router DOM v6** - Client-side routing
- 📋 **Formik & Yup** - Form handling and validation
- 🔔 **React Toast** - User notifications

### **Backend**

- 🟢 **Node.js & Express.js** - Server-side runtime and framework
- 🍃 **MongoDB** - NoSQL database
- 🔐 **Auth0** - Authentication and authorization
- ✅ **Joi** - Server-side validation
- 🌐 **CORS** - Cross-origin resource sharing

### **DevOps & Deployment**

- ☁️ **Vercel** - Frontend deployment
- 🐙 **GitHub** - Version control
- 🔧 **ESLint & Prettier** - Code quality tools

## 📱 Screenshots

> **Note:** Add screenshots of your application here showcasing:
>
> - Homepage on desktop and mobile
> - Product detail pages
> - Shopping cart
> - Checkout process
> - Order confirmation

## 🚀 Quick Start

### Prerequisites

- 📦 Node.js (v16 or higher)
- 🍃 MongoDB database
- 🔐 Auth0 account

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MonarchRyuzaki/Audiophile.git
cd "Audiophile Website"
```

### 2️⃣ Install Dependencies

```bash
# Frontend dependencies
cd client
npm install

# Backend dependencies
cd ../server
npm install
```

### 3️⃣ Environment Configuration

Create `.env` files in both `client` and `server` directories:

**Frontend (.env)**

```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_CALLBACK_URL=http://localhost:5173/callback
VITE_AUTH0_AUDIENCE=your-auth0-audience
VITE_API_SERVER_URL=http://localhost:8080
VITE_RAZORPAY_KEY_ID=your-razorpay-key
```

**Backend (.env)**

```env
MONGODB_URL=your-mongodb-connection-string
AUTH0_DOMAIN=your-auth0-domain
AUTH0_AUDIENCE=your-auth0-audience
CLIENT_URL=http://localhost:5173
PORT=8080
RAZORPAY_KEY_ID=your-razropay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

### 4️⃣ Start Development Servers

```bash
# Start backend (from server directory)
npm start

# Start frontend (from client directory)
npm run dev
```

🎉 **Your application will be running at:**

- Frontend: http://localhost:5173
- Backend: http://localhost:8080

## ⚙️ Environment Setup

### 🔐 Auth0 Configuration

1. **Create Auth0 Application:**

   - Go to [Auth0 Dashboard](https://manage.auth0.com/)
   - Create a new Single Page Application
   - Configure allowed callback URLs, logout URLs, and web origins
2. **Required Settings:**

   ```
   Allowed Callback URLs: http://localhost:5173/callback
   Allowed Logout URLs: http://localhost:5173
   Allowed Web Origins: http://localhost:5173
   ```
3. **API Configuration:**

   - Create an API in Auth0
   - Set identifier as your AUTH0_AUDIENCE value

### 🍃 MongoDB Setup

1. **Local MongoDB:**

   ```bash
   # Install MongoDB locally or use MongoDB Atlas
   # Connection string format: mongodb://localhost:27017/audiophile
   ```
2. **MongoDB Atlas (Cloud):**

   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create cluster and get connection string
   - Whitelist your IP address

## 🏗️ Project Structure

```
📁 Audiophile Website/
├── 📁 client/                 # Frontend React application
│   ├── 📁 public/            # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/    # Reusable UI components
│   │   ├── 📁 Pages/         # Route components
│   │   ├── 📁 Layouts/       # Layout components
│   │   ├── 📁 store/         # Context API state management
│   │   ├── 📁 types/         # TypeScript type definitions
│   │   ├── 📁 Skeleton/      # Loading skeleton components
│   │   └── 📄 main.tsx       # Application entry point
│   ├── 📄 package.json
│   ├── 📄 vite.config.ts
│   └── 📄 tailwind.config.js
├── 📁 server/                 # Backend Express application
│   ├── 📁 controllers/       # Route handlers
│   ├── 📁 models/            # Database models
│   ├── 📁 routes/            # API routes
│   ├── 📁 utils/             # Utility functions
│   ├── 📄 index.js           # Server entry point
│   └── 📄 data.json          # Product data
└── 📄 README.md
```

## 🔧 API Documentation

### **Base URL:** `http://localhost:8080`

### 🛍️ Products Endpoints

```http
GET /products/:slug          # Get product by slug
GET /products/category/:category  # Get products by category
```

### 🛒 Cart Endpoints

```http
GET /cart                  # Get user's cart
POST /cart/add                 # Add item to cart
PUT /cart/update-item-quantity              # Update cart item
DELETE /cart               # Clear entire cart
```

### 📦 Orders Endpoints

```http
POST /orders/submit               # Checkout (COD)
```

### 💳 Payment Endpoints

```http
POST /api/payment/create-order # Create order
POST /api/payment/verify       # Verify payment 
```

## 💡 What I Learned

### 🔄 **Persistent Cart Storage**

Implemented a robust cart system where user cart data is stored in MongoDB and tied to authenticated users. This ensures cart persistence across browser sessions and devices, providing a seamless shopping experience.

### 🔐 **Advanced Authentication**

Integrated Auth0 for secure authentication with role-based access control. Users can securely log in, and their session data persists across application restarts, with automatic token refresh handling.

### 🔔 **Enhanced User Experience**

- **Real-time Feedback:** React Toast notifications provide instant feedback for user actions
- **Form Validation:** Comprehensive validation using Formik and Yup with custom error messages
- **Loading States:** Skeleton components improve perceived performance during data loading

### 🎨 **Modern Frontend Architecture**

- **TypeScript Integration:** Type-safe development with custom interfaces and types
- **Component Architecture:** Reusable, modular components with proper separation of concerns
- **State Management:** Context API for global state management without Redux complexity

## 🎯 Challenges Faced

### 1️⃣ **Backend-Frontend Synchronization**

**Challenge:** Ensuring cart data consistency between frontend state and backend database.
**Solution:** Implemented optimistic updates with fallback error handling and real-time synchronization.

### 2️⃣ **Auth0 Integration Complexity**

**Challenge:** Configuring Auth0 with proper RBAC and handling token refresh.
**Solution:** Created custom Auth0 provider wrapper with automatic token management and error boundaries.

### 3️⃣ **Production CORS Issues**

**Challenge:** Cross-origin request failures in production environment.
**Solution:** Properly configured CORS middleware with environment-specific origins and headers.

### 4️⃣ **React Router Production Deployment**

**Challenge:** 404 errors on direct route access in production.
**Solution:** Added `vercel.json` configuration to handle client-side routing properly.

### 5️⃣ **Performance Optimization**

**Challenge:** Slow initial load times and image loading.
**Solution:** Implemented lazy loading, image optimization, and skeleton loading states.

## 🔮 Future Improvements

### 🔍 **Enhanced Features**

- [ ] **Search & Filters** - Advanced product search with filtering options
- [ ] **Wishlist** - Save products for later purchase
- [ ] **Product Reviews** - User ratings and review system
- [ ] **Inventory Management** - Real-time stock tracking

### 🏗️ **Technical Enhancements**

- [ ] **Next.js Migration** - Server-side rendering for better SEO
- [ ] **Payment Integration** - Stripe/PayPal payment processing
- [ ] **Admin Dashboard** - Product and order management interface
- [ ] **PWA Features** - Offline support and push notifications

### 🧪 **Quality Assurance**

- [ ] **Testing Suite** - Unit and integration tests with Jest/React Testing Library
- [ ] **E2E Testing** - Cypress for end-to-end testing
- [ ] **Performance Monitoring** - Analytics and performance tracking
- [ ] **Error Logging** - Comprehensive error tracking with Sentry

### 📱 **Mobile Experience**

- [ ] **Mobile App** - React Native mobile application
- [ ] **Enhanced Mobile UX** - Touch gestures and mobile-specific interactions

## 👤 Author

<div align="center">

**Shivam Ganguly**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shivam-ganguly-357b90255/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MonarchRyuzaki)

*Full-Stack Developer passionate about creating exceptional web experiences*

</div>

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

*Built with ❤️ for the Frontend Mentor community*

</div>
