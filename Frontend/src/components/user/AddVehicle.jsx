import { useState } from "react";
import axios from "axios";

export const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    userId: localStorage.getItem("id"), // Assuming user is logged in
    model: "",
    mfgYear: "",
    licensePlate:"",
    vehicleType: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/vehicle/addvehicle", vehicle);
      setMessage(response.data.message);
      setVehicle({ userId: localStorage.getItem("id"), model: "", mfgYear: "", vehicleType: "" });
    } catch (error) {
      setMessage("Error adding vehicle. Please try again.");
      console.error("Error:", error.response?.data?.message || error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}>
      <h2 style={{ marginBottom: "15px", color: "#333", textAlign: "center" }}>
        Add Your Vehicle Data
      </h2>
      {message && <p style={{ color: "green", marginBottom: "10px", textAlign: "center" }}>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px",marginTop:"20px" }}>
        
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Vehicle Model:</label>
          <input
            type="text"
            name="model"
            placeholder="Example: i10, WagonR, etc."
            value={vehicle.model}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>MFG Year:</label>
          <input
            type="number"
            name="mfgYear"
            placeholder="Manufacturing Year"
            value={vehicle.mfgYear}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Vehicle Numberplate:</label>
          <input
            type="text"
            name="licensePlate"
            placeholder="Example: MH6778 etc."
            value={vehicle.licensePlate}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Vehicle Type:</label>
          <select
            name="vehicleType"
            value={vehicle.vehicleType}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            <option value="">Select Vehicle Type</option>
            <option value="two Wheeler">Two Wheeler</option>
            <option value="three Wheeler">Three Wheeler</option>
            <option value="four Wheeler">Four Wheeler</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
};


