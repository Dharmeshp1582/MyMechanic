import { useEffect, useRef, useState } from "react";
import { UserNavbar } from "./UserNavbar";
import GarageLogo from "../../../src/assets/images/logo.webp";
import { Link, Outlet } from "react-router-dom";
import { Footer } from "../common/Footer";
import { FaRegSquareCaretDown } from "react-icons/fa6";
import {  FaCar, FaTachometerAlt, FaWrench } from "react-icons/fa";
import { PiGarage } from "react-icons/pi";

export const UserSidebar = () => {
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
      <UserNavbar toggleSidebar={toggleSidebar} />

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
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <Link
                  to=""
                  className="nav-link active"
                  style={{ color: "white" }}
                >
                  <i className="nav-icon bi bi-speedometer" />
                  <FaTachometerAlt size={20} style={{ marginRight: "10px" }} />
                  <p>User dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="services"
                  className="nav-link"
                  style={{ color: "white" }}
                >
                  <i className="bi bi-tools"></i>
                  <FaWrench size={20} style={{ marginRight: "10px" }} />
                  <p>Our Services</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="addvehicle"
                  className="nav-link"
                  style={{ color: "white" }}
                >
                  <i className="bi bi-tools"></i>
                  <FaCar size={20} style={{ marginRight: "10px" }} />
                  <p>Add Vehicle</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="getvehiclebyuserid"
                  className="nav-link"
                  style={{ color: "white" }}
                >
                  <i className="bi bi-tools"></i>
                  <FaRegSquareCaretDown size={20} style={{ marginRight: "10px" }} />
                  <p>My Vehicle</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="garages"
                  className="nav-link"
                  style={{ color: "white" }}
                >
                  <i className="bi bi-tools"></i>
                  
                  <PiGarage
                    size={20}
                    style={{ marginRight: "10px" }}
                  />
                  <p>Garages</p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link href="" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <FaBox size={20} style={{ marginRight: "10px" }} />
                  <p>Widgets</p>
                </Link>
                <ul className="nav nav-treeview">
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
                </ul>
              </li> */}
            </ul>
          </nav>
        </div>
      </aside>

      <main
        className="app-main"
        style={{ paddingBottom: "0"}}
      >
        <Outlet />
        <Footer />
      </main>
    </>
  );
};


