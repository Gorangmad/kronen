import React from "react";

const Footer = () => {
  return (
    <footer className="container-fluid text-white py-5" style={{ backgroundColor: "#4E342E" }}>
      <div className="row text-center">
        <div className="col-12">
          <h1 className="fw-bold" style={{ fontSize: "4rem", color: "#f8d7da" }}>KRONNENBRUNNEN</h1>
          <p className="fst-italic" style={{ fontSize: "1.5rem" }}>Bar &bull; Restaurant &bull; Pizzeria</p>
        </div>
      </div>
      <div className="row text-center mt-4">
        <div className="col-md-4">
          <p>MENU</p>
          <p>ORDER ONLINE</p>
          <p>RESERVATIONS</p>
          <p>ABOUT</p>
          <p>CONTACT</p>
        </div>
        <div className="col-md-4">
          <p className="fw-bold">Öffnungszeiten</p>
          <p>Montag bis Samstag: 16:00-22:00</p>
          <p>Sonntag und Feiertage: 12:00-22:00</p>
          <p>Dienstag Ruhetag</p>
        </div>
        <div className="col-md-4">
          <p className="fw-bold">Wo sie uns finden?</p>
          <p>Josefstraße 18, 63579 Freigericht</p>
          <p>060559337531</p>
          <p>info@KRONNENBRUNNEN.com</p>
        </div>
      </div>
      <div className="row text-center mt-4">
        <div className="col-12">
          <p>Terms & Conditions &bull; Refund Policy &bull; Privacy Policy &bull; Accessibility Statement</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
