// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, Bounce, toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";

// export const ViewGarageDetail = () => {
//   const id = useParams().id;
//   const navigate = useNavigate();

//   const [garage, setGarage] = useState(null);
//   const [services, setServices] = useState([]);
//   const [selectedServices, setSelectedServices] = useState([]);

//   const getGarageDetails = async () => {
//     try {
//       const res = await axios.get("/garage/getgaragebyid/" + id);
//       setGarage(res.data.data);
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to load garage details", {
//         position: "top-center",
//         autoClose: 2000,
//         theme: "dark",
//         transition: Bounce,
//       });
//     }
//   };

//   const getGarageServices = async () => {
//     try {
//       const res = await axios.get("/service/getservicesbygarageid/" + id);
//       setServices(res.data.data || []);
//     } catch (error) {
//       console.log(error);

//     }
//   };

//   useEffect(() => {
//     getGarageDetails();
//     getGarageServices();
//   }, [id]);

//   const toggleServiceSelection = (service) => {
//     const alreadySelected = selectedServices.some((s) => s._id === service._id);
//     if (alreadySelected) {
//       setSelectedServices((prev) => prev.filter((s) => s._id !== service._id));
//     } else {
//       setSelectedServices((prev) => [...prev, service]);
//     }
//   };

//   const handleBookAppointment = () => {
//     if (selectedServices.length === 0) {
//       toast.warning("Please select at least one service.", {
//         position: "top-center",
//         autoClose: 2000,
//         theme: "dark",
//         transition: Bounce,
//       });
//       return;
//     }
//     navigate("/user/booking", {
//       state: {
//         garage,
//         selectedServices,
//       },
//     });
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={2000} theme="dark" transition={Bounce} />

//       <div style={{ padding: "40px", backgroundColor: "#dbe4ec", minHeight: "100vh" }}>
//         <div
//           style={{
//             maxWidth: "1100px",
//             margin: "0 auto",
//             backgroundColor: "#fff",
//             padding: "30px",
//             borderRadius: "12px",
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <button
//             onClick={() => navigate(-1)}
//             style={{
//               background: "none",
//               border: "none",
//               color: "#1976d2",
//               fontSize: "16px",
//               cursor: "pointer",
//               marginBottom: "20px",
//             }}
//           >
//             ← Go Back
//           </button>

//           {/* Garage Info Section */}
//           <div
//             style={{
//               backgroundColor: "#f5faff",
//               padding: "20px",
//               borderRadius: "10px",
//               border: "1px solid #c5dff8",
//               marginBottom: "40px",
//             }}
//           >
//             <div
//               style={{
//                 backgroundColor: "#5993d5",
//                 color: "#fff",
//                 padding: "12px",
//                 borderRadius: "8px",
//                 marginBottom: "20px",
//                 fontSize: "18px",
//                 fontWeight: "bold",
//                 textAlign: "center",
//               }}
//             >
//               🛠️ Garage Details
//             </div>

//             {garage ? (
//               <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
//                 {garage.imageURL && (
//                   <img
//                     src={garage.imageURL}
//                     alt="Garage"
//                     style={{
//                       width: "300px",
//                       height: "200px",
//                       objectFit: "cover",
//                       borderRadius: "10px",
//                       border: "2px solid black",
//                     }}
//                   />
//                 )}
//                 <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "12px" }}>
//                   <div style={{ width: "48%" }}><strong>Name:</strong> {garage.name}</div>
//                   <div style={{ width: "48%" }}><strong>Owner:</strong> {garage.owner}</div>
//                   <div style={{ width: "48%" }}><strong>Phone:</strong> {garage.phoneno}</div>
//                   <div style={{ width: "48%" }}><strong>Email:</strong> {garage.email}</div>
//                   <div style={{ width: "48%" }}><strong>State:</strong> {garage.stateId?.name}</div>
//                   <div style={{ width: "48%" }}><strong>City:</strong> {garage.cityId?.cityName}</div>
//                   <div style={{ width: "48%" }}><strong>Area:</strong> {garage.areaId?.name}</div>
//                   <div style={{ width: "48%" }}><strong>Opening Hours:</strong> {garage.openingHours}</div>
//                   <div style={{ width: "48%" }}><strong>Latitude:</strong> {garage.latitude}</div>
//                   <div style={{ width: "48%" }}><strong>Longitude:</strong> {garage.longitude}</div>
//                 </div>
//               </div>
//             ) : (
//               <p>Loading...</p>
//             )}
//           </div>

//           {/* Service Info Section */}
//           <div
//             style={{
//               backgroundColor: "#fff8f0",
//               padding: "20px",
//               borderRadius: "10px",
//               border: "1px solid #f7cba0",
//             }}
//           >
//             <h3
//               style={{
//                 marginBottom: "20px",
//                 color: "#b05f00",
//                 fontSize: "20px",
//                 fontWeight: "bold",
//                 textAlign: "center",
//               }}
//             >
//               🧰 Services Offered by this Garage
//             </h3>

//             {services.length === 0 ? (
//               <p>No services found for this garage.</p>
//             ) : (
//               <>
//                 <div
//                   style={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: "20px",
//                     justifyContent: "flex-start",
//                   }}
//                 >
//                   {services.map((service) => {
//                     const isSelected = selectedServices.some(s => s._id === service._id);
//                     return (
//                       <div
//                         key={service._id}
//                         style={{
//                           width: "318px",
//                           border: isSelected ? "2px solid #4caf50" : "1px solid #ccc",
//                           borderRadius: "10px",
//                           backgroundColor: isSelected ? "#e8f5e9" : "#f9f9f9",
//                           padding: "15px",
//                           cursor: "pointer",
//                           transition: "0.3s ease",
//                         }}
//                       >
//                         {service.imageURL && (
//                           <img
//                             src={service.imageURL}
//                             alt={service.name}
//                             style={{
//                               width: "100%",
//                               height: "140px",
//                               objectFit: "cover",
//                               borderRadius: "8px",
//                               marginBottom: "10px",
//                             }}
//                           />
//                         )}
//                         <h4 style={{ margin: "8px 0", color: "#333" }}>{service.name}</h4>
//                         <p><strong>Price:</strong> ₹{service.price}</p>
//                         <p><strong>Category:</strong> {service.category}</p>
//                         <p><strong>Duration:</strong> {service.duration} mins</p>
//                         <p><strong>Rating:</strong> ⭐ {service.ratings}</p>
//                         <p><strong>Available:</strong> {service.availability ? "Yes" : "No"}</p>
//                         <button
//                           onClick={() => toggleServiceSelection(service)}
//                           style={{
//                             marginTop: "10px",
//                             padding: "8px 12px",
//                             backgroundColor: isSelected ? "#e53935" : "#1976d2",
//                             color: "#fff",
//                             border: "none",
//                             borderRadius: "6px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           {isSelected ? "Remove" : "Select"} Service
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {selectedServices.length > 0 && (
//                   <div style={{ marginTop: "30px", textAlign: "center" }}>
//                     <button
//                       onClick={handleBookAppointment}
//                       style={{
//                         padding: "14px 30px",
//                         backgroundColor: "#1976d2",
//                         color: "#fff",
//                         fontWeight: "bold",
//                         border: "none",
//                         borderRadius: "8px",
//                         fontSize: "16px",
//                         cursor: "pointer",
//                         transition: "0.2s ease-in-out",
//                       }}
//                     >
//                       Book Appointment ({selectedServices.length} selected)
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// import { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { Bounce, toast, ToastContainer } from "react-toastify";
// import { FaRegClock, FaWarehouse } from "react-icons/fa";
// // import StarBorderIcon from "@mui/icons-material/StarBorder";

// export const ViewGarageDetail = () => {
//   const { id } = useParams();
//   const [garage, setGarage] = useState(null);
//   const [services, setServices] = useState([]);
//   const [selectedServices, setSelectedServices] = useState([]);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const selectedVehicle = location.state?.selectedVehicle;
//   const selectedGarage = location.state?.selectedGarage;

//   useEffect(() => {
//     axios
//       .get(`/garage/getgaragebyid/${id}`)
//       .then((res) => setGarage(res.data.data))
//       .catch((err) => console.error(err));

//     axios
//       .get(`/service/getservicesbygarageid/${id}`)
//       .then((res) => setServices(res.data.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   const toggleServiceSelection = (service) => {
//     const exists = selectedServices.find((s) => s._id === service._id);
//     if (exists) {
//       setSelectedServices(
//         selectedServices.filter((s) => s._id !== service._id)
//       );
//     } else {
//       setSelectedServices([...selectedServices, service]);
//     }
//   };

//   const proceedToAppointment = () => {
//     if (!selectedVehicle || !selectedGarage) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       toast.warn("Please select a vehicle and garage before booking.", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//         transition: Bounce,
//         onClose: () => navigate("/user/getvehiclebyuserid")
//       });
//       return;
//     }

//     if (selectedServices.length === 0) {
//       alert("Please select at least one service.");
//       return;
//     }

//     navigate("/user/booking", {
//       state: {
//         selectedVehicle,
//         selectedGarage,
//         selectedServices
//       }
//     });
//   };

//   if (!garage)
//     return (
//       <div style={{ textAlign: "center", padding: "2rem", fontSize: "1.5rem" }}>
//         Loading...
//       </div>
//     );

//   return (
//     <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
//       <div>
//         <button
//           onClick={() => navigate(-1)}
//           className="book-app-go-back-button"
//           style={{
//             marginLeft: "20px",
//             backgroundColor: "#d0d7e4",
//             color: "black",
//             border: "1px solid #fff"
//           }}
//         >
//           ← Go Back
//         </button>
//       </div>
//       <ToastContainer />

//       <div
//         style={{
//           marginBottom: "2rem",
//           marginTop: "20px",
//           borderRadius: "12px",
//           overflow: "hidden",
//           boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//           background: "linear-gradient(135deg, #f0f8ff, #e6f7ff)",
//           border: "1px solid #ccc"
//         }}
//       >
//         <div
//           style={{
//             width: "100%",
//             backgroundColor: "rgb(105, 162, 228)",
//             color: "#fff",
//             padding: "1rem",
//             fontSize: "1.8rem",
//             fontWeight: "bold",
//             textAlign: "center",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "0.5rem"
//           }}
//         >
//           <FaWarehouse /> {garage.name}
//         </div>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "flex-start",
//             gap: "2rem",
//             justifyContent: "space-evenly",
//             padding: "1.5rem",
//             flexWrap: "wrap"
//           }}
//         >
//           <img
//             src={garage.imageURL}
//             alt="Garage"
//             style={{
//               width: "40%",
//               maxWidth: "350px",
//               borderRadius: "10px",
//               border: "2px solid black",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               objectFit: "cover"
//             }}
//           />

//           <div style={{}}>
//             <p>
//               <strong>Owner:</strong> {garage.owner}
//             </p>
//             <p>
//               <strong>Phone:</strong> {garage.phoneno}
//             </p>
//             <p>
//               <strong>Email:</strong> {garage.email}
//             </p>
//             <p>
//               <strong>Opening Hours:</strong> {garage.openingHours}
//             </p>
//             <p style={{ marginTop: "1rem" }}>
//               <strong>Location:</strong> {garage.stateId?.name},{" "}
//               {garage.cityId?.cityName}, {garage.areaId?.name}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div>
//         <h2
//           style={{
//             fontSize: "1.8rem",
//             marginBottom: "1rem",
//             textAlign: "center"
//           }}
//         >
//           Available Services
//         </h2>
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
//           {services.length > 0 ? (
//             services.map((service) => {
//               const isSelected = selectedServices.some(
//                 (s) => s._id === service._id
//               );
//               return (
//                 <div
//                   key={service._id}
//                   style={{
//                     width: "33%",
//                     maxWidth: "33%",
//                     flex: "1 1 300px",
//                     border: "1px solid #ccc",
//                     borderRadius: "10px",
//                     padding: "1rem",
//                     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                     backgroundColor: "#fff"
//                   }}
//                 >
//                   <img
//                     src={service.imageURL}
//                     alt={service.name}
//                     style={{
//                       width: "100%",
//                       height: "180px",
//                       objectFit: "cover",
//                       borderRadius: "6px"
//                     }}
//                   />
//                   <h3 style={{ margin: "0.5rem 0" }}>
//                     {service.name}
//                     {/* <p >
//                       <StarBorderIcon />
//                     </p> */}
//                   </h3>
//                   <p style={{ fontSize: "0.9rem", color: "#555" }}>
//                     {service.description}
//                   </p>
//                   <p style={{ fontWeight: "bold" }}>₹{service.price}</p>
//                   <p
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "6px"
//                     }}
//                   >
//                     <FaRegClock style={{ color: "#555", fontSize: "16px" }} />
//                     {service.duration} min
//                   </p>

//                   <p>Category: {service.category}</p>
//                   <button
//                     onClick={() => toggleServiceSelection(service)}
//                     style={{
//                       marginTop: "0.5rem",
//                       padding: "0.5rem 1rem",
//                       border: "none",
//                       borderRadius: "5px",
//                       backgroundColor: isSelected
//                         ? "rgb(240, 108, 110)"
//                         : "rgb(115, 169, 231)",
//                       color: "#fff",
//                       cursor: "pointer",
//                       width: "100%"
//                     }}
//                   >
//                     {isSelected ? "Remove" : "Add"}
//                   </button>
//                 </div>
//               );
//             })
//           ) : (
//             <p>No services available for this garage.</p>
//           )}
//         </div>

//         {selectedServices.length > 0 && (
//           <div style={{ textAlign: "center", marginTop: "2rem" }}>
//             <button
//               onClick={proceedToAppointment}
//               style={{
//                 padding: "0.75rem 2rem",
//                 fontSize: "1rem",
//                 backgroundColor: "rgb(72, 72, 243)",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 boxShadow: "0 3px 6px rgba(0,0,0,0.1)"
//               }}
//             >
//               Proceed to Book ({selectedServices.length} service
//               {selectedServices.length > 1 ? "s" : ""})
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { FaRegClock, FaWarehouse } from "react-icons/fa";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export const ViewGarageDetail = () => {
  const { id } = useParams();
  const [garage, setGarage] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const selectedVehicle = location.state?.selectedVehicle;
  const selectedGarage = location.state?.selectedGarage;

  useEffect(() => {
    axios
      .get(`/garage/getgaragebyid/${id}`)
      .then((res) => setGarage(res.data.data))
      .catch((err) => console.error(err));

    axios
      .get(`/service/getservicesbygarageid/${id}`)
      .then((res) => setServices(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  const toggleServiceSelection = (service) => {
    const exists = selectedServices.find((s) => s._id === service._id);
    if (exists) {
      setSelectedServices(
        selectedServices.filter((s) => s._id !== service._id)
      );
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const proceedToAppointment = () => {
    if (!selectedVehicle || !selectedGarage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.warn("Please select a vehicle and garage before booking.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
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
        selectedGarage,
        selectedServices
      }
    });
  };

  const handleReviewClick = (garageId) => {
    // Navigate to AddReview page
    navigate(`/user/addreview/${garageId}`, {
      state: { selectedGarage: garage }
    });
  }

  if (!garage)
    return (
      <div style={{ textAlign: "center", padding: "2rem", fontSize: "1.5rem" }}>
        Loading...
      </div>
    );

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="book-app-go-back-button"
          style={{
            marginLeft: "20px",
            backgroundColor: "#d0d7e4",
            color: "black",
            border: "1px solid #fff"
          }}
        >
          ← Go Back
        </button>
      </div>
      <ToastContainer />

      <div
        style={{
          marginBottom: "2rem",
          marginTop: "20px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(135deg, #f0f8ff, #e6f7ff)",
          border: "1px solid #ccc"
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "rgb(105, 162, 228)",
            color: "#fff",
            padding: "1rem",
            fontSize: "1.8rem",
            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem"
          }}
        >
          <FaWarehouse /> {garage.name}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "2rem",
            justifyContent: "space-evenly",
            padding: "1.5rem",
            flexWrap: "wrap"
          }}
        >
          <img
            src={garage.imageURL}
            alt="Garage"
            style={{
              width: "40%",
              maxWidth: "350px",
              borderRadius: "10px",
              border: "2px solid black",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              objectFit: "cover"
            }}
          />

          <div>
            <p>
              <strong>Owner:</strong> {garage.owner}
            </p>
            <p>
              <strong>Phone:</strong> {garage.phoneno}
            </p>
            <p>
              <strong>Email:</strong> {garage.email}
            </p>
            <p>
              <strong>Opening Hours:</strong> {garage.openingHours}
            </p>
            <p style={{ marginTop: "1rem" }}>
              <strong>Location:</strong> {garage.stateId?.name},{" "}
              {garage.cityId?.cityName}, {garage.areaId?.name}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1rem"
              }}
            >
              <StarBorderIcon
                onClick={() => handleReviewClick(garage._id)}
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
              />
              <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Add a review
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "1rem",
            textAlign: "center"
          }}
        >
          Available Services
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {services.length > 0 ? (
            services.map((service) => {
              const isSelected = selectedServices.some(
                (s) => s._id === service._id
              );
              return (
                <div
                  key={service._id}
                  style={{
                    width: "33%",
                    maxWidth: "33%",
                    flex: "1 1 300px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "1rem",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff"
                  }}
                >
                  <img
                    src={service.imageURL}
                    alt={service.name}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "6px"
                    }}
                  />
                  <h3 style={{ margin: "0.5rem 0" }}>
                    {service.name}
                    <p>
                      <StarBorderIcon />
                    </p>
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#555" }}>
                    {service.description}
                  </p>
                  <p style={{ fontWeight: "bold" }}>₹{service.price}</p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <FaRegClock style={{ color: "#555", fontSize: "16px" }} />
                    {service.duration} min
                  </p>

                  <p>Category: {service.category}</p>
                  <button
                    onClick={() => toggleServiceSelection(service)}
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.5rem 1rem",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: isSelected
                        ? "rgb(240, 108, 110)"
                        : "rgb(115, 169, 231)",
                      color: "#fff",
                      cursor: "pointer",
                      width: "100%"
                    }}
                  >
                    {isSelected ? "Remove" : "Add"}
                  </button>
                </div>
              );
            })
          ) : (
            <p>No services available for this garage.</p>
          )}
        </div>

        {selectedServices.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              onClick={proceedToAppointment}
              style={{
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                backgroundColor: "rgb(72, 72, 243)",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)"
              }}
            >
              Proceed to Book ({selectedServices.length} service
              {selectedServices.length > 1 ? "s" : ""})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
