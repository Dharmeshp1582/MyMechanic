import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const UserDashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getServices = async () => {
    try {
      const serviceRes = await axios.get("/service/services");
      setServices(serviceRes.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
    <div className="bg-gray-100 min-h-screen">
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: "#f9fafb"
        }}
      >
        {/* Hero Section */}
        <div>
          <section
            style={{
              background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
              color: "white",
              padding: "80px 20px",
              textAlign: "center"
            }}
          >
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "10px"
              }}
            >
              Welcome to MyMechanic
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                maxWidth: "700px",
                margin: "0 auto",
                opacity: "0.9"
              }}
            >
              Your one-stop solution for all vehicle maintenance and repair
              needs.
            </p>
          </section>
        </div>
      </div>

      {/* Services Section */}

      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "30px",
            color: "#222",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
        >
          Our Services
        </h2>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#007BFF"
            }}
          >
            Loading...
          </div>
        ) : services.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#777" }}>
            No services available at the moment.
          </p>
        ) : (
          services.map((service) => (
            <div
              key={service._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                padding: "25px",
                margin: "20px 0",
                borderRadius: "12px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                transition: "0.3s ease-in-out",
                background: "#fff"
              }}
            >
              <div style={{ flex: 1, paddingRight: "25px" }}>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "10px"
                  }}
                >
                  {service.name}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#555",
                    marginBottom: "15px",
                    lineHeight: "1.6"
                  }}
                >
                  {service.description}
                </p>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "8px"
                  }}
                >
                  <span>Price: </span>
                  <span style={{ color: "#007BFF", fontWeight: "bold" }}>
                    ₹{service.price || "N/A"}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "8px"
                  }}
                >
                  <span>Category: </span>
                  <span style={{ color: "#777" }}>
                    {service.category || "N/A"}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "8px"
                  }}
                >
                  <span>Duration: </span>
                  <span style={{ color: "#777" }}>
                    {service.duration || "N/A"} mins
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "8px"
                  }}
                >
                  <span>Ratings: </span>
                  <span style={{ color: "#FFD700", fontWeight: "bold" }}>
                    ⭐ {service.ratings || "N/A"}/5
                  </span>
                </div>
                <p
                  style={{ fontSize: "14px", color: "#777", marginTop: "15px" }}
                >
                  Last updated{" "}
                  {new Date(service.updatedAt).toLocaleDateString()}
                </p>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Link to="viewdetail"
                    style={{
                      padding: "14px 28px",
                      fontSize: "16px",
                      backgroundColor: "#007BFF",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "0.3s ease-in-out",
                      fontWeight: "bold"
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#0056b3")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#007BFF")
                    }
                  >
                    View Details
                  </Link>
                </div>
              </div>
              <div>
              <img
                src={service.imageURL || "/default-service.jpg"}
                alt={service.name}
                style={{
                  width: "350px",
                  height: "280px",
                  marginBottom:"0 px",
                  objectFit: "cover",
                  border:"2px solid black",
                  borderRadius: "12px",
                  marginLeft: "20px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                }}
              />
              </div>
            </div>
          ))
        )}
      </div>
        
      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book an appointment today and experience our top-quality automotive services.
          </p>
          <Link to="/user/booking" className="btn bg-white text-secondary hover:bg-gray-100 inline-block" style={{marginBottom:"10px"}}>
            Book Appointment Now
          </Link>
        </div>
      </section>
    </div>
    </>
  );
};
