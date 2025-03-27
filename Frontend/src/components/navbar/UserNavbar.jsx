import { Avatar, Button, Popover, Typography } from "@mui/material";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiLogout } from "react-icons/ci";
import { FaUser, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("role"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchUserData = async () => {
    const userId = localStorage.getItem("id");
    if (!userId) return;

    try {
      const response = await axios.get(`/getuserbyid/${userId}`);
      if (response.data && response.data.data) {
        setUser(response.data.data);
        setRole(response.data.data.roleId?.name || localStorage.getItem("role"));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Initial fetch
  
    const interval = setInterval(() => {
      fetchUserData(); // Fetch data every 3 seconds
    }, 2000);
  
    return () => clearInterval(interval); // Cleanup to prevent memory leaks
  }, []);
  

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!", { position: "top-right", autoClose: 2000, theme: "dark" });

    // Delay navigation to show toast before redirecting
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" transition={Bounce} />

      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link btn btn-light" onClick={toggleSidebar}>
                <img src={hamburgermenu} alt="Menu" style={{ height: "25px", width: "25px" }} />
              </button>
            </li>
            <li className="nav-item d-none d-md-block">
              <Link to="" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item d-none d-md-block">
              <Link to="contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <Avatar
              alt={user?.fullName || "User"}
              src={user?.imageURL || "/default-avatar.png"}
              onClick={handleClick}
              sx={{ cursor: "pointer", border: "2px solid black" }}
            />

            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              PaperProps={{
                style: {
                  padding: "15px",
                  minWidth: "250px",
                  borderRadius: "12px",
                  boxShadow: "0px 6px 15px rgba(0,0,0,0.2)"
                }
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Avatar
                  alt={user?.fullName || "User"}
                  src={user?.imageURL || "/default-avatar.png"}
                  style={{
                    width: "50px",
                    height: "50px",
                    margin: "10px auto",
                    border: "3px solid white",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)"
                  }}
                />

                <Typography style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px", color: "#333" }}>
                  {user?.fullName}
                </Typography>

                <Typography
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    color: "#666"
                  }}
                >
                  <FaUser size={14} />
                  {role || "No Role Assigned"}
                </Typography>

                <Link
                  to={`updateuser/:id`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    textDecoration: "none",
                    color: "#007bff",
                    fontSize: "14px",
                    margin: "10px 0",
                    transition: "0.3s"
                  }}
                >
                  <FaArrowRight size={12} />
                  View Profile
                </Link>

                <Button
                  onClick={handleLogout}
                  style={{
                    background: "black",
                    color: "white",
                    width: "100%",
                    padding: "8px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    textTransform: "none",
                    marginTop: "10px",
                    transition: "0.3s"
                  }}
                >
                  <CiLogout size={16} />
                  Logout
                </Button>
              </div>
            </Popover>
          </ul>
        </div>
      </nav>
    </>
  );
};
