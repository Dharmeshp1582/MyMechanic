import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/appointments.css";
import Payment from "../payment/Payment";

export const GetUserAppointmentDetail = () => {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("id");

  const fetchAppointments = () => {
    if (userId) {
      axios
        .get(`/appointment/getappointmentbyid/${userId}`)
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

  return (
    <div className="my-appoint-container">
      <h2 className="my-appoint-heading">My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="my-noappoint-para">No appointments found.</p>
      ) : (
        <div className="my-appoint-table-wrapper">
          <table className="my-appoint-table">
            <thead>
              <tr>
                <th>Services</th>
                <th>Garage</th>
                <th>Garage Owner</th>
                <th>Vehicle</th>
                <th>License Plate</th>
                <th>Final Price</th>
                <th>Appointment Date</th>
                <th>Status</th>
                <th>Paid</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id}>
                  <td>
                    {appt.serviceId.map((service) => (
                      <div key={service._id}>{service.name}</div>
                    ))}
                  </td>
                  <td>{appt.garageownerId?.name || "N/A"}</td>
                  <td>{appt.garageownerId?.userId?.fullName || "N/A"}</td>
                  <td>
                    {appt.vehicleId?.model || "N/A"} -{" "}
                    {appt.vehicleId?.mfgYear || "N/A"}
                  </td>
                  <td>{appt.vehicleId?.licensePlate || "N/A"}</td>
                  <td>₹{appt.finalPrice}</td>
                  <td>
                    {new Date(appt.appointmentDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      }
                    )}
                  </td>

                  <td
                    className={`my-appoint-status-${appt.status.toLowerCase()}`}
                  >
                    {appt.status}
                  </td>
                  <td>{appt.isPaid ? "✅ Yes" : "❌ No"}</td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
