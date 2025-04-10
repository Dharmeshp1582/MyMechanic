// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { CustLoder } from "../common/CustLoder";
// // import "../../../src/assets/css/Garage.css";

// export const Garages = () => {
//   const [garage, setGarage] = useState([]);
//   const [filteredGarage, setFilteredGarage] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null); // Full-Screen Image State

//   useEffect(() => {
//     const getAllMyGarages = async () => {
//       setIsLoading(true);
//       try {
//         const res = await axios.get(
//           "/garage/getApprovedGarages"
//         );
//         setGarage(res.data.data);
//         setFilteredGarage(res.data.data);
//       } catch (error) {
//         console.error("Error fetching garages:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getAllMyGarages();
//   }, []);

//   // Search Filter Function
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = garage.filter(
//       (gr) =>
//         gr.name.toLowerCase().includes(value) ||
//         gr.owner.toLowerCase().includes(value) ||
//         gr.phoneno.includes(value)
//     );

//     setFilteredGarage(filtered);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       {isLoading && <CustLoder />}

//       {/* 🔍 Search Input - Stays on Top */}
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         <input
//           type="text"
//           placeholder="🔍 Search by name, owner, or contact..."
//           value={searchTerm}
//           onChange={handleSearch}
//           style={{
//             padding: "12px",
//             width: "96%",
//             maxWidth: "1100px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//             fontSize: "16px",
//             boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//           }}
//         />
//       </div>

//       {/* Garage Cards */}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "20px",
//           justifyContent: "center",
//           maxWidth: "1100px",
//           margin: "0 auto",
//         }}
//       >
//         {filteredGarage.length > 0 ? (
//           filteredGarage.map((gr) => (
//             <div
//               key={gr._id}
//               style={{
//                 width: "32%", //  Makes only 2 cards per row
//                 background: "#fff",
//                 borderRadius: "10px",
//                 padding: "20px",
//                 backgroundColor: "rgb(198, 209, 221)",
//                 boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//                 textAlign: "center",
//                 transition: "transform 0.2s",
//               }}

//             >
//               {/* Image - Click to Open in Full Screen */}
//               <img
//                 src={gr?.imageURL}
//                 alt={gr.name}
//                 onClick={() => setSelectedImage(gr?.imageURL)}
//                 style={{
//                   width: "100%",
//                   height: "200px",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                   border: "2px solid black",
//                   cursor: "pointer", //  Shows it's clickable
//                 }}
//               />

//               <h3 style={{ fontSize: "20px", margin: "10px 0", color: "black" }}>
//                 {gr.name}
//               </h3>
//               <p><strong>Owner:</strong> {gr.owner}</p>
//               <p><strong>Status:</strong> {gr.avaliability_status ? "Open" : "Closed"}</p>
//               <p><strong>Hours:</strong> {gr.openingHours}</p>
//               <p><strong>Contact:</strong> {gr.phoneno}</p>
//               <Link
//                 to={`/user/viewgarage/${gr._id}`}
//                 style={{
//                   display: "block",
//                   marginTop: "15px",
//                   padding: "10px",
//                   background: "rgb(76, 131, 190)",
//                   color: "white",
//                   textDecoration: "none",
//                   borderRadius: "5px",
//                   transition: "background 0.3s",
//                 }}
//                 onMouseOver={(e) => (e.currentTarget.style.background = "#0056b3")}
//                 onMouseOut={(e) => (e.currentTarget.style.background = "rgb(76, 131, 190)")}

//               >
//                 View garage Detail
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p style={{ textAlign: "center", fontSize: "18px", color: "gray" }}>
//             No garages found...
//           </p>
//         )}
//       </div>

//       {/* Full Screen Image Modal */}
//       {selectedImage && (
//         <div
//           onClick={() => setSelectedImage(null)} // ✅ Click outside to close
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             background: "rgba(0, 0, 0, 0.8)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000,
//           }}
//         >
//           <img
//             src={selectedImage}
//             alt="Full Size"
//             style={{
//               maxWidth: "90%",
//               maxHeight: "90%",
//               borderRadius: "10px",
//               boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)",
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/approvedgarages.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Garages = () => {
  const [garages, setGarages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedVehicle = location.state?.selectedVehicle;

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const res = await axios.get("/garage/getApprovedGarages");
        setGarages(res.data.data);
      } catch (err) {
        console.error("Error fetching garages", err);
      }
    };

    fetchGarages();
  }, []);

  const handleSelectGarage = (garage) => {
    if (!selectedVehicle) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.warn("Please select a vehicle before selecting a garage.", {
        position: "top-right",
        autoClose: 2000,
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
    navigate(`/user/viewgarage/${garage._id}`, {
      state: { selectedGarage: garage, selectedVehicle }
    });
  };

  return (
    <div className="user-gara-container">
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
      {/* Approved garages */}
      <h2 className="user-gara-title">Garages</h2>
      <div className="user-gara-list">
        {garages.map((garage) => (
          <div key={garage._id} className="user-gara-card">
            <img
              src={garage.imageURL}
              alt={garage.name}
              className="user-gara-image"
            />
            <div className="user-gara-info">
              <h3 className="user-gara-name">{garage.name}</h3>
              <p className="user-gara-owner">Owner: {garage.owner}</p>
              <p className="user-gara-contact">
                📍{garage.stateId?.name},{garage.cityId?.cityName},{" "}
                {garage.areaId?.name}{" "}
              </p>
              <p className="user-gara-contact">📞 {garage.phoneno}</p>
              <p className="user-gara-contact">📧 {garage.email}</p>
              <div className="user-gara-button-group">
                <Link
                  to={`/user/viewgarage/${garage._id}`}
                  className="user-gara-detail-btn"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleSelectGarage(garage)}
                  className="user-gara-detail-btn"
                >
                  Select Garage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
