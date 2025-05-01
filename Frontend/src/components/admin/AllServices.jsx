import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/allservices.css";

export const AllServices = () => {
  const [availableServices, setAvailableServices] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios
      .get("/service/services")
      .then((response) => setAvailableServices(response.data.data))
      .catch(() => setError("Failed to fetch available services"));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/service/service/${id}`);
      toast.success("Service deleted successfully!");
      fetchServices();
    } catch (err) {
      toast.error("Failed to delete the service.",err);
    }
  };

  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = availableServices.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(availableServices.length / servicesPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="allservices-container">
      <ToastContainer />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2 className="allservices-heading">All Services</h2>

      {availableServices.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <>
          <div className="allservices-table-wrapper">
            <table className="allservices-table">
              <thead>
                <tr>
                  {["Image", "Name", "Category", "Price (₹)", "Duration", "Availability", "Ratings", "Actions"].map((title, i) => (
                    <th key={i}>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentServices.map((service) => (
                  <tr key={service._id}>
                    <td>
                      {service.imageURL && (
                        <img src={service.imageURL} alt={service.name} className="allservices-image" />
                      )}
                    </td>
                    <td>{service.name}</td>
                    <td>{service.category}</td>
                    <td>₹{service.price}</td>
                    <td>{service.duration}</td>
                    <td>
                      <span style={{ color: service.availability ? "green" : "red", fontWeight: "bold" }}>
                        {service.availability ? "Available" : "Not Available"}
                      </span>
                    </td>
                    <td>⭐ {service.ratings}/5</td>
                    <td>
                      {/* Uncomment when needed */}
                      {/* <button className="allservices-delete-btn" onClick={() => handleDelete(service._id)}>
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="allservices-pagination">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={i + 1 === currentPage ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};
