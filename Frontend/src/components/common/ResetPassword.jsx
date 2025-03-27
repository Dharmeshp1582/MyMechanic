import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const token = useParams().token;
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/resetpassword", {
        token: token,
        password: data.password
      });
      console.log(res.data);

      if (res.status === 201) {
        toast.success("Password Reset successful! 🎉", {
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

        console.log("Password reset successful");
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

        console.log("password reset failed");
      }
    } catch (error) {
      console.error("password reset Error:", error);
      toast.error(
        error.response?.data?.message || "reset failed! Please try again. ❌",
        { position: "top-right" }
      );
    }
  };


  return (
    <>
     <ToastContainer />
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      height: "100vh", width: "100vw", backgroundColor: "#f5f6fa"
    }}>
      <div style={{
        background: "#fff", padding: "2rem", borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)", width: "350px", textAlign: "center"
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#2d3436" }}>Reset Password</h1>
        <p style={{ fontSize: "14px", color: "#636e72", marginBottom: "20px" }}>
          Enter a new password below to reset your account.
        </p>

        <form onSubmit={handleSubmit(submitHandler)} style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ textAlign: "left", marginBottom: "15px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "bold", color: "#2d3436", marginBottom: "5px" }}>
              New Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter new password"
              required
              style={{
                width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #dfe6e9",
                fontSize: "16px", outline: "none", transition: "border 0.3s ease"
              }}
            />
          </div>
          

          <button type="submit" style={{
            background: "#0984e3", color: "white", padding: "12px", border: "none",
            borderRadius: "6px", cursor: "pointer", fontSize: "16px", transition: "0.3s"
          }}>
            Reset Password
          </button>
        </form>

        <div style={{ marginTop: "20px", fontSize: "14px" }}>
          <p>If you did not request a password reset, please ignore this page.</p>
          <p>Need help? <a href="/contact" style={{ color: "#0984e3", textDecoration: "none", fontWeight: "bold" }}>Contact support</a></p>
        </div>
      </div>
    </div>
    </>
  );
};
