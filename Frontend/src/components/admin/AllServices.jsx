import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AllServices = () => {
  const [availableServices, setAvailableServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios
      .get("/service/services")
      .then((response) => setAvailableServices(response.data.data))
      .catch(() => setError("Failed to fetch available services"));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/service/service/${id}`);
      toast.success("Service deleted successfully!");
      fetchServices();
    } catch (err) {
      toast.error("Failed to delete the service.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "rgb(135, 170, 201)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <ToastContainer />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2 style={{ fontSize: "2rem", color: "white", marginBottom: "20px" }}>
        All Services
      </h2>

      {availableServices.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <div style={{ overflowX: "auto", width: "100%", maxWidth: "1200px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
            }}
          >
            <thead style={{ backgroundColor: "#007bff", color: "white" }}>
              <tr>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Image</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Category</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Price (₹)</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Duration (mins)</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Availability</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Ratings</th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {availableServices.map((service) => (
                <tr key={service._id}>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {service.imageURL && (
                      <img
                        src={service.imageURL}
                        alt={service.name}
                        style={{
                          width: "100px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {service.name}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {service.category}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    ₹{service.price}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    {service.duration}
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <span
                      style={{
                        color: service.availability ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {service.availability ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    ⭐ {service.ratings}/5
                  </td>
                  <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => handleDelete(service._id)}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
