import React from "react";
import { Link } from "react-router-dom";
//  import "bootstrap/dist/css/bootstrap.min.css";
// import "../../assets/landing/css/landingPage.css"
import { Footer } from "../layouts/Footer";
import { SliderSection } from "../layouts/SliderSection";
import { motion } from 'framer-motion'
// import "../../assets/landing/css/style.css";
// import "../../assets/landing/css/responsive.css";
import aboutImage from "../../assets/images/garage.avif";
import contactImage from "../../assets/images/Contact_us_img_1.avif"
// import sliderImage from "../../assets/landing/images/slider-img.png";
// import garagelogo from "../../assets/images/logo.webp"
// // import "../../assets/landing/js/custom"

const LandingPage = () => {
  return (

    <div className="landing-container">

      <header className="header_section" style={{ backgroundColor: "rgb(18 23 105)",padding:"0" }}>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <Link className="navbar-brand" to="/">
              <span className="bg-orange-400">
                My Mechanic
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
                    <Link className="nav-link landing-head-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link landing-head-link" to="/about">
                      {" "}
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link landing-head-link" to="/services">
                      {" "}
                      Services{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link landing-head-link" to="/contactus">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="quote_btn-container " style={{ marginBottom: "7px" }}>
                <div className="">
                  <Link to="/login" className="btn-1 ">
                    Login
                  </Link>
                  <Link to="/signup" className="btn-2" style={{color:"black"}}>
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

      <SliderSection />

      <section className="landing-section_2">
        <div className="landing-container_2">
          <div className="landing-img-box_2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={aboutImage} alt="About Us" />
            </motion.div>
          </div>
          <div className="landing-text-box_2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >

            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
            </p>
            <Link to="/about">Read More</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="landing-section_2">
        <div className="landing-container_2">
          <div className="landing-text-box_2">
          <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
            <h2>Contact Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
            </p>
            <Link to="/contactus">Read More</Link>
          </motion.div>
          </div>
          <div className="landing-img-box_2">
          <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
            <img src={contactImage} alt="Contact Us" />
          </motion.div>
          </div>
        </div>
      </section>


      <Footer></Footer>

    </div>




    // <div className="hero_area">
    //   <header className="header_section">
    //     <div className="container-fluid">
    //       <nav className="navbar navbar-expand-lg custom_nav-container ">
    //         <Link className="navbar-brand" to="/">
    //           <span>
    //             E-Garage
    //           </span>
    //         </Link>
    //         <button
    //           className="navbar-toggler"
    //           type="button"
    //           data-toggle="collapse"
    //           data-target="#navbarSupportedContent"
    //           aria-controls="navbarSupportedContent"
    //           aria-expanded="false"
    //           aria-label="Toggle navigation"
    //         >
    //           <span className="s-1"> </span>
    //           <span className="s-2"> </span>
    //           <span className="s-3"> </span>
    //         </button>
    //         <div
    //           className="collapse navbar-collapse"
    //           id="navbarSupportedContent"
    //         >
    //           <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
    //             <ul className="navbar-nav  ">
    //               <li className="nav-item active">
    //                 <Link className="nav-link" to="">
    //                   Home
    //                 </Link>
    //               </li>
    //               <li className="nav-item">
    //                 <Link className="nav-link" to="/aboutus">
    //                   {" "}
    //                   About Us
    //                 </Link>
    //               </li>
    //               <li className="nav-item">
    //                 <Link className="nav-link" to="/user/services">
    //                   {" "}
    //                   Services{" "}
    //                 </Link>
    //               </li>
    //               <li className="nav-item">
    //                 <Link className="nav-link" to="/contactus">
    //                   Contact Us
    //                 </Link>
    //               </li>
    //             </ul>
    //           </div>
    //           <div className="quote_btn-container " style={{ marginBottom: "7px" }}>
    //             <div className="btn-box">
    //               <Link to="/login" className="btn-1">
    //                 Login
    //               </Link>
    //               <Link to="/signup" className="btn-2">
    //                 Signup
    //               </Link>
    //             </div>
    //             <form className="form-inline">
    //               <button
    //                 className="btn  my-2 my-sm-0 nav_search-btn"
    //                 type="submit"
    //               />
    //             </form>
    //           </div>
    //         </div>
    //       </nav>
    //     </div>
    //   </header>

    //   <section className=" slider_section ">
    //     <div
    //       id="carouselExampleIndicators"
    //       className="carousel slide"
    //       data-ride="carousel"
    //     >
    //       <div className="carousel-inner">
    //         <div className="carousel-item active carousel-item-left">
    //           <div className="container">
    //             <div className="row">
    //               <div className="col-md-6 ">
    //                 <div className="detail_box">
    //                   <h1>E-GARAGE</h1>
    //                   <p>
    //                     It is a long established fact that a reader will be
    //                     distracted by the readable content of a page when
    //                     looking
    //                   </p>
    //                   <div className="btn-box">
    //                     <Link to="/contactus" className="btn-1">
    //                       Contact Us
    //                     </Link>
    //                     <Link href="" className="btn-2">
    //                       Get A Quote
    //                     </Link>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="col-md-6">
    //                 <div className="img-box">
    //                   <img src={sliderImage} alt="" />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="carousel-item carousel-item-next carousel-item-left">
    //           <div className="container">
    //             <div className="row">
    //               <div className="col-md-6 ">
    //                 <div className="detail_box">
    //                   <h1>The best marketing</h1>
    //                   <p>
    //                     It is a long established fact that a reader will be
    //                     distracted by the readable content of a page when
    //                     looking
    //                   </p>
    //                   <div className="btn-box">
    //                     <a href="" className="btn-1">
    //                       Contact Us
    //                     </a>
    //                     <a href="" className="btn-2">
    //                       Get A Quote
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="col-md-6">
    //                 <div className="img-box">
    //                   <img src={sliderImage} alt="" />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="carousel-item">
    //           <div className="container">
    //             <div className="row">
    //               <div className="col-md-6 ">
    //                 <div className="detail_box">
    //                   <h1>The best marketing</h1>
    //                   <p>
    //                     It is a long established fact that a reader will be
    //                     distracted by the readable content of a page when
    //                     looking
    //                   </p>
    //                   <div className="btn-box">
    //                     <Link to="/contactus" className="btn-1">
    //                       Contact Us
    //                     </Link>
    //                     <Link to="" className="btn-2">
    //                       Get A Quote
    //                     </Link>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="col-md-6">
    //                 <div className="img-box">
    //                   <img src={sliderImage} alt="" />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="carousel_btn-container">
    //         <Link
    //           className="carousel-control-prev"
    //           to="#carouselExampleIndicators"
    //           role="button"
    //           data-slide="prev"
    //         >
    //           <span className="sr-only"></span>
    //         </Link>
    //         <Link
    //           className="carousel-control-next"
    //           to="#carouselExampleIndicators"
    //           role="button"
    //           data-slide="next"
    //         >
    //           <span className="sr-only"></span>
    //         </Link>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="about_section ">
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-md-6">
    //           <div className="img-box">
    //             <img src={about2image} alt="" />
    //           </div>
    //         </div>
    //         <div className="col-md-6">
    //           <div className="detail-box">
    //             <div className="heading_container">
    //               <h2>About Us</h2>
    //             </div>
    //             <p>
    //               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    //               do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //               Ut enim ad minim veniam, quis nostrud
    //             </p>
    //             <Link to="/aboutus">Read More</Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <section className="about_section ">
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-md-6">

    //           <div className="detail-box">
    //             <div className="heading_container">
    //               <h2>Contact Us</h2>
    //             </div>
    //             <p>
    //               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    //               do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //               Ut enim ad minim veniam, quis nostrud
    //             </p>
    //             <Link to="/contactus">Read More</Link>
    //           </div>
    //         </div>
    //         <div className="col-md-6">
    //           <div className="img-box">
    //             <img src={about2image} alt="" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   <Footer></Footer>
    // </div>
  );
};

export default LandingPage;