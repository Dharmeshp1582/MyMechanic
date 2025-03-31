import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ViewServiceDetail = () => {
  const { serviceId } = useParams(); // ✅ Extract serviceId from URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!serviceId) return; // ✅ Prevent unnecessary API calls

      try {
        const res = await axios.get(`/service/getservicebyid/${serviceId}`);
        setService(res.data.data); // ✅ No need to check ID manually
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", fontSize: "20px", color: "#007BFF" }}>
        Loading...
      </div>
    );
  }

  if (!service) {
    return (
      <p style={{ textAlign: "center", fontSize: "18px", color: "#777" }}>
        Service not found.
      </p>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold", color: "#222" }}>
        {service.name}
      </h2>
      <img
        src={service.imageURL || "/default-service.jpg"}
        alt={service.name}
        style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px" }}
      />
      <p style={{ fontSize: "18px", color: "#555", marginTop: "20px" }}>
        {service.description}
      </p>
      <p style={{ fontSize: "18px", fontWeight: "bold", color: "#007BFF" }}>
        Price: ₹{service.price || "N/A"}
      </p>
      <p style={{ fontSize: "16px", color: "#777" }}>
        Category: {service.category || "N/A"}
      </p>
      <p style={{ fontSize: "16px", color: "#777" }}>
        Duration: {service.duration || "N/A"} mins
      </p>
      <p style={{ fontSize: "16px", color: "#FFD700" }}>
        ⭐ Ratings: {service.ratings || "N/A"}/5
      </p>
      <p style={{ fontSize: "14px", color: "#777", marginTop: "10px" }}>
        Last updated: {new Date(service.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
};
