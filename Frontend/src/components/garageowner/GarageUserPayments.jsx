import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/garageuserpayments.css";


//history of payment
export const GarageUserPayments = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const garageOwnerId = localStorage.getItem("id");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`/payment/getgarageownerpayments/${garageOwnerId}`);
        setPayments(res.data.data);
      } catch (error) {
        console.error("Error fetching garage owner payments:", error);
      }
    };
    fetchPayments();
  }, [garageOwnerId]);

  const filteredPayments = payments.filter((item) => {
    const user = item.userId?.fullName?.toLowerCase();
    const service = item.appointmentId?.serviceId?.map(s => s.name?.toLowerCase()).join(" ");
    const garage = item.appointmentId?.garageownerId?.name?.toLowerCase();

    const term = searchTerm.toLowerCase();
    return user?.includes(term) || service?.includes(term) || garage?.includes(term);
  });

  const totalRevenue = filteredPayments.reduce((acc, item) => acc + (item.amount || 0), 0);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  return (
    <div className="garageown-paym-container">
      <h2 className="garageown-paym-heading">My Garage Payments</h2>

      <input
        type="text"
        className="garageown-paym-search"
        placeholder="Search by user, service, or garage name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="garageown-paym-table-wrapper">
        <table className="garageown-paym-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Garage</th>
              <th>Service</th>
              <th>Vehicle</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Paid On</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((payment) => {
              const appt = payment.appointmentId;
              return (
                <tr key={payment._id}>
                  <td>{payment.userId?.fullName}</td>
                  <td>{payment.userId?.contact}</td>
                  <td>{appt?.garageownerId?.name}</td>
                  <td>{appt?.serviceId?.map(s => s.name).join(", ")}</td>
                  <td>{appt?.vehicleId?.brand} {appt?.vehicleId?.model}</td>
                  <td>₹{(payment.amount / 100).toFixed(2)}</td>
                  <td style={{ color: payment.status === "success" ? "green" : "red" }}>{payment.status}</td>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="garageown-paym-total">
        <strong>Total Revenue: ₹{(totalRevenue / 100).toFixed(2)}</strong>
      </div>

      <div className="garageown-paym-pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`garageown-paym-page-btn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};