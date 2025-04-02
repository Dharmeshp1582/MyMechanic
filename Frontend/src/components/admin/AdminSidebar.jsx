import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AdminNavbar } from "./AdminNavbar";
import GarageLogo from "../../assets/images/logo.webp";
import { Footer } from "../common/Footer";

// Importing Different Icons
import { MdDashboard } from "react-icons/md"; // Dashboard Icon
import { AiOutlineOrderedList } from "react-icons/ai"; // Garage List Icon
import { RiUserSettingsLine } from "react-icons/ri"; // Manage Users Icon
import { TbLayoutDashboard } from "react-icons/tb"; // Dashboard v3 Icon
import { FiEdit } from "react-icons/fi"; // Theme Generate Icon
import { IoMdApps } from "react-icons/io"; // Widgets Icon

export const AdminSidebar = () => {
  const [hover, setHover] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <aside
        className={`app-sidebar shadow ${isSidebarOpen ? "open" : "d-none"}`}
        data-bs-theme="dark"
        style={{ backgroundColor: "black" }}
      >
        <div className="sidebar-brand">
          <Link
            to=""
            className="brand-link"
            style={{ fontFamily: "'Electrolize', sans-serif" }}
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
                  to="index3.html"
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
                  <p>Dashboard v3</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="generate/theme.html"
                  className="nav-link"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <FiEdit size={20} style={{ marginRight: "10px" }} />
                  <p>Theme Generate</p>
                </Link>
              </li>

              <li className="nav-item">
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
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="app-main" style={{ backgroundColor: "#87aac9" }}>
        <Outlet />
        <section style={{ marginTop: "50px" }}>
          <Footer />
        </section>
      </main>
    </>
  );
};
