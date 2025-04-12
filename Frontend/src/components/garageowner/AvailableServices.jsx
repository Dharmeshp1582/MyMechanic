import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const AvailableServices = () => {
  const [availableServices, setAvailableServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/service/getservicesbyuserid/" + localStorage.getItem("id"))
      .then((response) => {
        setAvailableServices(response.data.data);
      })
      .catch((err) => {
        setError("Failed to fetch available services", err);
      });
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "rgb(220, 225, 245)",
        minHeight: "100vh",
      }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2 style={{ fontSize: "2rem", color: "black", marginBottom: "20px" ,fontWeight:"bold"}}>
        Available Services
      </h2>

      {availableServices.length === 0 ? (
        <p style={{ fontSize: "1.2rem", color: "#666" }}>No services available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "1200px",
          
          }}
        >
          {availableServices.map((service) => (
            <div
              key={service._id}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                background: "rgb(227, 228, 234)",
                border: "1px solid black",
                textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0px 6px 15px rgba(0, 0, 0, 0.15)";
              }}
            >
              {/* Service Image */}
              {service.imageURL && (
                <img
                  src={service.imageURL}
                  alt={service.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              )}

              {/* Service Details */}
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    color: "#007bff",
                    marginBottom: "10px",
                  }}
                >
                  {service.name}
                </h3>

                <p style={{ fontWeight: "bold", color: "#444" }}>
                  <strong>Category:</strong> {service.category}
                </p>
                <p style={{ fontWeight: "bold", color: "#444" }}>
                  <strong>Price:</strong> ₹{service.price}
                </p>
                <p style={{ fontWeight: "bold", color: "#444" }}>
                  <strong>Duration:</strong> {service.duration} mins
                </p>
                <p style={{ fontWeight: "bold" }}>
                  <strong>Availability:</strong>{" "}
                  <span
                    style={{
                      color: service.availability ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {service.availability ? "Available" : "Not Available"}
                  </span>
                </p>
                <p style={{ fontWeight: "bold", color: "#444" }}>
                  <strong>Ratings:</strong> ⭐ {service.ratings}/5
                </p>

                {/* Booking Button */}
                <Link
                  to={`/garageowner/updateservice/${service._id}`}
                  style={{
                    display: "inline-block",
                    marginTop: "15px",
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: "rgb(17, 17, 19)",
                    color: "#fff",
                    fontSize: "1rem",
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "background 0.3s, transform 0.2s",
                  }}
                 
                 
                >
                  Update
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
