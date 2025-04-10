import React from "react";
import { Link } from "react-router-dom";
import "../../assets/landing/css/comservices.css";
import { SliderSection } from "../layouts/SliderSection";
import { motion } from "framer-motion";
import {
  FaCar,
  FaCarBattery,
  FaCog,
  FaOilCan,
  FaTachometerAlt,
  FaTools,
  FaWrench
} from "react-icons/fa";
import { Footer } from "../layouts/Footer";

export const ComServices = () => {
  const services = [
    {
      id: "oil-change",
      icon: FaOilCan,
      title: "Oil Change",
      description:
        "Regular oil changes are essential for maintaining your engine's performance and longevity. Our oil change service includes:",
      features: [
        "Premium quality oil options",
        "Oil filter replacement",
        "Fluid level check and top-off",
        "Multi-point inspection",
        "Proper disposal of old oil"
      ],
      price: "From ₹299.00"
    },
    {
      id: "engine-repair",
      icon: FaCog,
      title: "Engine Repair",
      description:
        "Our certified mechanics can diagnose and repair any engine issue to keep your vehicle running smoothly. Our engine services include:",
      features: [
        "Complete engine diagnostics",
        "Check engine light diagnosis",
        "Engine performance tuning",
        "Timing belt replacement",
        "Engine rebuilds and replacements"
      ],
      price: "Price varies based on service"
    },
    {
      id: "brake-service",
      icon: FaTools,
      title: "Brake Service",
      description:
        "Your safety is our priority. Our comprehensive brake services ensure your vehicle stops when you need it to:",
      features: [
        "Brake pad/shoe replacement",
        "Rotor/drum resurfacing or replacement",
        "Brake fluid flush",
        "Caliper repair or replacement",
        "ABS system diagnosis and repair"
      ],
      price: "From ₹199.99"
    },
    {
      id: "suspension-steering",
      icon: FaWrench,
      title: "Suspension & Steering Repair",
      description:
        "Ensure a smooth and controlled ride with our suspension and steering services:",
      features: [
        "Shock and strut replacement",
        "Wheel alignment",
        "Power steering fluid flush",
        "Rack and pinion repair",
        "Suspension bushing replacement"
      ],
      price: "From ₹499.00"
    },
    {
      id: "exhaust-service",
      icon: FaCog,
      title: "Exhaust System Service",
      description:
        "Improve performance and reduce emissions with our exhaust system services:",
      features: [
        "Muffler and resonator replacement",
        "Exhaust leak repair",
        "Catalytic converter service",
        "Oxygen sensor replacement",
        "Performance exhaust upgrades"
      ],
      price: "From ₹399.00"
    },
    {
      id: "car-detailing",
      icon: FaCar,
      title: "Car Detailing & Polishing",
      description:
        "Give your car a brand-new look with our expert detailing and polishing services:",
      features: [
        "Interior deep cleaning",
        "Exterior polishing and waxing",
        "Ceramic coating",
        "Headlight restoration",
        "Odor removal treatment"
      ],
      price: "From ₹999.00"
    },
    {
      id: "windshield-repair",
      icon: FaTools,
      title: "Windshield & Glass Repair",
      description:
        "Drive safely with crystal-clear visibility using our glass repair services:",
      features: [
        "Windshield chip repair",
        "Full windshield replacement",
        "Side and rear glass repair",
        "Wiper blade replacement",
        "Water leak testing"
      ],
      price: "From ₹299.00"
    },
    {
      id: "hybrid-ev",
      icon: FaCarBattery,
      title: "Hybrid & EV Maintenance",
      description:
        "Keep your electric and hybrid vehicle running efficiently with specialized maintenance:",
      features: [
        "High-voltage battery diagnostics",
        "Regenerative braking system check",
        "Electric motor servicing",
        "Charging system inspection",
        "Software updates"
      ],
      price: "Price varies based on service"
    },
    {
      id: "fuel-system",
      icon: FaTachometerAlt,
      title: "Fuel System Cleaning",
      description:
        "Improve fuel efficiency and engine performance with our fuel system services:",
      features: [
        "Fuel injector cleaning",
        "Throttle body service",
        "Fuel filter replacement",
        "Carbon deposit removal",
        "Complete fuel system flush"
      ],
      price: "From ₹499.00"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="comservices-container">
      <header
        className="header_section"
        style={{ backgroundColor: "rgb(18 23 105)",padding:"0" }}
      >
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
                    <Link className="nav-link comserv-head-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link comserv-head-link" to="/about">
                      {" "}
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link comserv-head-link" to="/services">
                      {" "}
                      Services{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link comserv-head-link"
                      to="/contactus"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className="quote_btn-container "
                style={{ marginBottom: "7px" }}
              >
                <div className="">
                  <Link to="/login" className="btn-1 ">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-2"
                    style={{ color: "black" }}
                  >
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

      <section className="comserv-hero">
        <div className="comserv-container">
          <h1>Our Services</h1>
          <p>
            We offer a comprehensive range of automotive repair and maintenance
            services.
          </p>
        </div>
      </section>

      <section className="comserv-container">
        <div className="comserv-grid">
          {services.map((service) => (
            <div key={service.id} className="comserv-card">
              <div className="comserv-icon">
                <service.icon />
              </div>
              <h2>{service.title}</h2>
              <p className="comserv-description">{service.description}</p>
              <ul className="comserv-features">
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="comserv-card-footer">
                <span className="comserv-price">{service.price}</span>
                <a href="/user/services" className="comserv-btn">
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="comserv-cta">
        <h2>Can't Find What You Need?</h2>
        <p>
          We offer more services. Contact us to discuss your specific automotive
          needs.
        </p>
        <div className="comserv-cta-btns">
          <a href="/contactus" className="comserv-cta-btn">
            Contact Us
          </a>
          <a href="/user/services" className="comserv-cta-btn">
            Book Appointment
          </a>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
};
