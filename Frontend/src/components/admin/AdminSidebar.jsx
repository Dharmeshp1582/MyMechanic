import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AdminNavbar } from "./AdminNavbar";
import GarageLogo from "../../assets/images/logo.webp";

// Importing Different Icons
import { MdDashboard } from "react-icons/md"; // Dashboard Icon
import { AiOutlineOrderedList } from "react-icons/ai"; // Garage List Icon
import { RiUserSettingsLine } from "react-icons/ri"; // Manage Users Icon
import { TbLayoutDashboard } from "react-icons/tb"; // Dashboard v3 Icon
import { FiEdit } from "react-icons/fi"; // Theme Generate Icon
import { IoMdApps } from "react-icons/io"; // Widgets Icon
import { GarageFooter } from "../common/GarageFooter";

export const AdminSidebar = () => {
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
      <AdminNavbar toggleSidebar={toggleSidebar} />

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
              <li className="nav-item menu-open">
                <Link
                  to=""
                  className="nav-link active"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <MdDashboard size={20} style={{ marginRight: "10px" }} />
                  <p>Dashboard</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="garagelist"
                  className="nav-link active"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <AiOutlineOrderedList
                    size={20}
                    style={{ marginRight: "10px" }}
                  />
                  <p>Garage List</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="manage"
                  className="nav-link"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <RiUserSettingsLine
                    size={20}
                    style={{ marginRight: "10px" }}
                  />
                  <p>Manage Users</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="appointment"
                  className="nav-link"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <TbLayoutDashboard
                    size={20}
                    style={{ marginRight: "10px" }}
                  />
                  <p>Appointments Data</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="addstate"
                  className="nav-link"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <FiEdit size={20} style={{ marginRight: "10px" }} />
                  <p>Add Location</p>
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link
                  to="#"
                  className="nav-link"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <IoMdApps size={20} style={{ marginRight: "10px" }} />
                  <p>Widgets</p>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </aside>

      <main
        className="app-main"
        style={{ backgroundColor: "#87aac9", paddingBottom: "0" }}
      >
        <Outlet />
        <GarageFooter />
      </main>
    </>
  );
};
