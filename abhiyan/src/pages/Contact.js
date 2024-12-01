import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import "../css/style.css";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/font-awesome.min.css";

function Contact() {
  return (
    <div className="App">
      <Navbar />
      <Slider />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Contact;
