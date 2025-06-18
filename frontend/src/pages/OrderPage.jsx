import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import Navbar from "../components/Navbar";
import { FaCheckCircle, FaShoppingCart } from "react-icons/fa";

let orderingImage = require("../Home.jpg");

const OnlineOrdering = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});

  // Wochentag bestimmen (0 = Sonntag, 1 = Montag, ..., 6 = Samstag)
  const today = new Date().getDay();

  useEffect(() => {
    fetch("https://kronenbrunnen.de/api/products-data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Daten");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (product.unitPrices) {
      const selectedSize = selectedSizes[product.productId];
      if (!selectedSize) {
        alert("Bitte eine Größe auswählen!");
        return;
      }
      const price = product.unitPrices[selectedSize];

      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (item) => item.productId === product.productId && item.selectedSize === selectedSize
        );

        if (existingItem) {
          return prevCart.map((item) =>
            item.productId === product.productId && item.selectedSize === selectedSize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1, selectedSize, price }];
        }
      });
    } else {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.productId === product.productId);
        if (existingItem) {
          return prevCart.map((item) =>
            item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1, price: product.unitPrice }];
        }
      });
    }
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prevSizes) => ({ ...prevSizes, [productId]: size }));
  };

  const getProductsByCategory = (category) =>
    products.filter((product) => product.category === category);

  // Dynamische Kategorie-Reihenfolge (Angebote zuerst, wenn gültig)
  const categories = [
    ...(today === 3 ? ["Angebote Schnitzel"] : []),   // Mittwoch
    ...(today === 4 ? ["Angebote Pizza"] : []),       // Donnerstag
    "Vorspeisen",
    "Salate",
    "Pizza",
    "Pasta",
    "Burger",
    "Desserts",
    "Fisch",
    "Schnitzel",
    "Steaks",
  ];

  return (
    <>
      <Navbar />
      <div className="position-relative" style={{ height: "50vh", overflow: "hidden" }}>
        <img src={orderingImage} alt="Ordering" className="img-fluid w-100" style={{ objectFit: "cover", height: "100%" }} />
      </div>

      <section className="container text-start py-5">
        <h1 className="fw-bold" style={{ fontSize: "6rem", color: "#4E342E" }}>ONLINE ORDERING</h1>
        <p className="fs-5 text-dark">Bestelle jetzt online! Wähle aus unserer Speisekarte deine Lieblingsgerichte.</p>

        <div className="d-flex align-items-center mb-4">
          <span className="badge bg-light text-dark px-4 py-3">
            <FaCheckCircle className="me-2 text-success" /> Bestellungen möglich
          </span>
        </div>
      </section>

      {loading ? (
        <div className="text-center my-5">
          <p className="text-muted">Lade Speisekarte...</p>
        </div>
      ) : error ? (
        <div className="text-center my-5">
          <p className="text-danger">Fehler: {error}</p>
        </div>
      ) : (
        <section className="container text-start py-5">
          <h1 className="fw-bold mt-5" style={{ fontSize: "5rem", color: "#4E342E" }}>Speisekarte</h1>

          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category);
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category} className="mb-5">
                <h3 className="mt-4 text-uppercase fw-bold">{category}</h3>
                <div className="row mt-3">
                  {categoryProducts.map((product) => (
                    <div className="col-md-4 mb-4" key={product.productId}>
                      <div className="p-3 border rounded-3 shadow-sm">
                        <h5 className="fw-bold text-dark">{product.name}</h5>
                        {product.description && <p className="text-muted">{product.description}</p>}
                        <div className="d-flex flex-column">
                          {product.unitPrices ? (
                            <>
                              <select
                                className="form-select mb-2"
                                onChange={(e) => handleSizeChange(product.productId, e.target.value)}
                              >
                                <option value="">Größe wählen</option>
                                {Object.entries(product.unitPrices).map(([size, price]) => (
                                  <option key={size} value={size}>
                                    {size}: €{price.toFixed(2)}
                                  </option>
                                ))}
                              </select>
                              <button className="btn btn-outline-success" onClick={() => addToCart(product)}>
                                <FaShoppingCart className="me-2" /> In den Warenkorb
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="fs-5 fw-bold text-dark">€{product.unitPrice.toFixed(2)}</span>
                              <button className="btn btn-outline-success mt-2" onClick={() => addToCart(product)}>
                                <FaShoppingCart className="me-2" /> In den Warenkorb
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};

export default OnlineOrdering;
