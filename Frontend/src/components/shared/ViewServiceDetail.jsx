import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Get service ID from URL
import axios from "axios";

export const ViewServiceDetail = () => {
  const { serviceId } = useParams(); // ✅ Correct destructuring
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getServiceById = async () => {
    try {
      setError(null); // Reset error before fetching
      const response = await axios.get(`/service/getservicebyid/${serviceId}`);
      console.log(response);
      setService(response.data.data);
    } catch (err) {
      console.error("Error fetching service:", err);
      setError("Failed to load service details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serviceId) {
      getServiceById();
    }
  }, [serviceId]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}>
          Service Details
        </h2>

        {loading ? (
          <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", color: "#007BFF" }}>
            Loading...
          </div>
        ) : error ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>{error}</p>
        ) : !service ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#777" }}>No service found.</p>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ddd",
              padding: "25px",
              margin: "20px 0",
              borderRadius: "12px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <div style={{ flex: 1, paddingRight: "25px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>
                {service.name}
              </h3>
              <p style={{ fontSize: "16px", color: "#555", marginBottom: "15px", lineHeight: "1.6" }}>
                {service.description}
              </p>
              <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
                <span>Price: </span>
                <span style={{ color: "#007BFF", fontWeight: "bold" }}>₹{service.price || "N/A"}</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
                <span>Category: </span>
                <span style={{ color: "#777" }}>{service.category || "N/A"}</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
                <span>Duration: </span>
                <span style={{ color: "#777" }}>{service.duration || "N/A"} mins</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
                <span>Ratings: </span>
                <span style={{ color: "#FFD700", fontWeight: "bold" }}>⭐ {service.ratings || "N/A"}/5</span>
              </div>
              <p style={{ fontSize: "14px", color: "#777", marginTop: "15px" }}>
                Last updated {service.updatedAt ? new Date(service.updatedAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <img
                src={service.imageURL || "/default-service.jpg"}
                alt={service.name}
                style={{
                  width: "350px",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginLeft: "20px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
