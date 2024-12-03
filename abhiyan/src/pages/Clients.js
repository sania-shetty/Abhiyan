import React from "react";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import ClientSection from "./components/ClientSection";
import Footer from "./components/Footer";
import "../css/style.css";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/font-awesome.min.css";

function Clients() {
  return (
    <div className="App">
      <Navbar />
      <Slider />
      <ServiceSection />
      <AboutSection />
      <ClientSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Clients;
