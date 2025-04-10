import { useState } from "react";
import axios from "axios";

export const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    userId: localStorage.getItem("id"),
    model: "",
    mfgYear: "",
    licensePlate: "",
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
      setVehicle({
        userId: localStorage.getItem("id"),
        model: "",
        mfgYear: "",
        licensePlate: "",
        vehicleType: "",
      });
    } catch (error) {
      setMessage("Error adding vehicle. Please try again.");
      console.error("Error:", error.response?.data?.message || error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{backgroundColor:"rgb(220, 225, 245)"}}>
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#0a2647", // Dark Blue
        color: "#fff", // White Text
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Vehicle</h2>

      {message && (
        <p style={{ color: "lightgreen", textAlign: "center" }}>{message}</p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {/* Vehicle Model */}
        <div>
          <label style={{ fontWeight: "bold" }}>Name:</label>
          <input
            type="text"
            name="model"
            placeholder="WagonR, i10, etc."
            value={vehicle.model}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #fff",
              borderRadius: "5px",
              fontSize: "16px",
              width: "100%",
            }}
          />
        </div>

        {/* Manufacturing Year */}
        <div>
          <label style={{ fontWeight: "bold" }}>MFG Year:</label>
          <input
            type="number"
            name="mfgYear"
            placeholder="Manufacturing Year"
            value={vehicle.mfgYear}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #fff",
              borderRadius: "5px",
              fontSize: "16px",
              width: "100%",
            }}
          />
        </div>

        {/* License Plate */}
        <div>
          <label style={{ fontWeight: "bold" }}>License Plate:</label>
          <input
            type="text"
            name="licensePlate"
            placeholder="MH12AB1234"
            value={vehicle.licensePlate}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #fff",
              borderRadius: "5px",
              fontSize: "16px",
              width: "100%",
            }}
          />
        </div>

        {/* Vehicle Type */}
        <div>
          <label style={{ fontWeight: "bold" }}>Vehicle Type:</label>
          <select
            name="vehicleType"
            value={vehicle.vehicleType}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #fff",
              borderRadius: "5px",
              fontSize: "16px",
              width: "100%",
            }}
          >
            <option value="">Select Vehicle Type</option>
            <option value="two Wheeler">Two Wheeler</option>
            <option value="three Wheeler">Three Wheeler</option>
            <option value="four Wheeler">Four Wheeler</option>
          </select>
        </div>

        {/* Buttons */}



        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#6080d8",
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
    </div>
  );
};


