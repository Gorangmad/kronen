import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const minimumOrderByDistrict = {
  "Somborn": 20,
  "Neuses": 25,
  "Altenmittlau": 25,
  "Gondsroth": 25,
  "Bernbach": 25,
  "Horbach": 30,
  "Niedermittlau": 30,
  "Neuenhaßlau": 30,
  "Rodenbach": 30,
  "Linsengericht": 40,
  "Geiselbach": 40,
  "Gelnhausen": 40,
  "Alzenau Michelbach": 40,
};

const deliveryCostByDistrict = {
  "Somborn": 2,
  "Neuses": 2.5,
  "Altenmittlau": 2.5,
  "Gondsroth": 2.5,
  "Bernbach": 2.5,
  "Horbach": 3,
  "Niedermittlau": 3,
  "Neuenhaßlau": 3,
  "Rodenbach": 3,
  "Linsengericht": 4,
  "Geiselbach": 4,
  "Gelnhausen": 4,
  "Alzenau Michelbach": 4,
};

const absoluteMinimum = 15;
const standardDeliveryCost = 6.99;

const getDistrictFromAddress = async (address, postcode) => {
  const query = encodeURIComponent(`${address}, ${postcode}, Deutschland`);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "DeinShop/1.0" },
    });

    const data = await response.json();
    if (data.length > 0) {
      const addressDetails = data[0].address;
      return (
        addressDetails.suburb ||
        addressDetails.village ||
        addressDetails.town ||
        addressDetails.city_district ||
        addressDetails.city ||
        ""
      );
    } else {
      return "";
    }
  } catch (error) {
    console.error("Fehler bei der Stadtteil-Erkennung:", error);
    return "";
  }
};

const calculateDeliveryCost = (district, subtotal) => {
  const minOrder = minimumOrderByDistrict[district] || absoluteMinimum;
  const customDeliveryCost = deliveryCostByDistrict[district] ?? standardDeliveryCost;

  if (subtotal < absoluteMinimum) return standardDeliveryCost;
  if (subtotal < minOrder) return customDeliveryCost;
  return 0;
};

const isDeliverableDistrict = (district) => {
  return Object.keys(minimumOrderByDistrict).includes(district);
};

const SummaryPage = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({});
  const [cart, setCart] = useState([]);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkoutFormData") || "{}");
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    setFormData(data);
    setCart(savedCart);

    const subtotalCalculated = savedCart.reduce((sum, item) => {
      const itemPrice = item.price || item.unitPrice || 0;
      return sum + itemPrice * (item.quantity || 1);
    }, 0);

    const fetchDistrictAndCalculate = async () => {
      const district = await getDistrictFromAddress(data.address, data.postcode);
      data.district = district;
      setFormData((prev) => ({ ...prev, district }));

      const delivery = calculateDeliveryCost(district, subtotalCalculated);
      setDeliveryCost(delivery);
      setSubtotal(subtotalCalculated);
      setTotalAmount(subtotalCalculated + delivery);
    };

    fetchDistrictAndCalculate();
  }, []);

  if (formData.district && !isDeliverableDistrict(formData.district)) {
    return (
      <div className="container mt-4">
        <h2>Bestellübersicht</h2>
        <p className="text-danger mt-3">
          Wir liefern aktuell leider nicht in dieses Gebiet ({formData.district}).<br />
          Bitte kontaktieren Sie uns telefonisch für weitere Informationen.
        </p>
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!stripe || !elements) {
      setError("Stripe is not loaded.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card Element not found.");
      setLoading(false);
      return;
    }

    try {
      const { paymentMethod, error: paymentError } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: formData.name || "Unknown",
          email: formData.email || "",
          phone: formData.phoneNumber || "",
          address: {
            line1: formData.address || "Unknown",
            postal_code: formData.postcode || "",
          },
        },
      });

      if (paymentError) {
        setError(paymentError.message);
        setLoading(false);
        return;
      }

      const response = await fetch("https://walrus-app-kygqi.ondigitalocean.app/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation {
              createPayment(
                amount: ${totalAmount}, 
                currency: "eur", 
                paymentMethod: STRIPE, 
                paymentMethodId: "${paymentMethod.id}"
              ) {
                id
                status
                clientSecret
              }
            }
          `,
        }),
      });

      const jsonResponse = await response.json();
      const clientSecret = jsonResponse?.data?.createPayment?.clientSecret;

      if (!clientSecret) {
        setError("Client secret not received.");
        setLoading(false);
        return;
      }

      setSuccess("Zahlung erfolgreich!");
      await placeOrder();
    } catch (err) {
      setError("Fehler bei der Zahlung. Bitte versuche es erneut.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    try {
      const products = cart.map((item) => ({
        productId: String(item.productId),
        quantity: item.quantity,
        name: item.name,
        unitPrice: item.unitPrice || item.price,
      }));

      const orderResponse = await fetch("https://walrus-app-kygqi.ondigitalocean.app/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation CreateOrder($input: OrderInput!) {
              createOrder(input: $input) {
                id
                customerUsername
              }
            }
          `,
          variables: {
            input: {
              customerUsername: formData.name,
              email: formData.email,
              address: formData.address,
              phoneNumber: formData.phoneNumber,
              notes: formData.notes,
              deliveryCost,
              products,
              paymentMethod: paymentMethod.toUpperCase()
            },
          },
        }),
      });

      const result = await orderResponse.json();

      if (!result?.data?.createOrder) {
        throw new Error(result.errors?.[0]?.message || "Fehler bei der Bestellung.");
      }

      setSuccess("Bestellung erfolgreich abgeschlossen!");
      localStorage.removeItem("cart");

      setTimeout(() => {
        window.location.href = "/success";
      }, 2000);
    } catch (err) {
      setError("Fehler bei der Bestellung.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Bestellübersicht</h2>

      <div className="mb-3">
        <h5>Kundendaten</h5>
        <p>{formData.name}</p>
        <p>{formData.address}, {formData.postcode}</p>
        <p>{formData.email}</p>
        {formData.district && <p><strong>Ortsteil:</strong> {formData.district}</p>}
      </div>

      <div className="mb-3">
        <h5>Produkte</h5>
        {cart.map(item => (
          <div key={item.productId}>
            {item.name} × {item.quantity} – €{(item.unitPrice || item.price).toFixed(2)}
          </div>
        ))}
      </div>

      <div className="mb-3">
        <p>Zwischensumme: €{subtotal.toFixed(2)}</p>
        <p>Lieferkosten: €{deliveryCost.toFixed(2)}</p>
        <h4>Gesamtbetrag: €{totalAmount.toFixed(2)}</h4>
      </div>

      <div className="mb-3">
        <button className={`btn ${paymentMethod === "cash" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setPaymentMethod("cash")}>Barzahlung</button>
        <button className={`btn ms-2 ${paymentMethod === "card" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setPaymentMethod("card")}>Kartenzahlung</button>
      </div>

      {paymentMethod === "card" && (
        <>
          <div className="card p-3 border rounded mt-3">
            <CardElement className="form-control" />
          </div>
          <div className="position-relative mt-3">
            <button
              onClick={handlePayment}
              disabled={loading}
              className="btn btn-brown w-100"
            >
              {loading ? "Zahlung läuft..." : `Jetzt €${totalAmount.toFixed(2)} bezahlen`}
            </button>
            {loading && (
              <div className="loading-overlay d-flex justify-content-center align-items-center">
                <div className="spinner-border text-light" role="status"></div>
              </div>
            )}
          </div>
        </>
      )}

      {paymentMethod === "cash" && (
        <div className="position-relative">
        <button
          className="btn btn-success w-100"
          onClick={placeOrder}
          disabled={loading}
        >
          Bestellung abschließen (Barzahlung)
        </button>
        {loading && (
          <div className="loading-overlay d-flex justify-content-center align-items-center">
            <div className="spinner-border text-light" role="status"></div>
          </div>
        )}
      </div>
      
      )}

      {error && <p className="text-danger mt-3">{error}</p>}
      {success && <p className="text-success mt-3">{success}</p>}
    </div>
  );
};

export default SummaryPage;
