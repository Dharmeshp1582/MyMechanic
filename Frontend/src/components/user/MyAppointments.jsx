import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/myappointment.css";
import Payment from "../payment/payment";
import { Link } from "react-router-dom";

export const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;
  const userId = localStorage.getItem("id");

  const fetchAppointments = () => {
    if (userId) {
      axios
        .get(`/appointment/getappointmentbyuserid/${userId}`)
        .then((res) => setAppointments(res.data.data))
        .catch((err) => console.error("Error fetching appointments:", err));
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handlePaymentSuccess = () => {
    fetchAppointments();
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      axios
        .put(`/appointment/cancel/${id}`)
        .then(() => {
          fetchAppointments();
        })
        .catch((err) => {
          console.error("Error canceling appointment:", err);
          alert("Failed to cancel the appointment.");
        });
    }
  };

  const getVehicleStatusLabel = (status) => {
    if (status === "ingarage") {
      return <span className="vehicle-status status-in-garage">🏠 In Garage</span>;
    } else if (status === "returned") {
      return <span className="vehicle-status status-returned">✅ Returned</span>;
    } else {
      return <span className="vehicle-status status-not-received">❌ Pending Arrival</span>;
    }
  };

  const indexOfLastAppt = currentPage * appointmentsPerPage;
  const indexOfFirstAppt = indexOfLastAppt - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppt, indexOfLastAppt);
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="my-appoint-container">
      <h2 className="my-appoint-heading">My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="my-noappoint-para">No appointments found.</p>
      ) : (
        <>
          <div className="my-appoint-table-wrapper">
            <table className="my-appoint-table">
              <thead>
                <tr>
                  <th>Services</th>
                  <th>Garage</th>
                  <th>Garage Owner</th>
                  <th>Vehicle</th>
                  <th>LicensePlate</th>
                  <th>Final Price</th>
                  <th>Appointment Date</th>
                  <th>Status</th>
                  <th>Paid</th>
                  <th>Vehicle Status</th>
                  <th>Map</th>
                  <th>Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map((appt) => (
                  <tr key={appt._id}>
                    <td>{appt.serviceId?.map((s) => s.name).join(", ") || "N/A"}</td>
                    <td>{appt.garageownerId?.name || "N/A"}</td>
                    <td>{appt.garageownerId?.userId?.fullName || "N/A"}</td>
                    <td>{appt.vehicleId?.model || "N/A"}</td>
                    <td>{appt.vehicleId?.licensePlate || "N/A"}</td>
                    <td>₹{appt.finalPrice}</td>
                    <td>
                      {new Date(appt.appointmentDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className={`my-appoint-status-${appt.status.toLowerCase()}`}>
                      {appt.status}
                    </td>
                    <td>{appt.isPaid ? "✅ Yes" : "❌ No"}</td>
                    <td>{getVehicleStatusLabel(appt.vehicleStatus)}</td>
                    <td>
                  {appt.garageownerId?.latitude && appt.garageownerId?.longitude ? (
                    <a
                      href={`https://www.google.com/maps?q=${appt.garageownerId?.latitude},${appt.garageownerId?.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Map
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                    <td>{appt.reason || "-"}</td>
                    <td>
                      {appt.status === "completed" && !appt.isPaid && (
                        <Payment
                          appointmentId={appt._id}
                          userId={userId}
                          amount={appt.finalPrice * 100}
                          onSuccess={handlePaymentSuccess}
                        />
                      )}

                      {appt.status === "completed" && appt.isPaid && (
                        <Link
                          to={`paymentdetail/${appt._id}`}
                          className="my-invoice-button"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🧾 View Invoice
                        </Link>
                      )}

                      {appt.status === "pending" && (
                        <button
                          className="my-appoint-delete-btn"
                          onClick={() => handleCancelAppointment(appt._id)}
                        >
                          🗑️ Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="my-appoint-pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <span>{`${currentPage} / ${totalPages}`}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
