import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/garageList.css";

export const GarageList = () => {
  const [garages, setGarages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getAllGarages = async () => {
    try {
      const res = await axios.get("/garage/getallgarages");
      setGarages(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch garages", err);
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

  // const handleDelete = async (id) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this garage?");
  //   if (!confirmDelete) return;

  //   try {
  //     await axios.delete(`/garage/deletegarage/${id}`);
  //     toast.error("Garage deleted");
  //     getAllGarages();
  //   } catch (err) {
  //     toast.error("Failed to delete garage");
  //   }
  // };

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
      toast.error("Approval failed",err);
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGarages = garages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(garages.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="garage-container">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <h2 className="garage-heading">Garage List</h2>

      <div className="garage-table-wrapper">
        <table className="garage-table">
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
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentGarages.map((garage) => (
              <tr key={garage._id}>
                <td>
                  <img
                    src={garage.imageURL}
                    alt="Garage"
                    className="garage-image"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/50")
                    }
                  />
                </td>
                <td>{garage.name}</td>
                <td>{garage.owner}</td>
                <td>{garage.stateId?.name || "N/A"}</td>
                <td>{garage.cityId?.cityName || "N/A"}</td>
                <td>{garage.areaId?.name || "N/A"}</td>
                <td>
                  <span
                    className={`garage-status ${
                      garage.avaliability_status
                        ? "garage-available"
                        : "garage-unavailable"
                    }`}
                  >
                    {garage.avaliability_status ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td>{garage.openingHours}</td>
                <td>
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
                <td>
                  {/* <button ...>Delete</button> */}
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
                        width: "100%",
                        backgroundColor: "#f39c12"
                      }}
                      className="garage-btn disapprove"
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
                        width: "100%",
                        backgroundColor: "#2ecc71"
                      }}
                      className="garage-btn approve"
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

      {/* Pagination */}
      <div className="garage-pagination">
        <button
          className="garage-page-btn"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ⬅ Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`garage-page-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="garage-page-btn"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};
