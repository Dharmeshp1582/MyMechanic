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
  const [averageRating, setAverageRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);

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

    axios
      .get(`/review/average/${id}`)
      .then((res) => {
        setAverageRating(res.data.average?.toFixed(1));
        setRatingCount(res.data.count);
      })
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
    navigate(`/user/addreview/${garageId}`, {
      state: { selectedGarage: garage }
    });
  };

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
          style={{
            marginLeft: "3px",
            backgroundColor: "#d0d7e4",
            color: "black",
            border: "1px solid #fff",
            cursor: "pointer",
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
            <p><strong>Owner:</strong> {garage.owner}</p>
            <p><strong>Phone:</strong> {garage.phoneno}</p>
            <p><strong>Email:</strong> {garage.email}</p>
            <p><strong>Opening Hours:</strong> {garage.openingHours}</p>
            <p style={{ marginTop: "1rem" }}>
              <strong>Location:</strong> {garage.areaId?.name},{" "}
              {garage.cityId?.cityName}, {garage.stateId?.name}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              {averageRating !== null
                ? `${averageRating} ⭐ (${ratingCount})`
                : "No ratings yet"}
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
                style={{ cursor: "pointer", fontSize: "1.5rem",color:"rgb(105, 162, 228)" }}
              />
              <span onClick={() => handleReviewClick(garage._id)}
                style={{ cursor: "pointer", fontSize: "1.1rem",fontWeight: "bold",color:"rgb(105, 162, 228)" }} >
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
                    width: "390px",
                    maxWidth: "390px",
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
                    {/* <p><StarBorderIcon /></p> */}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#555" }}>
                    {service.description}
                  </p>
                  <p style={{ fontWeight: "bold" }}>₹{service.price}</p>
                  <p style={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
                backgroundColor: "rgb(60, 60, 118)",
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
