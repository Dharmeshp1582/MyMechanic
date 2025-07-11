import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/bookappointment.css";

export const Booking = () => {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedVehicle, selectedGarage, selectedServices } = location.state || {};

  const [vehicles, setVehicles] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  const getInitialFormData = () => ({
    userId: userId,
    serviceId: [],
    vehicleId: "",
    garageownerId: "",
    appointmentDate: "",
    basePrice: 0,
    finalPrice: 0,
    status: "pending",
    reason: "",
  });

  const [formData, setFormData] = useState(getInitialFormData());

  useEffect(() => {
    if (!userId) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    axios.get(`/vehicle/getvehiclebyuserid/${userId}`)
      .then((res) => setVehicles(res.data.data))
      .catch((err) => console.error("Failed to fetch vehicles", err));

    if (selectedVehicle) {
      setFormData((prev) => ({ ...prev, vehicleId: selectedVehicle._id }));
    }

    if (selectedGarage) {
      setFormData((prev) => ({ ...prev, garageownerId: selectedGarage._id }));
    }

    if (selectedServices?.length > 0) {
      const serviceIds = selectedServices.map((s) => s._id);
      const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

      setSelectedServiceIds(serviceIds);
      setFormData((prev) => ({
        ...prev,
        serviceId: serviceIds,
        basePrice: totalPrice,
        finalPrice: totalPrice,
      }));
    }
  }, [userId, selectedVehicle, selectedGarage, selectedServices]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServiceChange = (service) => {
    const isSelected = selectedServiceIds.includes(service._id);
    const updatedServiceIds = isSelected
      ? selectedServiceIds.filter((id) => id !== service._id)
      : [...selectedServiceIds, service._id];

    const totalPrice = updatedServiceIds.reduce((sum, id) => {
      const s = selectedServices?.find((s) => s._id === id);
      return sum + (s?.price || 0);
    }, 0);

    setSelectedServiceIds(updatedServiceIds);
    setFormData((prevData) => ({
      ...prevData,
      serviceId: updatedServiceIds,
      basePrice: totalPrice,
      finalPrice: totalPrice,
    }));

    setDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.serviceId.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }

    if (!formData.vehicleId) {
      toast.error("Please select a vehicle.");
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
      setIsLoading(true);

      await axios.post("/appointment/addappointment", formData);

      toast.success("Appointment booked successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => {
        navigate("/user/appointment");
      }, 1600);

      setFormData(getInitialFormData());
      setSelectedServiceIds([]);
    } catch (error) {
      console.error("Booking failed", error);
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="book-app-container">
        <button onClick={() => navigate(-1)} className="book-app-go-back-button">
          ← Go Back
        </button>

        <h2 className="book-app-heading">Book an Appointment</h2>

        <form onSubmit={handleSubmit}>
          <label className="book-app-label">Select Services</label>
          <div className="book-app-multiselect-dropdown" ref={dropdownRef}>
            <div
              className="book-app-dropdown-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedServiceIds.length > 0
                ? `${selectedServiceIds.length} service(s) selected`
                : "Select Services"}
            </div>

            {dropdownOpen && selectedServices?.length > 0 ? (
              <div className="book-app-dropdown-list">
                {selectedServices.map((service) => (
                  <div
                    key={service._id}
                    className="book-app-dropdown-item"
                    onClick={() => handleServiceChange(service)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedServiceIds.includes(service._id)}
                      readOnly
                    />
                    <label>
                      {service.name} - ₹{service.price}
                    </label>
                  </div>
                ))}
              </div>
            ) : dropdownOpen ? (
              <p style={{ padding: "10px", color: "gray" }}>No services available</p>
            ) : null}
          </div>

          <label className="book-app-label">Select Vehicle</label>
          <select
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            required
            className="book-app-select"
          >
            <option value="">-- Choose a Vehicle --</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.model}
              </option>
            ))}
          </select>

          <label className="book-app-label">Appointment Date</label>
          <input
            type="date"
            name="appointmentDate"
            min={new Date().toISOString().split("T")[0]} // disable past dates
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            className="book-app-input"
          />

          <label className="book-app-label">Reason</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="book-app-input"
            placeholder="Optional"
          />

          <div className="book-app-price-box">
            <p>
              <strong>Base Price:</strong> ₹{formData.finalPrice}
            </p>
          </div>

          <button
            type="submit"
            className="book-app-submit-button"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};
