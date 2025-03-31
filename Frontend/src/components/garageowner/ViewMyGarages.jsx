import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustLoder } from "../common/CustLoder";
import "../../../src/assets/css/Garage.css";

export const ViewMyGarages = () => {
  const [garage, setGarage] = useState([]);
  const [filteredGarage, setFilteredGarage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getAllMyGarages = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "/garage/getgaragebyuserid/" + localStorage.getItem("id")
        );
        setGarage(res.data.data);
        setFilteredGarage(res.data.data);
      } catch (error) {
        console.error("Error fetching garages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllMyGarages();
  }, []);

  // Search Filter Function
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = garage.filter(
      (gr) =>
        gr.name.toLowerCase().includes(value) ||
        gr.owner.toLowerCase().includes(value) ||
        gr.phoneno.includes(value)
    );

    setFilteredGarage(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      {isLoading && <CustLoder />}

      {/* 🔍 Search Input - Stays on Top */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="🔍 Search by name, owner, or contact..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "12px",
            width: "90%",
            maxWidth: "1060px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Garage Cards  */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {filteredGarage.length > 0 ? (
          filteredGarage.map((gr) => (
            <div
              key={gr._id}
              style={{
                width: "250px",
                background: "#fff",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                textAlign: "center",
              }}
            >
              <img
                src={gr?.imageURL}
                alt={gr.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{gr.name}</h3>
              <p><strong>Owner:</strong> {gr.owner}</p>
              <p><strong>Status:</strong> {gr.avaliability_status ? "Open" : "Closed"}</p>
              <p><strong>Hours:</strong> {gr.openingHours}</p>
              <p><strong>Contact:</strong> {gr.phoneno}</p>
              <Link
                to={`/garageowner/updategarage/${gr._id}`}
                style={{
                  display: "block",
                  marginTop: "10px",
                  padding: "8px",
                  background: "#007bff",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "5px",
                }}
              >
                Update
              </Link>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "18px", color: "gray" }}>
            No garages found...
          </p>
        )}
      </div>
    </div>
  );
};
