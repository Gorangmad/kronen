import React from "react";
import "../index.css"

const Footer = () => {
  return (
    <footer className="container-fluid footer text-white py-5" style={{ backgroundColor: "#4E342E" }}>
      <div className="row text-center">
        <div className="col-12">
          <h1 className="fw-bold" id="footer-text" style={{ fontSize: "4rem", color: "#f8d7da" }}>KRONNENBRUNNEN</h1>
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
          <p><a href="/Datenschutzerklaerung">Datenschutzerklaerung</a> &bull; <a href="/AGB">AGB</a> &bull; <a href="/Impressum">Impressum</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
