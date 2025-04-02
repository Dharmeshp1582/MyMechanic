import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("fullName", res.data.data.fullName);
        localStorage.setItem("role", res.data.data.roleId.name);

        toast.success(`Welcome Back! ${res.data.data.fullName} 🎉`, {
          position: "top-right",
          onClose: () => {
            if (res.data.data.roleId.name === "User") {
              navigate("/user");
            } else if (res.data.data.roleId.name === "Garage owner") {
              navigate("/garageowner");
            } else if (res.data.data.roleId.name === "Admin") {
              navigate("/admin");
            }
          },
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
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed!", {
        position: "top-right"
      });
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
       backgroundColor:"#cce5ff"
      }}
    >
      <div
        style={{
          background: "#eff5f5",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          width: "350px"
        }}
      >
        <form
          onSubmit={handleSubmit(submitHandler)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h2
            style={{ marginBottom: "20px", color: "#2d3436", textAlign: "center" }}
          >
            Login
          </h2>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #636e72",
                borderRadius: "5px",
                background: "#dfe6e9"
              }}
            />
            <span>{errors.email?.message}</span>
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #636e72",
                borderRadius: "5px",
                background: "#dfe6e9"
              }}
            />
            <span>{errors.password?.message}</span>
          </div>
          <button
            type="submit"
            style={{
              background: "#2d3436",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.3s"
            }}
          >
            Login
          </button>
        </form>
        <p style={{marginTop:"10px"}}>
          Didn&apos;t have an account?{" "}
          <NavLink
            to="/signup"
            style={{
              display: "inline-block",
              marginTop: "10px",
              color: "#0984e3",
              textDecoration: "none"
            }}
          >
            Signup now
          </NavLink>
        </p>
        <NavLink to="/forgetpassword" style={{
              display: "inline-block",
              marginTop: "10px",
              color: "#0984e3",
              textAlign:"right",
              textDecoration: "none"}}>Forget password?</NavLink>
      </div>
      <ToastContainer />
    </div>
  );
};
