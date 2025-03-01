import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AuthPage from './pages/AuthPage'; 
import AdminOrdersPage from './pages/Orders';
import ShopPage from './pages/ShopPage';
import { jwtDecode } from "jwt-decode";
import CartPage from './pages/CartPage';
import AdminPage from './pages/Admin';
import ProductPage from './pages/products.jsx';
import InventoryPage from './pages/Inventory.jsx';
import DetailsPage from './pages/DetailsPage'; // Stripe payments are inside DetailsPage
import UsersPage from './pages/UsersPage.jsx';
import MenuPage from './pages/Menu.jsx';
import OnlineOrdering from './pages/OrderPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Load Stripe with your **public key**
const stripePromise = loadStripe("pk_test_51JlxjKIsIcjwovkaVR6ZmlU1la0EtSl3yONoKLyLOg5EN3uQAboOdkayMglCHtoGv8T7uqJo38Vwrz2WBwGxL3F3001vhfe8l5");

// PrivateRoute 
const PrivateRoute = ({ element, token }) => {
  return token ? element : <Navigate to="/" />;
};

// AdminRoute 
const AdminRoute = ({ element, token }) => {
  return token?.role === "ADMIN" ? element : <Navigate to="/" />;
};

const App = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Ensure token exists to avoid errors
  const token = localStorage.getItem("token");
  let decodedToken = null;
  try {
    if (token) {
      decodedToken = jwtDecode(token);
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  return (
    <Router>
      {/* ✅ Wrap your app in the Stripe `<Elements>` component */}
      <Elements stripe={stripePromise}>
        <Routes>
          {/* Protected Routes (Require Authentication) */}
          <Route path="/" element={<ShopPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/order" element={<OnlineOrdering />} />
          <Route path="/cart" element={<PrivateRoute element={<CartPage />} token={decodedToken} />} />

          {/* ✅ Stripe Checkout is inside DetailsPage */}
          <Route path="/details" element={<DetailsPage tokenData={decodedToken} />} />

          {/* Admin Routes (Require Admin Role) */}
          <Route path="/admin" element={<AdminRoute element={<AdminPage />} token={decodedToken} />} />
          <Route path="/admin-orders" element={<AdminRoute element={<AdminOrdersPage />} token={decodedToken} />} />
          <Route path="/admin-products" element={<AdminRoute element={<ProductPage />} token={decodedToken} />} />
          <Route path="/admin-inventory" element={<AdminRoute element={<InventoryPage />} token={decodedToken} />} />
          <Route path="/admin-users" element={<AdminRoute element={<UsersPage />} token={decodedToken} />} />

          {/* 404 Page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Elements>
    </Router>
  );
};

export default App;
