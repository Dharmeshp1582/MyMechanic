import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { CgMail } from "react-icons/cg";
import "react-toastify/dist/ReactToastify.css";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("user/forgetpassword", {
        email: data.email
      });

      toast.success(response.data.message || "Reset link sent to your email!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#f5f6fa"
        }}
      >
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            width: "350px",
            textAlign: "center"
          }}
        >
          <h2 style={{ color: "#2d3436" }}>Forgot Password</h2>
          <p style={{ color: "#636e72", marginBottom: "1rem" }}>
            Enter your email to receive a password reset link.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                background: "#dfe6e9"
              }}
            />
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.email?.message}
            </span>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#b2bec3" : "#0984e3",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "0.3s",
                marginTop: "10px"
              }}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#2d3436" }}>
            Open Gmail:
          </p>
          <a href="https://www.gmail.com/" target="_blank" rel="noopener noreferrer">
            <CgMail size={32} color="#e74c3c" />
          </a>
        </div>
      </div>
    </>
  );
};
