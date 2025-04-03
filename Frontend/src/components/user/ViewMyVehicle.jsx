import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/viewmyvehicle.css"; 
import { useNavigate } from "react-router-dom";

export const ViewMyVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`/vehicle/getvehiclebyuserid/${userId}`);
        setVehicles(response.data.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, [userId]);


  const removeVehicle = async (vehicleId) => {
    try {
      await axios.delete(`/vehicle/deletevehicles/${vehicleId}`);
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId)); // Update UI
      alert("Vehicle removed successfully!");
    } catch (error) {
      console.error("Error removing vehicle:", error);
    }
  };

  return (
    <div className="my-veh-m-cont">
      <h2 className="my-veh-title">My Vehicles</h2>

      <div className="my-veh-container">
      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => (
          <div key={vehicle._id} className="my-veh-card">
            <p className="my-veh-details"><strong>Name:</strong> {vehicle.make} {vehicle.model}</p>
            <p className="my-veh-details"><strong>MFG Year:</strong> {vehicle.mfgYear}</p>
            <p className="my-veh-details"><strong>License Plate:</strong> {vehicle.licensePlate}</p>
            <div className="my-veh-btn-container">
              <button className="my-veh-btn my-veh-btn-view" onClick={() => removeVehicle(vehicle._id)}>Remove Vehicle</button>
              <button className="my-veh-btn my-veh-btn-service" onClick={() => navigate(`/user/services`)}>Service Now</button>
            </div>
          </div>
        ))
      ) : (
        <p>No vehicles found.</p>
      )}
    </div>
    </div>

  );
};