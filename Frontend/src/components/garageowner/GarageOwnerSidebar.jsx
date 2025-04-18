import { useEffect, useRef, useState } from "react";
import { GarageOwnerNavbar } from "./GarageOwnerNavbar";
import GarageLogo from "../../../src/assets/images/logo.webp";
import { Link, NavLink, Outlet } from "react-router-dom";

import { FaPlusSquare, FaWarehouse, FaWrench } from "react-icons/fa";
import { GarageFooter } from "../common/GarageFooter";

export const GarageOwnerSidebar = () => {
  const [hover, setHover] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef();

  const toggleSidebar = () => {
    if (window.innerWidth <= 1000) {
      setSidebarOpen((prev) => !prev); // Toggle on small screens
    } else {
      setSidebarOpen((prev) => !prev); // Toggle on large too
    }
  };

  // Close sidebar on window resize if width <= 1000
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside on small screen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        window.innerWidth <= 1000 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <>
      <GarageOwnerNavbar toggleSidebar={toggleSidebar} />

      <aside
        ref={sidebarRef}
        className={`app-sidebar shadow ${isSidebarOpen ? "open" : "d-none"}`}
        data-bs-theme="dark"
        style={{ backgroundColor: "black" }}
      >
        <div className="sidebar-brand">
          <Link
            to=""
            className="brand-link"
            style={{ fontFamily: "'Great Vibes', sans-serif" }}
          >
            <img
              src={GarageLogo}
              className="brand-image opacity-75 shadow"
              style={{
                borderRadius: "60px",
                transform: hover ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s ease-in-out"
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />
            <span className="brand-text fw-light">My Mechanic</span>
          </Link>
        </div>

        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8
          }}
        >
          <nav className="mt-2">
            <ul className="nav sidebar-menu flex-column" role="menu">
              <NavLink
                to="addgarage2"
                className="nav-link"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(48 75 196)" : "white",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "5px"
                })}
              >
                <FaPlusSquare size={20} style={{ marginRight: "10px" }} />
                <p>Add Garage</p>
              </NavLink>

              <NavLink
                to="mygarages"
                className="nav-link"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(48 75 196)" : "white",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "5px"
                })}
              >
                <FaWarehouse size={20} style={{ marginRight: "10px" }} />
                <p>View My Garages</p>
              </NavLink>

              <NavLink
                to="addservice"
                className="nav-link"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(48 75 196)" : "white",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "5px"
                })}
              >
                <FaWrench size={20} style={{ marginRight: "10px" }} />
                <p>Add Services</p>
              </NavLink>

              <NavLink
                to="garageservices"
                className="nav-link"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(48 75 196)" : "white",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "5px"
                })}
              >
                <span style={{fontSize:"20px"}}>🛠️</span>
                <p>Garage Services</p>
              </NavLink>
              {/* <NavLink
                to="deleteservice/${serviceId}"
                className="nav-link"
                style={({ isActive }) => ({
                  color: isActive ? "rgb(48 75 196)" : "white",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "5px"
                })}
              >
                <FaPlusSquare size={20} style={{ marginRight: "10px" }} />
                <p>Manage Services</p>
              </NavLink> */}
            </ul>
          </nav>
        </div>
      </aside>

      <main
        className="app-main"
        style={{ paddingBottom: "0" }}
      >
        <Outlet />
      <GarageFooter/>
      </main>
    </>
  );
};
