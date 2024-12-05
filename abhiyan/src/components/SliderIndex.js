import React from "react";
import "../css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function SliderIndex() {
  return (
    <section className="slider_section">
      <div id="customCarousel1" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row">
                <div className="col-md-10 mx-auto">
                  <div className="detail-box">
                    <h1><b>ABHIYAN</b></h1>
                    <div className="btn-box">
                      <a href="../pages/Registration.js" className="btn1">SignIn</a>
                      <a href="../pages/Registration.js" className="btn2">LogIn</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Add other carousel items here */}
        </div>
        <ol className="carousel-indicators">
          <li data-target="#customCarousel1" data-slide-to="0" className="active"></li>
          <li data-target="#customCarousel1" data-slide-to="1"></li>
          <li data-target="#customCarousel1" data-slide-to="2"></li>
        </ol>
      </div>
    </section>
  );
}

export default SliderIndex;
