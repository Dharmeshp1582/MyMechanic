import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaChevronDown
} from "react-icons/fa";
import { Link } from "react-router-dom";
import sliderImage from "../../assets/landing/images/slider-img.png";
import "../../assets/css/contactus.css";
// import MapComponent from './MapComponent';
// import { Footer } from "./Footer";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after submission (in a real app, you might do this after successful API response)
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitted(false);
    }, 5000);
  };

  const faqs = [
    {
      question: "Do I need an appointment?",
      answer:
        "While we accept walk-ins, we recommend scheduling an appointment for prompt service."
    },
    {
      question: "How long does a typical service take?",
      answer:
        "Oil changes take 30-60 minutes, while complex repairs may take longer."
    },
    {
      question: "Do you offer warranties?",
      answer:
        "Yes, we provide a 12-month/12,000-mile warranty on most services."
    },
    {
      question: "Do you provide loaner vehicles?",
      answer:
        "We offer a courtesy shuttle within 5 miles. Loaner vehicles require advance notice."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="hero_area">
      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <Link className="navbar-brand" to="/">
              <span className="bg-orange-400">My Mechanic</span>
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
                  <li className="nav-item ">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item ">
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
                  <li className="nav-item active">
                    <Link className="nav-link" to="#contactLink">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className="quote_btn-container "
                style={{ marginBottom: "7px" }}
              >
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
                      <h1>Contact Us</h1>
                      <p>
                        Get in touch with us for expert automotive services,
                        reliable repairs, and exceptional customer support at
                        E-Garage!
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
                        <Link to="" className="btn-1">
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

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-description">
            Have questions or need assistance? We're here to help. Reach out to
            us using any of the methods below.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="contact-form">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              {isSubmitted ? (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg
                    className="success-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="success-heading">
                    Message Sent Successfully!
                  </h3>
                  <p className="success-text">
                    Thank you for contacting us. We'll get back to you as soon
                    as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="success-button"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div>
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="contact-info-card-container">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

              <div className="contact-info-card">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div className="contact-text">
                  <h3>Phone</h3>
                  <p>Main: (555) 123-4567</p>
                  <p>Service: (555) 123-4568</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-text">
                  <h3>Email</h3>
                  <p>info@egarage.com</p>
                  <p>service@egarage.com</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-text">
                  <h3>Location</h3>
                  <p>123 Garage Street</p>
                  <p>Auto City, AC 12345</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">
                  <FaClock />
                </div>
                <div className="contact-text">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              {/* Emergency Service */}
              <div className="emergency-box">
                <h3>Emergency Service</h3>
                <p>
                  Need emergency assistance with your vehicle? Call our 24/7
                  emergency line:
                </p>
                <div className="emergency-number">(555) 999-8888</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container-1">
          <div className="map-text-center">
            <h2>Find Us</h2>
            <p>
              We're conveniently located in the heart of Auto City. Stop by for
              a visit!
            </p>
          </div>

          {/* <div className="map-container-2">
            <MapComponent />
          </div> */}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2 className="faq-heading">Frequently Asked Questions</h2>
          <p className="faq-description">
            Find answers to common questions about our services and policies.
          </p>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <FaChevronDown
                    className={`icon ${openIndex === index ? "rotate" : ""}`}
                  />
                </button>
                <p
                  className={`faq-answer ${openIndex === index ? "show" : ""}`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <Footer></Footer> */}
    </div>
  );
};
