import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import ServiceSection from "../components/SeviceSection";
import Footer from "../components/Footer";
import "../css/style.css";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/font-awesome.min.css";

function Services() {
  return (
    <div className="App">
      <Navbar />
      <Slider />
      <ServiceSection />
      <Footer />
    </div>
  );
}

export default Services;
