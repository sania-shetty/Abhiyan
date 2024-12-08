import React from "react";
import "../css/responsive.css";
import "../css/Rec_style.css"; 
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import CardList from "../components/CardList";

function Recommend(){
  return (
    <div className="hero_area">
      <Navbar />
      <Slider />
      <br/>
      <CardList />
    </div>
  );
};

export default Recommend;
