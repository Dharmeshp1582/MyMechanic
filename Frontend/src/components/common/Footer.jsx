// // import React from 'react'
// import { Link } from 'react-router-dom'

// // Use after user login
// export const Footer = () => {
//   return (
//     <footer 
//       className="bg-dark text-white text-center py-2" 
//       style={{
//         marginTop: "auto",
//         width: "100%",
//         position: "relative",
//         bottom: "0",
//         left: "0"
//       }}
//     >
//       <div>
//         <p className="mb-1">&copy; 2025 My Mechanic. All rights reserved.</p>
//         <p className="mb-0" style={{ color: "gray", fontSize: "0.8rem" }}>
//           <Link to="#" style={{ color: "grey", marginRight: "10px" }}>Privacy Policy</Link> |
//           <Link to="#" style={{ color: "gray", marginLeft: "10px" }}>Terms of Service</Link>
//         </p>
//       </div>
//     </footer>
//   )
// }

import React from 'react'
import { FaCar, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter, FaWrench } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import "../../assets/landing/css/Footer.css"

export const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-container">
      <div className="footer-grid">
        
        {/* Logo and About */}
        <div>
          <Link to="/user" className="footer-logo">
            <FaCar className="footer-logo-icon" />
            <span>My Mechanic</span>
          </Link>
          <p className="footer-text">
            Your trusted partner for all automotive repair and maintenance services. Quality service guaranteed.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook size={22} /></a>
            <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer"><FaTwitter size={22} /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram size={22} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/user">Home</Link></li>
            <li><Link to="/user/services">Services</Link></li>
            <li><Link to="/user/getvehiclebyuserid">Book Appointment</Link></li>
            {/* <li><Link to="/about">About Us</Link></li> */}
            <li><Link to="/user/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="footer-heading">Our Services</h3>
          <ul className="footer-links">
            <li><Link to="/user/garages">Oil Change</Link></li>
            <li><Link to="/user/garages">Brake Repair</Link></li>
            <li><Link to="/user/garages">Engine Diagnostics</Link></li>
            <li><Link to="/user/garages">Tire Services</Link></li>
            <li><Link to="/user/garages">AC Repair</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="footer-heading">Contact Us</h3>
          <div className="footer-contact">
            <FaMapMarkerAlt className="footer-contact-icon" />
            <span>123 Garage Street, Auto City, AC 12345</span>
          </div>
          <div className="footer-contact">
            <FaPhone className="footer-contact-icon" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="footer-contact">
            <FaEnvelope className="footer-contact-icon" />
            <span>info@mymechanic.com</span>
          </div>
        </div>
        
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} My Mechanic. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}
