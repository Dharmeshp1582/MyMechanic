/* eslint-disable react/no-unescaped-entities */
import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/landing/css/landingPage.css";
import "../../assets/landing/css/style.css";
import "../../assets/landing/css/responsive.css";
import about2image from "../../assets/landing/images/about-img2.png";
import sliderImage from "../../assets/landing/images/slider-img.png";
import garagelogo from "../../assets/images/logo.webp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTools, FaUserCheck, FaHistory, FaAward } from "react-icons/fa";
// import "../../assets/landing/js/custom"
import "../../assets/landing/css/aboutus.css"
import { Footer } from "../layouts/Footer";
import { SliderSection } from "../layouts/SliderSection";

export const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Master Mechanic",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "John has over 15 years of experience in automotive repair and is ASE certified in multiple specialties."
    },
    {
      name: "Jane Smith",
      role: "Service Manager",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Jane ensures that all service operations run smoothly and that our customers receive the best possible experience."
    },
    {
      name: "Mike Johnson",
      role: "Diagnostic Specialist",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      bio: "Mike specializes in advanced diagnostics and can troubleshoot even the most complex automotive issues."
    },
    {
      name: "Sarah Williams",
      role: "Customer Service Manager",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      bio: "Sarah is dedicated to ensuring that every customer has a positive experience with our garage."
    }
  ];

  const milestones = [
    {
      year: "2010",
      title: "Founded My Mechanic",
      description: "Started with a small 2-bay garage providing honest repairs."
    },
    {
      year: "2015",
      title: "Expanded Services",
      description: "Added diagnostics, tire services, and maintenance plans."
    },
    {
      year: "2020",
      title: "New Workshop",
      description: "Moved to a larger facility to serve more customers."
    },
    {
      year: "2025",
      title: "Digital Platform Launch",
      description: "Introduced My Mechanic online booking & service tracking."
    }
  ];

  return (
    <div className="aboutus-container">
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
                    <Link className="nav-link about-head-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link about-head-link" to="/about">
                      {" "}
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link about-head-link" to="/services">
                      {" "}
                      Services{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link about-head-link" to="/contactus">
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

      <div>
        {/* Our Story Section */}

        <section className="story-section">
          <div className="story-container">
            <h2 className="story-heading">Our Story</h2>
            <div className="story-content">
              <motion.div
                className="story-text"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p>
                  My mechanic was founded in 2005 with a simple mission: to
                  provide honest, high-quality automotive repair services at
                  fair prices. What started as a small garage with just two
                  service bays has grown into a full-service automotive repair
                  center.
                </p>
                <p>
                  Our founder, John Doe, had worked in various automotive repair
                  shops for over a decade before deciding to start his own
                  business. He was frustrated with the industry&apos;s reputation for
                  overcharging and performing unnecessary repairs, and he wanted
                  to create a garage that prioritized honesty, transparency, and
                  customer education.
                </p>
                <p>
                  Today, My Mechanic continues to operate with those same
                  values. We've grown in size and capabilities, but our
                  commitment to honest service and customer satisfaction remains
                  unchanged.
                </p>
              </motion.div>
              <motion.div
                className="story-image"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Garage workshop"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="values-section">
          <div className="values-container">
            <h2 className="values-heading">Our Values</h2>
            <p className="values-description">
              These core values guide everything we do at My Mechanic, from how
              we treat our customers to how we approach repairs.
            </p>

            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <FaTools />
                </div>
                <h3 className="value-title">Quality</h3>
                <p className="value-text">
                  We use only high-quality parts and follow manufacturer
                  specifications for all repairs.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <FaUserCheck />
                </div>
                <h3 className="value-title">Integrity</h3>
                <p className="value-text">
                  We're honest about what repairs are needed and provide
                  transparent pricing.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <FaHistory />
                </div>
                <h3 className="value-title">Reliability</h3>
                <p className="value-text">
                  We complete repairs on time and stand behind our work with
                  solid warranties.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">
                  <FaAward />
                </div>
                <h3 className="value-title">Expertise</h3>
                <p className="value-text">
                  Our ASE-certified mechanics have the training and experience
                  to handle any repair.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="team-section">
          <div className="team-container">
            <h2 className="team-heading">Meet Our Team</h2>
            <p className="team-description">
              Our team of certified mechanics and service professionals are
              dedicated to providing you with the best service experience.
            </p>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="team-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-image"
                  />
                  <div className="team-content">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="journey-section">
          <div className="journey-container">
            <h2 className="journey-heading">Our Journey</h2>
            <p className="journey-description">
              Key milestones in our history that have shaped My Mechanic into
              what it is today.
            </p>

            <div className="timeline">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`timeline-item ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div
                    className={`timeline-content ${
                      index % 2 === 0 ? "left" : "right"
                    }`}
                  >
                    <span className="timeline-year">{milestone.year}</span>
                    <h3 className="text-xl font-bold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>

                  {/* Timeline Dot */}
                  <div className="timeline-dot"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-container">
            <h2 className="cta-heading">Ready to Experience Our Service?</h2>
            <p className="cta-text">
              Book an appointment today and see why our customers trust us with
              their vehicles.
            </p>
            <div className="cta-buttons">
              <Link to="/user/services" className="cta-btn-1">
                Book Appointment
              </Link>
              <Link to="/contactus" className="cta-btn-2">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer></Footer>
    </div>
  );
};
