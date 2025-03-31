// import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/landingPage.css"
import "../../assets/landing/css/style.css";
import "../../assets/landing/css/responsive.css";
import about2image from "../../assets/landing/images/about-img2.png";
import sliderImage from "../../assets/landing/images/slider-img.png";
import { Link } from "react-router-dom";
// import "../../assets/landing/js/custom"

const LandingPage = () => {
  return (
    <div className="hero_area">
      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <a className="navbar-brand" href="index.html">
              <span>
               My Mechanic
              </span>
            </a>
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
              <a className="nav-link" href="index.html">
                Home 
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="about.html">
                {" "}
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="service.html">
                {" "}
                Services{" "}
              </a>
            </li> 
                  {/* <li className="nav-item">
              <a className="nav-link" href="#contactLink">
                Contact Us
              </a>
            </li> */}
                </ul>
              </div>
              <div className="quote_btn-container ">
                <div className="btn-box">
                  <Link to="/login" className="btn-1 " >
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
                      <h2>MY-MECHANIC</h2>
                      <br/>
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
          </div>
          <div className="carousel_btn-container">
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="sr-only"></span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="sr-only"></span>
            </a>
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
                <a href="">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer section */}
      <footer className="bg-dark text-white py-4" >
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center d-flex">
            <div className="col-md-4">
              {/* <img
          loading="lazy"
          src={garagelogo}
          class="img-fluid mb-3" 
          alt="E-Garage"
          style={{maxWidth:50}}
        /> */}
              <Link to="" className="fw-bold text-white" style={{ fontSize: "1.5rem", textDecoration: "none" }}>My Mechanic</Link>
              <p>Ground Floor, Vertex Plaza,</p>
               <p style={{lineHeight:0.23}}> CG Highway, Navrangpura,</p>
                <p>Ahmedabad, Gujarat 380009</p>
              <div className="d-flex gap-3 mt-3">
                <a href="https://www.facebook.com/" target="_blank" className="text-white">
                  <i className="fab fa-facebook fa-lg"></i>
                </a>
                <a href="https://twitter.com/" target="_blank" className="text-white">
                  <i className="fab fa-twitter fa-lg"></i>
                </a>
                <a href="https://www.instagram.com/" target="_blank" className="text-white">
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
                <a href="https://api.whatsapp.com/" target="_blank" className="text-white">
                  <i className="fab fa-whatsapp fa-lg"></i>
                </a>
                <a href="https://www.youtube.com/" target="_blank" className="text-white">
                  <i className="fab fa-youtube fa-lg"></i>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <i className="fas fa-envelope me-2"></i> <strong>Email:</strong>
                <a href="mailto:info@gomechanic.in" className="text-white text-decoration-none">info@mymechanic.in</a>
              </div>
              <div className="mb-3">
                <i className="fas fa-phone me-2"></i> <strong>Phone Number:</strong>
                <a href="tel:8398970970" className="text-white text-decoration-none">9383736353</a>
              </div>
              <div className="mb-3">
                <i className="fas fa-calendar-alt me-2"></i> <strong>Working Days:</strong>
                <p className="d-inline">Monday - Friday</p>
              </div>
              <div>
                <i className="fas fa-clock me-2"></i> <strong>Working Hours:</strong>
                <p className="d-inline">9:00 AM - 10:00 PM (IST)</p>
              </div>
            </div>
            <div className="col-md-4 text-center d-flex flex-column align-items-center">
              <a href="https://play.google.com/store/apps/details?id=gomechanic.retail&hl=en_IN" target="_blank">
                <img loading="lazy" src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/FooterPage/playstore.png" className="img-fluid mb-2" alt="Google Play Store" style={{ width: 150 }} />
              </a>
              <a href="https://apps.apple.com/in/app/gomechanic-car-service/id1498891908" target="_blank">
                <img loading="lazy" src="https://gomechprod.blob.core.windows.net/websiteasset/New%20Website/components/FooterPage/appstore.png" className="img-fluid" alt="App Store" style={{ width: 150 }} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;