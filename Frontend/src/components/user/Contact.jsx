import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);  // Added loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email format";
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);  // Set loading state to true

    try {
      const response = await axios.post("/contact", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Message sent successfully!", {
          theme: "dark",
          autoClose: 2000,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(`Error submitting form: ${error.message}`);
    } finally {
      setLoading(false);  // Set loading state back to false
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        padding: "40px",
        backgroundColor: "rgb(220, 225, 245)",
      }}
    >
      <div
        style={{
          margin: "auto",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
          color: "#000",
          width: "80%",
          maxWidth: "900px",
        }}
      >
        <h2
          style={{
            textAlign: "left",
            marginBottom: "30px",
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          Send Us a Message
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label style={{ fontWeight: "bold" }}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "16px",
              }}
            />
            {errors.name && (
              <p style={{ color: "red", marginTop: "5px" }}>{errors.name}</p>
            )}
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "16px",
              }}
            />
            {errors.email && (
              <p style={{ color: "red", marginTop: "5px" }}>{errors.email}</p>
            )}
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "16px",
                resize: "vertical",
              }}
            />
            {errors.message && (
              <p style={{ color: "red", marginTop: "5px" }}>{errors.message}</p>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <button
              type="submit"
              style={{
                padding: "12px",
                backgroundColor: "#0d3b66",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                width: "180px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4f91")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#0d3b66")}
              disabled={loading}  // Disable button while loading
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>

      {/* <ToastContainer /> */}
    </div>
  );
};
