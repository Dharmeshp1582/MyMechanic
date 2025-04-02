import { useState } from "react";
import { GarageOwnerNavbar } from "./GarageOwnerNavbar";
import GarageLogo from "../../../src/assets/images/logo.webp";
import { Link, Outlet } from "react-router-dom";
import { Footer } from "../common/Footer";
import { FaPlusSquare, FaWarehouse, FaWrench } from "react-icons/fa";

export const GarageOwnerSidebar = () => {
  const [hover, setHover] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <GarageOwnerNavbar toggleSidebar={toggleSidebar} />
      <aside
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
                  to="addgarage2"
                  className="nav-link active"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <FaPlusSquare size={20} style={{ marginRight: "10px" }} />
                  <p>Add Garage</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="mygarages"
                  className="nav-link active"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <FaWarehouse size={20} style={{ marginRight: "10px" }} />
                  <p>View My Garages</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="addservice"
                  className="nav-link"
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <FaWrench size={20} style={{ marginRight: "10px" }} />
                  <p>Add Services</p>
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
