import React from "react";
import "../css/responsive.css";
import "../css/Rec_style.css"; 
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import CardList from "../components/CardList"
import { useEffect } from "react";
import { useState } from "react";

function Recommend({userData}){
  const [apiData,setApidata]=useState([]);
  useEffect(()=>{
    fetch("https://jwie2c4inb.execute-api.ap-south-1.amazonaws.com/dev2/getSchemes",{
      "method":"POST",
      "headers":{
        "Content-Type":"application/json"
      },
      "body":JSON.stringify({
        id:1,
        state:userData.details["state"],
        describe:userData.details["beneficiaries"]
      })
    }).then(response=>{
      if(response) return response.json()
        else console.log("error response from api"); 
    }).then(data=>{
      if(data) setApidata(data);
        //console.log(apiData);
        //console.log(data);
        //console.log(apiData)
    }).catch(err=>{
      console.log(err);
    })
  },[apiData])
  return (
    <div className="hero_area">
      {/* <h1>{userData.email}</h1> */}
      <Navbar />
      <Slider />
      <br/>
      <CardList schemes={apiData}/>
    </div>
  );
};

export default Recommend;
