import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

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

    try {
      const response = await axios.post("/contact", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(`Error submitting form: ${error.message}`);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      overflowY: "auto",
      padding: "40px",
      backgroundColor: "rgb(220, 225, 245)",
    }}>
      <div
        style={{
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          backgroundColor: "#0a2647",
          color: "#fff",
          width: "60%",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Us</h2>
        <ToastContainer />
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div>
            <label style={{ fontWeight: "bold" }}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #fff",
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "16px"
              }}
            />
            {errors.name && (
              <p style={{ color: "red", marginTop: "5px" }}>{errors.name}</p>
            )}
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #fff",
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "16px"
              }}
            />
            {errors.email && (
              <p style={{ color: "red", marginTop: "5px" }}>{errors.email}</p>
            )}
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #fff",
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "16px",
                resize: "none"
              }}
            />
            {errors.message && (
              <p style={{ color: "red", marginTop: "5px" }}>{errors.message}</p>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
            <button
              type="submit"
              style={{
                padding: "12px",
                backgroundColor: "rgb(55 99 148)",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                width: "50%"
              }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

