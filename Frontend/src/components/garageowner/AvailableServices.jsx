import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "../../../src/assets/css/addservice.css";

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
        justifyContent: "center"
      }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh"
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "2rem", color: "#333" }}>
          Services
        </h2>

        {availableServices.length === 0 ? (
          <p style={{ fontSize: "1.2rem", color: "#666" }}>
            No services available.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
              padding: "20px"
            }}
          >
            {availableServices.map((service) => (
              <div
                key={service._id}
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                  textAlign: "center",
                  transition: "transform 0.2s ease-in-out"
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                {/* Service Image */}
                {service.imageURL && (
                  <img
                    src={service.imageURL}
                    alt={service.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover"
                    }}
                  />
                )}

                {/* Service Details */}
                <div style={{ padding: "15px" }}>
                  <h3
                    style={{
                      marginBottom: "5px",
                      fontSize: "1.4rem",
                      color: "#007bff"
                    }}
                  >
                    {service.name}
                  </h3>
                  <p style={{ color: "#666", fontSize: "1rem" }}>
                    {service.description}
                  </p>

                  <p style={{ fontWeight: "bold", color: "#444" }}>
                    <strong>Category:</strong> {service.category}
                  </p>
                  <p style={{ fontWeight: "bold", color: "#444" }}>
                    <strong>Price:</strong> ${service.price}
                  </p>
                  <p style={{ fontWeight: "bold", color: "#444" }}>
                    <strong>Duration:</strong> {service.duration} mins
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    <strong>Availability:</strong>{" "}
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
                    <strong>Ratings:</strong> ⭐ {service.ratings}/5
                  </p>

                  {/* Booking Button */}
                  <Link
                    to={`/garageowner/updateservice/${service._id}`}
                    style={{
                      marginTop: "12px",
                      padding: "10px 18px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                      fontSize: "1rem",
                      cursor: "pointer",
                      transition: "background 0.3s"
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0056b3")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#007bff")
                    }
                  >
                    Update
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
