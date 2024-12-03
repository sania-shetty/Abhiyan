import React from "react";
import "../css/bootstrap.css";
import "../css/Rec_style.css"; 
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import CardList from "../components/CardList"

function Recommend(){
  return (
    <div className="hero_area">
      <Navbar />
      <Slider />
      <CardList />
    </div>
  );
};

export default Recommend;
