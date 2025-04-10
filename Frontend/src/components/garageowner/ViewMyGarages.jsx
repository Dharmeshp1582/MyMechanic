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
  const [selectedImage, setSelectedImage] = useState(null); // Full-Screen Image State

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
    <div style={{ padding: "20px",background:"rgb(220, 225, 245)" }}>
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
            width: "96%",
            maxWidth: "1100px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Garage Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          maxWidth: "1100px",
          margin: "0 auto"
          
        }}
      >
        {filteredGarage.length > 0 ? (
          filteredGarage.map((gr) => (
            <div
              key={gr._id}
              style={{
                width: "32%", //  Makes only 2 cards per row
                background: "#fff",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "rgb(248, 249, 250)",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                textAlign: "center",
                transition: "transform 0.2s",
              }}
        
            >
              {/* Image - Click to Open in Full Screen */}
              <img
                src={gr?.imageURL}
                alt={gr.name}
                onClick={() => setSelectedImage(gr?.imageURL)}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "2px solid black",
                  cursor: "pointer", //  Shows it's clickable
                }}
              />

              <h3 style={{ fontSize: "20px", margin: "10px 0", color: "black" }}>
                {gr.name}
              </h3>
              <p><strong>Owner:</strong> {gr.owner}</p>
              <p><strong>Status:</strong> {gr.avaliability_status ? "Open" : "Closed"}</p>
              <p><strong>Hours:</strong> {gr.openingHours}</p>
              <p><strong>Contact:</strong> {gr.phoneno}</p>
              <Link
                to={`/garageowner/updategarage/${gr._id}`}
                style={{
                  display: "block",
                  marginTop: "15px",
                  padding: "10px",
                  background: "rgb(76, 131, 190)",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "5px",
                  transition: "background 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#0056b3")}
                onMouseOut={(e) => (e.currentTarget.style.background = "rgb(76, 131, 190)")}
               
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

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)} // ✅ Click outside to close
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <img
            src={selectedImage}
            alt="Full Size"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(255, 255, 255, 0.2)",
            }}
          />
        </div>
      )}
    </div>
  );
};
