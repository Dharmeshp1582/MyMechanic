// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export const Services = () => {
//   const [availableServices, setAvailableServices] = useState([]);
//   const [error, setError] = useState("");
//   const [fullScreenImage, setFullScreenImage] = useState(null);

//   useEffect(() => {
//     axios
//       .get("/service/services")
//       .then((response) => {
//         setAvailableServices(response.data.data);
//       })
//       .catch(() => {
//         setError("Failed to fetch available services");
//       });
//   }, []);

//   return (
//     <div
//       style={{
//         padding: "20px",
//         fontFamily: "Arial, sans-serif",
//         backgroundColor: "rgb(135, 170, 201)",
//         minHeight: "100vh"
//       }}
//     >
//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

//       <h2
//         style={{
//           textAlign: "center",
//           marginBottom: "20px",
//           fontSize: "2rem",
//           color: "#333"
//         }}
//       >
//         Services
//       </h2>

//       {availableServices.length === 0 ? (
//         <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
//           No services available.
//         </p>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//             gap: "20px",
//             padding: "20px"
//           }}
//         >
//           {availableServices.map((service) => (
//             <div
//               key={service._id}
//               style={{
//                 borderRadius: "10px",
//                 border: "1px solid #ddd",
//                 overflow: "hidden",
//                 boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//                 backgroundColor: "rgb(211, 221, 228)",
//                 transition:
//                   "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 padding: "15px"
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = "scale(1.05)";
//                 e.currentTarget.style.boxShadow =
//                   "0px 6px 18px rgba(0, 0, 0, 0.2)";
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "scale(1)";
//                 e.currentTarget.style.boxShadow =
//                   "0px 4px 12px rgba(0, 0, 0, 0.1)";
//               }}
//             >
//               {service.imageURL && (
//                 <img
//                   src={service.imageURL}
//                   alt={service.name}
//                   style={{
//                     width: "100%",
//                     height: "200px",
//                     objectFit: "cover",
//                     borderRadius: "8px",
//                     border:"2px solid black",
//                     cursor: "pointer"
//                   }}
//                   onClick={() => setFullScreenImage(service.imageURL)}
//                 />
//               )}

//               <div style={{ width: "100%", padding: "10px" }}>
//                 <h3
//                   style={{
//                     fontSize: "1.3rem",
//                     color: "#333",
//                     marginBottom: "5px"
//                   }}
//                 >
//                   {service.name}
//                 </h3>
//                 <p style={{ color: "#666", fontSize: "0.9rem" }}>
//                   {service.description}
//                 </p>
//                 <p style={{ fontWeight: "bold", color: "#444" }}>
//                   <strong>Category:</strong> {service.category}
//                 </p>
//                 <p style={{ fontWeight: "bold", color: "#444" }}>
//                   <strong>Price:</strong> ₹{service.price}
//                 </p>
//                 <p style={{ fontWeight: "bold", color: "#444" }}>
//                   <strong>Duration:</strong> {service.duration} mins
//                 </p>
//                 <p style={{ fontWeight: "bold" }}>
//                   <strong>Availability:</strong>
//                   <span
//                     style={{
//                       color: service.availability ? "green" : "red",
//                       fontWeight: "bold"
//                     }}
//                   >
//                     {service.availability ? "Available" : "Not Available"}
//                   </span>
//                 </p>
//                 <p style={{ fontWeight: "bold", color: "#444" }}>
//                   <strong>Ratings:</strong> ⭐ {service.ratings}/5
//                 </p>

//                 <Link
//                   to="/user/booking"
//                   style={{
//                     marginTop: "12px",
//                     padding: "10px 15px",
//                     border: "none",
//                     borderRadius: "5px",
//                     backgroundColor: "rgb(47, 121, 201)",
//                     color: "#fff",
//                     fontSize: "1rem",
//                     fontWeight: "bold",
//                     cursor: "pointer",
//                     textDecoration: "none",
//                     display: "block",
//                     textAlign: "center",
//                     transition: "background 0.3s"
//                   }}
//                 >
//                   Book Now
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {fullScreenImage && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.8)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000
//           }}
//           onClick={() => setFullScreenImage(null)}
//         >
//           <img
//             src={fullScreenImage}
//             alt="Full Screen"
//             style={{
//               width: "80%",
//               height: "80%",
//               objectFit: "contain",
//               borderRadius: "10px",
//               boxShadow: "0px 6px 15px rgba(255,255,255,0.2)"
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

//--> new one

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import "../../assets/css/services.css";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Services = () => {
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // 🟡 Get selected vehicle from previous page
  const { selectedVehicle } = location.state || {};

  useEffect(() => {
    axios
      .get("/service/services")
      .then((response) => {
        setAvailableServices(response.data.data);
      })
      .catch((err) => {
        setError("Failed to fetch available services", err);
      });
  }, []);

  const handleSelectService = (service) => {
    const alreadySelected = selectedServices.find((s) => s._id === service._id);
    if (alreadySelected) {
      // If already selected, remove it
      setSelectedServices(
        selectedServices.filter((s) => s._id !== service._id)
      );
    } else {
      // Add service to selection
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleBookAppointment = () => {
    if (!selectedVehicle) {
      toast.warn("First Select Vehicle! Then select services", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        onClose: () => navigate("/user/getvehiclebyuserid")
      });
      return;
    }
    if (selectedServices.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    navigate("/user/booking", {
      state: {
        selectedVehicle,
        selectedServices
      }
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#dce1f5",
          minHeight: "100vh"
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}

        <h2
          style={{
            marginBottom: "20px",
            fontSize: "1.8rem",
            padding: "10px 16px",
            color: "#333",
            background: "#f0f0f0",
            borderLeft: "5px solid rgb(18, 20, 18)",
            borderRight: "5px solid rgb(18, 20, 18)",
            borderRadius: "8px",
            fontWeight: "600",
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
            letterSpacing: "1px",
            textTransform: "capitalize"
          }}
        >
          COMMON SERVICES
        </h2>

        {availableServices.length === 0 ? (
          <p style={{ fontSize: "1.2rem", color: "#666" }}>
            No services available.
          </p>
        ) : (
          <div style={{ padding: "20px" }}>
            {availableServices.map((service, index) => {
              const isSelected = selectedServices.find(
                (s) => s._id === service._id
              );

              return (
                <div
                  key={service._id}
                  style={{
                    overflow: "hidden",
                    textAlign: "center",
                    transition: "transform 0.2s ease-in-out",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    padding: "20px",
                    flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                    backgroundColor: isSelected ? "rgb(170 209 255)" : "", // Highlight selected
                    borderRadius: "10px",
                    marginBottom: "10px"
                  }}
                >
                  {service.imageURL && (
                    <div className="service-img-container">
                      <img
                        src={service.imageURL}
                        alt={service.name}
                        className="ser-img"
                        style={{
                          maxWidth: "100%",
                          width: "300px",
                          height: "280px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "2px solid black",
                          cursor: "pointer"
                        }}
                      />
                    </div>
                  )}

                  <div style={{ padding: "15px", textAlign: "left" }}>
                    <h3 className="serv-h3">{service.name}</h3>

                    <div style={{ marginLeft: "50px" }}>
                      <p
                        style={{
                          color: "#666",
                          fontSize: "1rem",
                          width: "18.6rem",
                          margin: "auto"
                        }}
                      >
                        {service.description}
                      </p>
                      <p>
                        <strong>Category:</strong> {service.category}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{service.price}
                      </p>
                      <p>
                        <strong>Duration:</strong> {service.duration} mins
                      </p>
                      <p>
                        <strong>Availability:</strong>{" "}
                        <span
                          style={{
                            color: service.availability ? "green" : "red",
                            fontWeight: "bold"
                          }}
                        >
                          {service.availability ? "Available" : "Not Available"}
                        </span>
                      </p>
                      <p>
                        <strong>Ratings:</strong> ⭐ {service.ratings}/5
                      </p>
                    </div>

                    <button
                      className="serv-btn serv-book-btn"
                      onClick={() => handleSelectService(service)}
                    >
                      {isSelected ? "Remove" : "Select"} Service
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedServices.length > 0 && (
          <button
            className="serv-btn"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "1rem",
              backgroundColor: "#114d78",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
            onClick={handleBookAppointment}
          >
            Book Appointment ({selectedServices.length})
          </button>
        )}
      </div>
    </>
  );
};
