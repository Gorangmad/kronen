import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingBag } from "react-icons/fa";
import "../index.css";
import { useRef } from "react";
import { Carousel } from "react-bootstrap"; // Corrected import
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



import { motion, useScroll, useTransform } from "framer-motion";

let image1 = require("../dessert.jpg");
let image2 = require("../drinks.jpg");
let image3 = require("../Home.jpg");
let image4 = require("../pizza.jpg");
let image5 = require("../shrimps.jpg");
let image6 = require("../aperol.jpg");




const ParallaxImage = ({ src, speed, width, margin }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 1.5]);

  return <motion.img ref={ref} src={src} className="img-fluid" style={{ width: width, height: "auto", y, margin: margin }} />;
};

const HeroSection = () => {
  return (
    <>
      <div className="hero-container">

        <Navbar></Navbar>
        
        {/* Hero Content */}
        {/* Hero Content */}
<motion.div
  className="hero-content text-center d-flex flex-column justify-content-center align-items-center px-3"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <motion.h1
    className="text-white text-uppercase fw-bold hero-title"
    style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 1 }}
  >
    KRONENBRUNNEN
  </motion.h1>

  <motion.p
    className="text-white fs-5 fs-md-3 fst-italic"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 1 }}
  >
    Bar &bull; Restaurant &bull; Pizzeria
  </motion.p>

  <motion.div
    className="hero-buttons me-3"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7, duration: 1 }}
  >
    <a href="/order" className="btn order-btn me-3">Order Online</a>
    <a href="#contact" className="btn order-btn">Reservations</a>
  </motion.div>
</motion.div>
      </div>
      
      {/* Scrolling Bar (Outside Hero Container) */}
      <div className="container-fluid py-2" style={{ backgroundColor: "#4E342E" }}>
        <marquee className="text-white fw-bold">
          Exclusive Offers &nbsp; | &nbsp; Happy Hour Specials &nbsp; | &nbsp; Musik &nbsp; | &nbsp; Book Your Table Now | &nbsp; Holzofenpizza | &nbsp; Italienische Pasta | &nbsp; Hausgemachte Desserts | &nbsp; Frische Zutaten | &nbsp; Jetzt Tisch reservieren | &nbsp; Familienfreundlich | &nbsp; Lieferung & Abholung
        </marquee>
      </div>

      {/* About Section */}
      <section className="container py-5 mt-5" id="about">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="fw-bold text-dark mb-4"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", fontFamily: "Times New Roman, serif" }}>
                ÜBER UNS
              </h2>
              <p className="text-muted fs-6 fs-md-5 text-start">
                Willkommen bei Kronenbrunnen – Ihrer Adresse für traditionelle Küche mit moderner Note.
                Unsere Leidenschaft für Qualität und Gastfreundschaft spiegelt sich in jedem Gericht wider.
                Wir verbinden familiäre Atmosphäre mit kulinarischer Vielfalt: Pizza aus dem Holzofen, hausgemachte Desserts
                und italienische Klassiker erwarten Sie. Erleben Sie Genuss mit Herz.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="container-fluid d-flex align-items-center" style={{ backgroundColor: "#3E2723" }}>
        <div className="row w-200 align-items-center" style={{ minHeight: "740px" }}>
          
          {/* Left Image Section (kann mit Background oder Bild ergänzt werden) */}
          <div className="about-img col-12 col-lg-6" style={{ minHeight: "960px", minWidth: "520px" }}>
            {/* Optional: Background-Image hier einfügen */}
          </div>
      
          {/* Right Text Section */}
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-start px-4 px-md-5 py-5">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="fw-bold text-white mb-4"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", fontFamily: "Times New Roman, serif" }}>
                UNSERE KARTE
              </h2>
      
              <p className="text-white fs-6 fs-md-5 mb-4" style={{ maxWidth: "600px" }}>
                Entdecken Sie unsere Vielfalt: Von klassischen Pizzen aus dem Steinofen bis zu frischen Pasta-Gerichten
                und hausgemachten Desserts – hier ist für jeden Geschmack etwas dabei. Lassen Sie sich inspirieren.
              </p>
      
              <a href="#menu" className="btn btn-outline-light px-4 py-2 fw-bold">
                ZUR SPEISEKARTE
              </a>
            </motion.div>
          </div>
        </div>
      </section> 

{/* Quote Section with More Spacing */}
<section
  className="container py-7 text-center position-relative d-flex flex-column justify-content-center align-items-center"
  id="quote-section"
  style={{ minHeight: "1500px", position: "relative" }}
>
  <div className="parallax-wrapper d-flex justify-content-between align-items-center w-100" style={{ marginBottom: "200px" }}>
    <ParallaxImage src={image6} speed={150} width="180px" margin="0 20px" />
    <ParallaxImage src={image2} speed={90} width="240px" margin="0 130px" />
    <ParallaxImage src={image1} speed={150} width="210px" margin="0 120px" />
  </div>

  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    className="mt-5"
  >
    <h2
      className="fw-bold text-dark"
      style={{
        fontSize: "8rem",
        fontFamily: "Playfair Display, serif",
        fontStyle: "italic",
      }}
    >
      "The perfect place for any occasion"
    </h2>
  </motion.div>

  <div className="parallax-wrapper d-flex justify-content-between align-items-center w-100 mt-5" style={{ marginTop: "200px" }}>
    <ParallaxImage src={image4} speed={-30} width="220px" margin="0 80px" />
    <ParallaxImage src={image5} speed={-120} width="260px" margin="0 120px" />
    <ParallaxImage src={image3} speed={-200} width="300px" margin="0 80px" />
  </div>
</section>


      
        {/* Dining Options Section for Italian Restaurant with Fade-in Animation */}
        <section
          className="container-fluid d-flex align-items-center position-relative"
          style={{ backgroundColor: "#2D1B14", padding: "6rem 0" }}
        >
          <div
            className="row w-100 d-flex align-items-center position-relative"
            style={{ minHeight: "700px" }}
          >
            {/* Text Column */}
            <motion.div
              className="col-lg-6 text-white text-center d-flex flex-column justify-content-center align-items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2
                className="fw-bold text-white"
                style={{ fontSize: "6rem", fontFamily: "Times New Roman, serif" }}
              >
                DINING OPTIONS
              </h2>
              <p className="text-white fs-5 w-75">
                Experience the warmth of Italy in every bite. Whether you’re joining us
                for a cozy dinner or celebrating with family and friends, our traditional
                Italian dishes and rustic ambiance make every moment unforgettable.
              </p>
              <a href="#order" className="btn btn-outline-light px-4 py-2 mt-3">
                ORDER ONLINE
              </a>
            </motion.div>
        
            {/* Image Column */}
            <motion.div
              className="col-lg-6 position-relative d-flex justify-content-center align-items-center"
              style={{ height: "500px" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              viewport={{ once: true }}
            >
              <img
                src={image1}
                alt="Dining Video"
                className="img-fluid position-absolute dining-main"
              />
              <img
                src={image2}
                alt="Dining Table"
                className="img-fluid position-absolute dining-top-left"
              />
              <img
                src={image3}
                alt="Chef Cooking"
                className="img-fluid position-absolute dining-bottom-right"
              />
            </motion.div>
          </div>
        </section>

        {/* New Multi-Image Carousel Section */}
        <section className="container-fluid d-flex align-items-center position-relative" style={{ padding: "4rem 0" }}>
        <div className="row w-100 d-flex align-items-center justify-content-center">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <Carousel className="w-100" indicators={false} interval={3000} wrap={true}>
              <Carousel.Item>
                <div className="d-flex justify-content-center">
                  <img src={image1} alt="Slide 1" className="img-fluid-carousel" style={{ width: "20%", height: "400px", objectFit: "cover", margin: "0 10px" }} />
                  <img src={image2} alt="Slide 2" className="img-fluid-carousel" style={{ width: "20%", height: "400px", objectFit: "cover", margin: "0 10px" }} />
                  <img src={image3} alt="Slide 3" className="img-fluid-carousel" style={{ width: "20%", height: "400px", objectFit: "cover", margin: "0 10px" }} />
                  <img src={image3} alt="Slide 3" className="img-fluid-carousel" style={{ width: "20%", height: "400px", objectFit: "cover", margin: "0 10px" }} />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="d-flex justify-content-center">
                  <img src={image4} alt="Slide 4" className="img-fluid-carousel" style={{ width: "20%", height: "400px", objectFit: "cover", margin: "0 10px" }} />
                  <img src={image5} alt="Slide 5" className="img-fluid-carousel" style={{ width: "20%", height: "400px", objectFit: "cover", margin: "0 10px" }} />
                  <img src={image6} alt="Slide 6" className="img-fluid-carousel" style={{ width: "20%", height: "400px", objectFit: "cover", margin: "0 10px" }} />
                  <img src={image6} alt="Slide 6" className="img-fluid-carousel" style={{ width: "20%", height: "400px", objectFit: "cover", margin: "0 10px" }} />
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </section>

        {/* Reservation Section */}
        <section id="contact" className="container-fluid text-center py-5 mb-2 " style={{ backgroundColor: "#3E2723", color: "white" , borderRadius: "25px"}}>
        <h2 className="fw-bold" style={{ fontSize: "3rem" }}>Make a Reservation</h2>
        <p className="fs-5">Reserve a table in advance to enjoy a seamless dining experience.</p>
        {/* Google Maps Embed */}
        <div className="mt-5">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5113.980112072956!2d9.10959117718145!3d50.142617871535066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd3b5bc9fa32e1%3A0x4514f6d6d574684!2sRistaurante%20Kronenbrunnen!5e0!3m2!1sde!2sde!4v1740419759451!5m2!1sde!2sde" 
            width="100%" 
            height="450" 
            style={{ border: "0", borderRadius: "15px" }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <form className="row g-3 justify-content-center mt-2">
        <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Full Name" required style={{ padding: "12px", borderRadius: "10px", border: "none", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} />
          </div>
          <div className="col-md-3">
            <input type="email" className="form-control" placeholder="Email" required style={{ padding: "12px", borderRadius: "10px", border: "none", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Phone Number" required style={{ padding: "12px", borderRadius: "10px", border: "none", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} />
          </div>
          <div className="col-md-3">
            <input type="date" className="form-control" required style={{ padding: "12px", borderRadius: "10px", border: "none", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} />
          </div>
          <div className="col-md-3">
            <input type="time" className="form-control" required style={{ padding: "12px", borderRadius: "10px", border: "none", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} />
          </div>
          <div className="col-md-3">
            <input type="number" className="form-control" placeholder="Guests" min="1" required style={{ padding: "12px", borderRadius: "10px", border: "none", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} />
          </div>
          <div className="col-12 mt-3">
          <button type="submit" className="btn btn-light px-5 py-3 fw-bold" 
            style={{ 
                borderRadius: "50px", 
                backgroundColor: "#f8d7da", 
                border: "none", 
                fontSize: "1.2rem", 
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#e57373"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#f8d7da"}
            >
              Reserve Now
            </button>
            </div>
        </form>
      </section>

      <Footer></Footer>

    </>
  );
};

export default HeroSection;