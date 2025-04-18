import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
        height: "100vh",
        width: "100vw",
        backgroundColor: "#cce5ff",
        overflow: "hidden"
      }}
    >
      <header
        className="header_section"
        style={{ backgroundColor: "rgb(18 23 105)", padding: "0" }}
      >
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container ">
            <Link className="navbar-brand" to="/">
              <span className="bg-orange-400">My Mechanic</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="s-1"> </span>
              <span className="s-2"> </span>
              <span className="s-3"> </span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
                <ul className="navbar-nav  ">
                  <li className="nav-item active">
                    <Link className="nav-link landing-head-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link landing-head-link" to="/about">
                      {" "}
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link landing-head-link" to="/services">
                      {" "}
                      Services{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link landing-head-link"
                      to="/contactus"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className="quote_btn-container "
                style={{ marginBottom: "7px" }}
              >
                <div className="">
                  <Link to="/login" className="btn-1 ">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-2"
                    style={{ color: "black" }}
                  >
                    Signup
                  </Link>
                </div>
                <form className="form-inline">
                  <button
                    className="btn  my-2 my-sm-0 nav_search-btn"
                    type="submit"
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "16px"
        }}
      >
        <ToastContainer />
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            padding: "12px 24px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            width: "350px"
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "0.6rem" }}>
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            {[
              { name: "fullName", type: "text", label: "Full Name" },
              { name: "email", type: "email", label: "Email" },
              { name: "password", type: "password", label: "Password" },
              { name: "contact", type: "text", label: "Contact" }
            ].map(({ name, type, label }, index) => (
              <div key={index} style={{ marginBottom: "8px" }}>
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    fontSize: "14px"
                  }}
                >
                  {label}:
                </label>
                <input
                  type={type}
                  {...register(name, {
                    required: `${label} is required`,
                    minLength:
                      name === "password"
                        ? { value: 6, message: "Minimum 6 characters" }
                        : undefined,
                    pattern:
                      name === "contact"
                        ? {
                            value: /[6-9]{1}[0-9]{9}/,
                            message: "Invalid contact number"
                          }
                        : undefined
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
                <span style={{ color: "red", fontSize: "12px" }}>
                  {errors[name]?.message}
                </span>
              </div>
            ))}

            <div style={{ marginBottom: "8px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                Your Role:
              </label>
              {/* <select
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
            </select> */}
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
                {roles
                  .filter((role) => role.name.toLowerCase() !== "admin")
                  .map((role) => (
                    <option key={role._id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
              </select>

              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.role?.message}
              </span>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", fontWeight: "bold" }}>
                Profile Picture:
              </label>
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
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors.image?.message}
              </span>
            </div>

            <div style={{ textAlign: "left" }}>
              <label>Status:</label>
              <input
                type="checkbox"
                {...register("status")}
                value="true"
                style={{ marginLeft: "10px" }}
              />
              <span style={{ marginLeft: "5px" }}>Active</span>
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
            <NavLink
              to="/login"
              style={{ color: "#0984e3", textDecoration: "none" }}
            >
              Login now
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
