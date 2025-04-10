import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/GarageService.css";
import { FaWarehouse } from "react-icons/fa";

export const GarageService = () => {
  const [garageServices, setGarageServices] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGaragesAndServices = async () => {
      const userId = localStorage.getItem("id");

      // ❗ Check if userId is available
      if (!userId) {
        console.error("User ID not found in localStorage.");
        setError("User ID not found. Please log in again.");
        return;
      }

      try {
        const garageRes = await axios.get(
          `/garage/getgaragebyuserid/${userId}`
        );

        // ❗ Check if data exists
        const garages = garageRes?.data?.data;
        if (!garages || garages.length === 0) {
          setGarageServices([]);
          return;
        }

        const servicesWithGarage = await Promise.all(
          garages.map(async (garage) => {
            try {
              const serviceRes = await axios.get(
                `/service/getservicesbygarageid/${garage._id}`
              );
              return {
                garage,
                services: serviceRes?.data?.data || []
              };
            } catch (serviceError) {
              console.error(
                `Error fetching services for garage ${garage._id}:`,
                serviceError
              );
              return {
                garage,
                services: []
              };
            }
          })
        );

        setGarageServices(servicesWithGarage);
      } catch (err) {
        console.error("Error fetching garages or services:", err);
        setError("Something went wrong while fetching data.");
      }
    };

    fetchGaragesAndServices();
  }, []);

  if (error) {
    return <p style={{ color: "red", padding: "10px" }}>{error}</p>;
  }

  return (
    <div className="garown-view-serv-container" style={{backgroundColor:"rgb(220, 225, 245)"}}>
      <h1 className="garown-view-serv-title">
        <FaWarehouse size={24} color="gray" /> Your Garages & Services{" "}
        <FaWarehouse size={24} color="gray" />
      </h1>

      {garageServices.length === 0 ? (
        <p className="garown-view-serv-no-data">
          No garages or services found.
        </p>
      ) : (
        garageServices.map(({ garage, services }) => (
          <div key={garage._id} className="garown-view-serv-garage-section">
            <h2 className="garown-view-serv-garage-name">{garage.name}</h2>
            {services.length === 0 ? (
              <p className="garown-view-serv-no-services">
                No services for this garage.
              </p>
            ) : (
              <div className="garown-view-serv-services-list">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="garown-view-serv-service-card"
                  >
                    <img
                      src={service.imageURL || "/default-service.png"} // ❗ fallback image
                      alt={service.name || "Service Image"}
                      className="garown-view-serv-service-img"
                    />
                    <h5>{service.name || "Unnamed Service"}</h5>
                    <p>
                      <strong>Category:</strong> {service.category || "N/A"}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{service.price ?? "N/A"}
                    </p>
                    <p>
                      <strong>Duration:</strong> {service.duration ?? "N/A"}{" "}
                      mins
                    </p>
                    <p>
                      <strong>Rating:</strong> ⭐ {service.ratings ?? "Not Rated"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {service.availability ? "Available" : "Unavailable"}
                    </p>
                    <button
                      className="garown-view-serv-update-btn"
                      onClick={() =>
                        navigate(`/garageowner/updateservice/${service._id}`)
                      }
                    >
                      Update
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
