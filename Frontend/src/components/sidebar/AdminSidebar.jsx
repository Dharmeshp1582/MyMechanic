import  { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AdminNavbar } from "../navbar/AdminNavbar";
import GarageLogo from "../../assets/images/logo.webp";
// import { Footer } from './Footer';

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
          <Link to="" className="brand-link" style={{ fontFamily: "'Electrolize', sans-serif" }}>
            <img
              src={GarageLogo}
              className="brand-image opacity-75 shadow"
              style={{
                borderRadius: "60px",
                transform: hover ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s ease-in-out",
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
            padding: 8,
          }}
        >
          <nav className="mt-2">
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <Link to="" className="nav-link active" style={{ color: "white" }}>
                  <i className="nav-icon bi bi-speedometer" />
                  <p>Dashboard</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="garagelist" className="nav-link active" style={{ color: "white" }}>
                  <i className="fa-solid fa-list-check"></i>
                  <p>GarageList</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="manage" className="nav-link" style={{ color: "white" }}>
                  <i className="bi bi-tools"></i>
                  <p>Manage Users</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="index3.html" className="nav-link" style={{ color: "white" }}>
                  <i className="nav-icon bi bi-circle" />
                  <p>Dashboard v3</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="generate/theme.html" className="nav-link" style={{ color: "white" }}>
                  <i className="nav-icon bi bi-palette" />
                  <p>Theme Generate</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="#" className="nav-link" style={{ color: "white" }}>
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>Widgets</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="app-main">
        <Outlet />
        {/* <Footer /> */}
      </main>
    </>
  );
};
