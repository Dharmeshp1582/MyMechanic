import { Avatar, Button, Popover, Typography } from "@mui/material";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiLogout } from "react-icons/ci";
import { FaUser, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const GarageOwnerNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("role")); // Get role from localStorage initially
  const [focusedLink, setFocusedLink] = useState(null);

  const getLinkStyle = (linkName) => ({
    fontSize: "19px",
    fontWeight: "700",
    ...(focusedLink === linkName && {
      color: "rgb(48 75 196)",
      borderRadius: "30px"
    })
  });

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
        setRole(
          response.data.data.roleId?.name || localStorage.getItem("role")
        ); // Use API role if available, otherwise fallback to localStorage
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Initial fetch

    const interval = setInterval(() => {
      fetchUserData(); // Fetch data every 3 seconds
    }, 3000);

    return () => clearInterval(interval); // Cleanup to prevent memory leaks
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark"
    });

    // Delay navigation to show toast before redirecting
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <nav className="app-header navbar navbar-expand bg-body">
      {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        transition={Bounce}
      /> */}
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link btn btn-light" onClick={toggleSidebar}>
              <img
                src={hamburgermenu}
                alt="Menu"
                style={{ height: "25px", width: "25px" }}
              />
            </button>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link
              to=""
              className="nav-link"
              style={getLinkStyle("home")}
              onFocus={() => setFocusedLink("home")}
              onBlur={() => setFocusedLink(null)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link
              to="contact"
              className="nav-link"
              style={getLinkStyle("contact")}
              onFocus={() => setFocusedLink("contact")}
              onBlur={() => setFocusedLink(null)}
            >
              Contact
            </Link>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link
              to="availableservice"
              className="nav-link"
              style={getLinkStyle("services")}
              onFocus={() => setFocusedLink("services")}
              onBlur={() => setFocusedLink(null)}
            >
              Services
            </Link>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link
              to="servicerequest"
              className="nav-link"
              style={getLinkStyle("request")}
              onFocus={() => setFocusedLink("request")}
              onBlur={() => setFocusedLink(null)}
            >
              requests
            </Link>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link
              to="earning"
              className="nav-link"
              style={getLinkStyle("earning")}
              onFocus={() => setFocusedLink("earning")}
              onBlur={() => setFocusedLink(null)}
            >
              Earning
            </Link>
          </li>
        </ul>

        <ul
          className="navbar-nav"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          {/* Avatar (Click to Open Popover) */}
          <Avatar
            alt={user?.fullName || "User"}
            src={user?.imageURL || "/default-avatar.png"}
            onClick={handleClick}
            sx={{ cursor: "pointer", border: "2px solid black" }}
          />

          {/* Popover */}
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
              {/* Profile Avatar inside Popover */}
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

              {/* User Name */}
              <Typography
                style={{
                    display: "inline-block",
                    maxWidth: "25ch",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontWeight: "bold",
                    textTransform: "uppercase"
                }}
              >
                {user?.fullName}
              </Typography>

              {/* Role */}
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

              {/* Profile Link */}
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

              {/* Logout Button */}
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
  );
};
