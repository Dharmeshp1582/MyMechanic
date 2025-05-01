import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/approvedgarages.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Garages = () => {
  const [garages, setGarages] = useState([]);
  const [filteredGarages, setFilteredGarages] = useState([]);
  const [garageRatings, setGarageRatings] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const selectedVehicle = location.state?.selectedVehicle;

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const res = await axios.get("/garage/getApprovedGarages");
        const garagesData = res.data.data;
        setGarages(garagesData);
        setFilteredGarages(garagesData); // Initialize filtered list

        const ratings = {};
        await Promise.all(
          garagesData.map(async (garage) => {
            try {
              const ratingRes = await axios.get(`/review/average/${garage._id}`);
              ratings[garage._id] = ratingRes.data.average?.toFixed(1) || null;
            } catch (err) {
              console.error(`Error fetching rating for ${garage.name}`, err);
              ratings[garage._id] = null;
            }
          })
        );
        setGarageRatings(ratings);
      } catch (err) {
        console.error("Error fetching garages", err);
      }
    };

    fetchGarages();
  }, []);

  // Search filter effect
  useEffect(() => {
    const filtered = garages.filter((garage) => {
      const nameMatch = garage.name.toLowerCase().includes(searchTerm.toLowerCase());
      const areaMatch = garage.areaId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const rating = garageRatings[garage._id];
      const ratingMatch = rating?.toString().includes(searchTerm);
      return nameMatch || areaMatch || ratingMatch;
    });

    setFilteredGarages(filtered);
  }, [searchTerm, garages, garageRatings]);

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
        theme: "dark",
        transition: Bounce,
        onClose: () => navigate("/user/getvehiclebyuserid"),
      });
      return;
    }

    navigate(`/user/viewgarage/${garage._id}`, {
      state: { selectedGarage: garage, selectedVehicle },
    });
  };

  return (
    <div className="user-gara-container">
      {/* <ToastContainer
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
      /> */}

      <h2 className="user-gara-title">Garages</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name, area, or rating"
        className="user-gara-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="user-gara-list">
        {filteredGarages.map((garage) => (
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
                📍 {garage.areaId?.name}, {garage.cityId?.cityName},{" "}
                {garage.stateId?.name}
              </p>
              <p className="user-gara-contact">📞 {garage.phoneno}</p>
              <p className="user-gara-contact">📧 {garage.email}</p>

              <p className="user-gara-contact">
                ⭐ Rating:{" "}
                {garageRatings[garage._id] !== undefined
                  ? `${garageRatings[garage._id]} / 5`
                  : "No ratings"}
              </p>

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
