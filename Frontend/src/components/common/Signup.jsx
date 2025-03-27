import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Signup = () => {
  const [roles, setRoles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/role/roles");
        setRoles(response.data.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const submitHandler = async (data) => {
    try {
      data.status = !!data.status;
      const selectedRole = roles.find((role) => role.name === data.role);
      data.roleId = selectedRole ? selectedRole._id : null;

      if (!data.roleId) {
        toast.error("Invalid role selected! ❌");
        return;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "image") {
          formData.append("image", data.image[0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await axios.post("/adduserwithfile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.status === 200) {
        toast.success("Signup successful! 🎉", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          onClose: () => navigate("/login"),
          transition: Bounce
        });
      } else {
        toast.error("Something went wrong! ❌", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce
        });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(
        error.response?.data?.message || "Signup failed! Please try again. ❌",
        { position: "top-right" }
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#cce5ff"
      }}
    >
      <ToastContainer />
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "350px"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Sign Up</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          {[
            { name: "fullName", type: "text", label: "Full Name" },
            { name: "email", type: "email", label: "Email" },
            { name: "password", type: "password", label: "Password" },
            { name: "contact", type: "text", label: "Contact" }
          ].map(({ name, type, label }, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              <label style={{ display: "block", fontWeight: "bold", fontSize: "14px" }}>{label}:</label>
              <input
                type={type}
                {...register(name, {
                  required: `${label} is required`,
                  minLength: name === "password" ? { value: 6, message: "Minimum 6 characters" } : undefined,
                  pattern: name === "contact" ? { value: /[6-9]{1}[0-9]{9}/, message: "Invalid contact number" } : undefined
                })}
                placeholder={`Enter your ${label.toLowerCase()}`}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #636e72",
                  borderRadius: "5px",
                  background: "#dfe6e9"
                }}
              />
              <span style={{ color: "red", fontSize: "12px" }}>{errors[name]?.message}</span>
            </div>
          ))}

          <div style={{ marginBottom: "8px" }}>
            <label style={{ display: "block", fontWeight: "bold", fontSize: "14px" }}>Your Role:</label>
            <select
              {...register("role", { required: "Role is required" })}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "14px"
              }}
            >
              <option value="">Select your role</option>
              {roles.map((role) => (
                <option key={role._id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
            <span style={{ color: "red", fontSize: "12px" }}>{errors.role?.message}</span>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>Profile Picture:</label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                background: "#dfe6e9"
              }}
            />
            <span style={{ color: "red", fontSize: "12px" }}>{errors.image?.message}</span>
          </div>

          <button
            type="submit"
            style={{
              background: "#0056b3",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              width: "100%",
              transition: "0.3s"
            }}
          >
            Signup
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account?{" "}
          <NavLink to="/login" style={{ color: "#0984e3", textDecoration: "none" }}>
            Login now
          </NavLink>
        </p>
      </div>
    </div>
  );
};
