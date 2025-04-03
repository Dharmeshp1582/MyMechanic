import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Services = () => {
  const [availableServices, setAvailableServices] = useState([]);
  const [error, setError] = useState("");
  const [fullScreenImage, setFullScreenImage] = useState(null);

  useEffect(() => {
    axios
      .get("/service/services")
      .then((response) => {
        setAvailableServices(response.data.data);
      })
      .catch(() => {
        setError("Failed to fetch available services");
      });
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "2rem", color: "#333" }}>Services</h2>
      
      {availableServices.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>No services available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            padding: "20px",
          }}
        >
          {availableServices.map((service) => (
            <div
              key={service._id}
              style={{
                borderRadius: "10px",
                border: "1px solid #ddd",
                overflow: "hidden",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "15px",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0px 6px 18px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.1)";
              }}
            >
              {service.imageURL && (
                <img
                  src={service.imageURL}
                  alt={service.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => setFullScreenImage(service.imageURL)}
                />
              )}

              <div style={{ width: "100%", padding: "10px" }}>
                <h3 style={{ fontSize: "1.3rem", color: "#333", marginBottom: "5px" }}>{service.name}</h3>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>{service.description}</p>
                <p style={{ fontWeight: "bold", color: "#444" }}><strong>Category:</strong> {service.category}</p>
                <p style={{ fontWeight: "bold", color: "#444" }}><strong>Price:</strong> ₹{service.price}</p>
                <p style={{ fontWeight: "bold", color: "#444" }}><strong>Duration:</strong> {service.duration} mins</p>
                <p style={{ fontWeight: "bold" }}>
                  <strong>Availability:</strong> 
                  <span style={{ color: service.availability ? "green" : "red", fontWeight: "bold" }}>
                    {service.availability ? "Available" : "Not Available"}
                  </span>
                </p>
                <p style={{ fontWeight: "bold", color: "#444" }}><strong>Ratings:</strong> ⭐ {service.ratings}/5</p>
                
                <Link
                  to="/user/booking"
                  style={{
                    marginTop: "12px",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "block",
                    textAlign: "center",
                    transition: "background 0.3s",
                  }}
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {fullScreenImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setFullScreenImage(null)}
        >
          <img
            src={fullScreenImage}
            alt="Full Screen"
            style={{
              width: "80%",
              height: "80%",
              objectFit: "contain",
              borderRadius: "10px",
              boxShadow: "0px 6px 15px rgba(255,255,255,0.2)",
            }}
          />
        </div>
      )}
    </div>
  );
};
