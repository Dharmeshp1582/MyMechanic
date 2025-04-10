import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GarageList = () => {
  const [garages, setGarages] = useState([]);

  const getAllGarages = async () => {
    try {
      const res = await axios.get("/garage/getallgarages");
      setGarages(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch garages");
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`/garage/deletegarage/${id}`);
  //     toast.error("Garage deleted");
  //     getAllGarages();
  //   } catch (err) {
  //     toast.error("Failed to delete garage");
  //   }
  // };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this garage?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`/garage/deletegarage/${id}`);
      toast.error("Garage deleted");
      getAllGarages();
    } catch (err) {
      toast.error("Failed to delete garage");
    }
  };
  

  const handleApprove = async (id, email) => {
    try {
      await axios.put(`/garage/updategaragewithfile/${id}`, {
        avaliability_status: true
      });
      await axios.post("/mail/send-status-mail", {
        to: email,
        status: "approved"
      });
      toast.success("Garage approved & mail sent");
      getAllGarages();
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  const handleInapprove = async (id, email) => {
    try {
      await axios.put(`/garage/updategaragewithfile/${id}`, {
        avaliability_status: false
      });
      await axios.post("/mail/send-status-mail", {
        to: email,
        status: "rejected"
      });
      toast.warning("Garage disapproved & mail sent");
      getAllGarages();
    } catch (err) {
      console.log(err);
      toast.error("Disapproval failed");
    }
  };

  useEffect(() => {
    getAllGarages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 style={{ textAlign: "center" }}>Garage List</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          backgroundColor:"#fff"
        }}
      >
        <thead>
          <tr>
            {[
              "Image",
              "Garage Name",
              "Owner",
              "State",
              "City",
              "Area",
              "Status",
              "Opening Hours",
              "Map",
              "Actions"
            ].map((header) => (
              <th
                key={header}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  backgroundColor: "#3498db",
                  color: "white",
                  textAlign: "center"
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {garages.map((garage) => (
            <tr key={garage._id}>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center"
                }}
              >
                <img
                  src={garage.imageURL}
                  alt="Garage"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "5px"
                  }}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/50")
                  }
                />
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center"
                }}
              >
                {garage.name}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center"
                }}
              >
                {garage.owner}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center"
                }}
              >
                {garage.stateId?.name || "N/A"}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center"
                }}
              >
                {garage.cityId?.cityName || "N/A"}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center"
                }}
              >
                {garage.areaId?.name || "N/A"}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center"
                }}
              >
                <span
                  style={{
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    backgroundColor: garage.avaliability_status
                      ? "green"
                      : "red"
                  }}
                >
                  {garage.avaliability_status ? "Available" : "Unavailable"}
                </span>
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center"
                }}
              >
                {garage.openingHours}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center"
                }}
              >
                {garage.latitude && garage.longitude ? (
                  <a
                    href={`https://www.google.com/maps?q=${garage.latitude},${garage.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Map
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "center"
                }}
              >
                <button
                  onClick={() => handleDelete(garage._id)}
                  style={{
                    padding: "6px 10px",
                    margin: "2px",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "13px",
                    width:"100%",
                    backgroundColor: "#e74c3c"
                  }}
                >
                  Delete
                </button>
                {garage.avaliability_status ? (
                  <button
                    onClick={() => handleInapprove(garage._id, garage.email)}
                    style={{
                      padding: "6px 10px",
                      margin: "2px",
                      border: "none",
                      borderRadius: "4px",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "13px",
                      width:"100%",
                      backgroundColor: "#f39c12"
                    }}
                  >
                    Disapprove
                  </button>
                ) : (
                  <button
                    onClick={() => handleApprove(garage._id, garage.email)}
                    style={{
                      padding: "6px 10px",
                      margin: "2px",
                      border: "none",
                      borderRadius: "4px",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "13px",
                      width:"100%",
                      backgroundColor: "#2ecc71"
                    }}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
