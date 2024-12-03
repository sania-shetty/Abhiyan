import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import "../css/style.css";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/font-awesome.min.css";

function About() {
  return (
    <div className="App">
      <Navbar />
      <Slider />
      <AboutSection />
      <Footer />
    </div>
  );
}

export default About;
