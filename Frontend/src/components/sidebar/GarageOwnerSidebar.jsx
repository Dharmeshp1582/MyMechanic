import { useState } from "react";
import { GarageOwnerNavbar } from "../navbar/GarageOwnerNavbar";
import GarageLogo from "../../../src/assets/images/logo.webp"
import { Link, Outlet } from "react-router-dom";
// import { Footer } from "./Footer";

export const GarageOwnerSidebar = () => {
  const [hover, setHover] = useState(false);
  //for closing sidebar...
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <GarageOwnerNavbar toggleSidebar={toggleSidebar} />
      <aside
        className={`app-sidebar shadow ${isSidebarOpen ? "open" : "d-none"
          }`}
        data-bs-theme="dark"
        style={{ backgroundColor: "black" }}
      >
        <div className="sidebar-brand">
          <Link to="" className="brand-link" style={{ fontFamily: "'Great Vibes', sans-serif" }}>
            <img
              src={GarageLogo}
              className="brand-image opacity-75 shadow"
              style={{
                borderRadius: "60px", transform: hover ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s ease-in-out"
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />

            <span className="brand-text fw-light">E-Garage</span>
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
                <Link to="addgarage" className="nav-link active" style={{ color: "white" }}>
                  <i className="bi bi-house-add"></i>
                  <p>
                    AddGarage
                  </p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="mygarages" className="nav-link active" style={{ color: "white" }}>
                  <i className="bi bi-car-front"></i>
                  <p>
                    View My Garages
                    {/* <i className="nav-arrow bi bi-chevron-right" /> */}
                  </p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="addservice" className="nav-link" style={{ color: "white" }}>
                  <i className="bi bi-tools"></i>
                  <p>
                    Add Services
                  </p>
                </Link>
              </li>

              {/* 
              <li className="nav-item">
                <a href="./widgets/small-box.html" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>Small Box</p>
                </a>
              </li>

              <li className="nav-item">
                <a href="./widgets/info-box.html" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>info Box</p>
                </a>
              </li>

              <li className="nav-item">
                <a href="./widgets/cards.html" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>Cards</p>
                </a>
              </li> 
              */}

            </ul>
          </nav>
        </div>
      </aside>
      <main className="app-main">
        <Outlet></Outlet>
        {/* <Footer></Footer> */}
      </main>
    </>
  );
};