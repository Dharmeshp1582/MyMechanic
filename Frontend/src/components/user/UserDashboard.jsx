import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ServicesGrid from "./ServiceGrid";
import { Faqs } from "./Faqs";
import { motion } from "framer-motion";
import { HowMyWork } from "./HowMyWork";
import "../../assets/css/UserDashboard.css";

export const UserDashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getServices = async () => {
    try {
      const serviceRes = await axios.get("/service/services");
      setServices(serviceRes.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div
      style={{ width: "100%", minHeight: "100vh", backgroundColor: "#f9fafb" }}
    >
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
          color: "white",
          padding: "80px 20px",
          textAlign: "center",
          width: "100%"
        }}
      >
        <h1
          style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "10px" }}
        >
          Welcome to MyMechanic
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: "0.9"
          }}
        >
          Your one-stop solution for all vehicle maintenance and repair needs.
        </p>
      </section>

      {/* Services Section */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          // backgroundColor: "#dce1f5",
          minHeight: "100vh"
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "2.3rem",
            padding: "12px",
            width: "100%",
            margin: "auto",
            color: "black"
          }}
        >
          Our Services
        </h2>

        {loading ? (
          <div
            style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#007BFF" }}
          >
            Loading...
          </div>
        ) : services.length === 0 ? (
          <p style={{ fontSize: "1.2rem", color: "#666" }}>
            No services available.
          </p>
        ) : (
          <>
            {services.slice(0, 5).map((service, index) => (
              <div
                key={service._id}
                style={{
                  overflow: "hidden",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: "20px",
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse",

                  border: "1px solid rgb(96 84 84)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  marginBottom: "20px"
                }}
              >
                {/* Service Image */}
                <div className="service-img-container">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={service.imageURL || "/default-service.jpg"}
                      alt={service.name}
                      className="ser-img"
                      style={{
                        position: "relative",
                        zIndex: "2",
                        width: "350px",
                        height: "280px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "2px solid black",
                        content: "",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                      }}
                    />
                  </motion.div>
                </div>

                {/* Service Details */}
                <div style={{ textAlign: "left", padding: "15px" }}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3
                      className="serv-h3"
                      style={{ fontSize: "24px", color: "#333" }}
                    >
                      {service.name}
                    </h3>
                    {/* <p
                      style={{
                        fontSize: "1rem",
                        color: "#666",
                        width: "18.6rem",
                        margin: "auto"
                      }}
                    >
                      {service.description}
                    </p> */}
                    <p
                      style={{
                        marginTop: "5px",
                        fontWeight: "bold",
                        color: "#444"
                      }}
                    >
                      <strong>Category:</strong> {service.category || "N/A"}
                    </p>
                    <p style={{ fontWeight: "bold", color: "#444" }}>
                      <strong>Price:</strong> ₹{service.price || "N/A"}
                    </p>
                    <p style={{ fontWeight: "bold", color: "#444" }}>
                      <strong>Duration:</strong> {service.duration || "N/A"}{" "}
                      mins
                    </p>
                    <p style={{ fontWeight: "bold",color: "#444" }}>
                      <strong>Availability:</strong>
                      <span
                        style={{
                          color: service.availability ? "green" : "red",
                          fontWeight: "bold"
                        }}
                      >
                        {service.availability ? "Available" : "Not Available"}
                      </span>
                    </p>
                    <p style={{ fontWeight: "bold", color: "#444" }}>
                      <strong>Ratings:</strong> ⭐ {service.ratings || "N/A"}/5
                    </p>
                    <button
                      onClick={() => navigate(`/user/service/${service._id}`)}
                      className="serv-btn serv-book-btn"
                    >
                      View Detail
                    </button>
                  </motion.div>
                </div>
              </div>
            ))}

            {services.length > 3 && (
              <button
                onMouseOver={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #0056b3, #004494)";
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgb(10,38,71)"; // Default background
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.color = "white";
                }}
                onClick={() => navigate("/user/services")}
                style={{
                  padding: "10px 20px",
                  fontSize: "1.2rem",
                  background: "rgb(67 136 210)", // Default background
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginTop: "20px",
                  fontWeight: "bold",
                  transition:
                    "transform 0.2s ease-in-out, background 0.2s ease-in-out"
                }}
              >
                Explore More
              </button>
            )}
          </>
        )}
      </div>

      {/* Regular Services */}
      <section
        style={{ width: "100%", backgroundColor: "#e2e8f0", padding: "20px 0" }}
      >
        <h1 style={{ textAlign: "center" }}>Regular Services</h1>
        <div className="container text-center">
          <ServicesGrid />
        </div>
      </section>

      {/* FAQs Section */}
      <section style={{ width: "100%", padding: "20px 0" }}>
        <div>
          <Faqs />
        </div>
      </section>

      {/* how MyMechanic works  */}

      <section
        style={{ width: "100%", backgroundColor: "#e2e8f0", padding: "20px 0" }}
      >
        <div className="Works">
          <HowMyWork />
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          marginTop: "20px",
          width: "100%",
          textAlign: "center",
          background: "#1e3a8a",
          color: "white",
          padding: "40px 0"
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Ready to Get Started?
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: "0.9"
          }}
        >
          Book an appointment today and experience our top-quality automotive
          services.
        </p>
        <Link
          to="/user/getvehiclebyuserid"
          style={{
            display: "inline-block",
            padding: "14px 28px",
            fontSize: "16px",
            backgroundColor: "white",
            color: "#1e3a8a",
            borderRadius: "6px",
            marginTop: "20px"
          }}
        >
          Book Appointment Now
        </Link>
      </section>
    </div>
  );
};
