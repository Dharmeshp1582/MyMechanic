import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../assets/css/landingPage.css"
import "../../assets/landing/css/style.css";
import "../../assets/landing/css/responsive.css";
import about2image from "../../assets/landing/images/about-img2.png";
import sliderImage from "../../assets/landing/images/slider-img.png";
// import garagelogo from "../../assets/images/logo.webp"
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
// import "../../assets/landing/js/custom"

const LandingPage = () => {
  return (
    <div className="hero_area">
      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <Link className="navbar-brand" to="/">
              <span>
               MY mechanic
              </span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="s-1"> </span>
              <span className="s-2"> </span>
              <span className="s-3"> </span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
                <ul className="navbar-nav  ">
                  <li className="nav-item active">
                    <Link className="nav-link" to="">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/aboutus">
                      {" "}
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user/services">
                      {" "}
                      Services{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contactus">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="quote_btn-container " style={{ marginBottom: "7px" }}>
                <div className="btn-box">
                  <Link to="/login" className="btn-1">
                    Login
                  </Link>
                  <Link to="/signup" className="btn-2">
                    Signup
                  </Link>
                </div>
                <form className="form-inline">
                  <button
                    className="btn  my-2 my-sm-0 nav_search-btn"
                    type="submit"
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className=" slider_section ">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active carousel-item-left">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="detail_box">
                      <h1>MY MECHANIC</h1>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking
                      </p>
                      <div className="btn-box">
                        <a href="" className="btn-1">
                          Contact Us
                        </a>
                        <a href="" className="btn-2">
                          Get A Quote
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={sliderImage} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item carousel-item-next carousel-item-left">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="detail_box">
                      <h1>The best marketing</h1>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking
                      </p>
                      <div className="btn-box">
                        <a href="" className="btn-1">
                          Contact Us
                        </a>
                        <a href="" className="btn-2">
                          Get A Quote
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={sliderImage} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="detail_box">
                      <h1>The best marketing</h1>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking
                      </p>
                      <div className="btn-box">
                        <Link to="/contactus" className="btn-1">
                          Contact Us
                        </Link>
                        <Link to="" className="btn-2">
                          Get A Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={sliderImage} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel_btn-container">
            <Link
              className="carousel-control-prev"
              to="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="sr-only"></span>
            </Link>
            <Link
              className="carousel-control-next"
              to="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="sr-only"></span>
            </Link>
          </div>
        </div>
      </section>
      <section className="about_section ">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src={about2image} alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>About Us</h2>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                </p>
                <Link to="/aboutus">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about_section ">
        <div className="container">
          <div className="row">
            <div className="col-md-6">

              <div className="detail-box">
                <div className="heading_container">
                  <h2>Contact Us</h2>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                </p>
                <Link to="/contactus">Read More</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="img-box">
                <img src={about2image} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default LandingPage;