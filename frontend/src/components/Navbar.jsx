import React, { useState, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import CartSidebar from "./CartSidebar";

const OnlineOrdering = () => {
  const [navbarBg, setNavbarBg] = useState("transparent");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarBg(window.scrollY > 50 ? "#4E342E" : "transparent");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <>
    <style>{`
      @media (max-width: 991px) {
        .navbar {
          background-color: #4E342E !important;
          padding: 1rem;
        }
    
        .navbar-collapse {
          background-color: #4E342E;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }
    
        .order-btn {
          width: 100%;
          margin-bottom: 1rem;
        }
    
        .navbar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
    
        .navbar-nav .nav-link {
          text-align: center;
          color: white !important;
        }
    
        .navbar-toggler {
          border: none;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
    
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255,1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
          width: 1.8em;
          height: 1.8em;
        }
    
        .navbar .d-flex.align-items-center {
          flex-direction: column;
          align-items: stretch;
        }
    
        .mobile-toggle-cart {
          display: flex;
          align-items: center;
          margin-left: auto;
        }
      }
    `}</style>

      {/* Navigation Bar */}
      <nav
        className="navbar navbar-expand-lg fixed-top px-4"
        style={{
          backgroundColor: navbarBg,
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold fs-2" href="/">
            Kronenbrunnen
          </a>

          {/* Mobile: Toggle + Cart Icon */}
          <div className="d-lg-none mobile-toggle-cart">
            <button
              className="navbar-toggler navbar-dark text-white border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <FaShoppingBag
              className="text-white fs-4 ms-3"
              style={{ cursor: "pointer" }}
              onClick={() => setCartOpen((prev) => !prev)}
            />
          </div>


          {/* Navbar Links and Buttons */}
          <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
            {/* Nav Links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex gap-lg-3">
              <li className="nav-item">
                <a className="nav-link text-white" href="/menu">Menu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/order">Order Online</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#reservations">Reservations</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#contact">Contact</a>
              </li>
            </ul>

            {/* Order + Cart */}
            <div className="d-flex align-items-center mt-3 mt-lg-0">
              <a href="/order" className="btn order-btn me-3">
                Order Now
              </a>
              <FaShoppingBag
                className="text-white fs-4"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("Cart icon clicked");
                  setCartOpen((prev) => !prev);
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cart={cart}
        handleQuantityChange={handleQuantityChange}
        handleRemoveItem={handleRemoveItem}
      />
    </>
  );
};

export default OnlineOrdering;
