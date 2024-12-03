import React from "react";
import Navbar from "../components/Navbar";
import SliderIndex from "../components/SliderIndex";
import ServiceSection from "../components/SeviceSection";
import AboutSection from "../components/AboutSection";
import ClientSection from "../components/ClientSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import "../css/style.css";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/font-awesome.min.css";

function Home() {
  return (
    <div className="App">
      <Navbar />
      <SliderIndex />
      <ServiceSection />
      <AboutSection />
      <ClientSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Home;
