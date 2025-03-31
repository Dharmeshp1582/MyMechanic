import { useState, useEffect } from "react";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Booking = () => {
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [garages, setGarages] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [formData, setFormData] = useState({
    userId: localStorage.getItem("id"),
    serviceId: [],
    vehicleId: "",
    garageownerId: "",
    appointmentDate: "",
    basePrice: 0,
    finalPrice: 0,
    status: "pending",
    reason: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    axios.get("/service/services").then((res) => setServices(res.data.data));
    if (userId) {
      axios.get(`/vehicle/getvehiclebyuserid/${userId}`).then((res) => setVehicles(res.data.data));
    }
    axios.get("/garage/getallgarages").then((res) => setGarages(res.data.data));
  }, []);

  const handleServiceChange = (service) => {
    setSelectedServiceIds((prev) => {
      let updatedServices = prev.includes(service._id)
        ? prev.filter((id) => id !== service._id)
        : [...prev, service._id];

      const totalBasePrice = updatedServices.reduce((sum, id) => {
        const selectedService = services.find((s) => s._id === id);
        return sum + (selectedService ? selectedService.price : 0);
      }, 0);

      setFormData((prevData) => ({
        ...prevData,
        serviceId: updatedServices,
        basePrice: totalBasePrice,
        finalPrice: totalBasePrice,
      }));
      return updatedServices;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.serviceId.length === 0) {
      toast.error("Please select at least one service before booking an appointment.");
      return;
    }

    const selectedDate = new Date(formData.appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Please select a valid appointment date. Past dates are not allowed.");
      return;
    }

    try {
      await axios.post("/appointment/addappointment", formData);
      toast.success("appointment booked successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
        onClose: () => navigate("/user")
      });
    
    

      // Reset form fields
      setFormData({
        userId: localStorage.getItem("id"),
        serviceId: [],
        vehicleId: "",
        garageownerId: "",
        appointmentDate: "",
        basePrice: 0,
        finalPrice: 0,
        status: "pending",
        reason: "",
      });

      setSelectedServiceIds([]);
    } catch (error) {
      console.error("Booking failed", error);
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          maxWidth: "450px",
          margin: "30px auto",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "15px" }}>Book an Appointment</h2>

        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: "bold", fontSize: "14px" }}>Select Services</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
            {services.map((service) => (
              <button
                key={service._id}
                type="button"
                style={{
                  padding: "6px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundColor: selectedServiceIds.includes(service._id) ? "#007bff" : "#f8f9fa",
                  color: selectedServiceIds.includes(service._id) ? "#fff" : "#333",
                }}
                onClick={() => handleServiceChange(service)}
              >
                {service.name} - ₹{service.price}
              </button>
            ))}
          </div>

          <label style={{ fontWeight: "bold", fontSize: "14px" }}>Select Vehicle</label>
          <select
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Choose a Vehicle --</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.model}
              </option>
            ))}
          </select>

          <label style={{ fontWeight: "bold", fontSize: "14px" }}>Select Garage</label>
          <select
            name="garageownerId"
            value={formData.garageownerId}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Choose a Garage --</option>
            {garages.map((garage) => (
              <option key={garage._id} value={garage._id}>
                {garage.name}
              </option>
            ))}
          </select>

          <label style={{ fontWeight: "bold", fontSize: "14px" }}>Appointment Date</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <label style={{ fontWeight: "bold", fontSize: "14px" }}>Reason</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <div style={{ marginBottom: "15px", padding: "10px", background: "#f1f1f1", borderRadius: "5px" }}>
            <p>
              <strong>Base Price:</strong> ₹{formData.basePrice}
            </p>
            
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </>
  );
};
