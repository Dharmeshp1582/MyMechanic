import { useEffect, useState } from "react";
import axios from "axios";
// import "../../assets/css/appointments.css";

export const CompleteAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/appointment/getappointment`);
      const data = response.data.data;
      const completedAppointments = data.filter((appt) => appt.status === "completed");
      setAppointments(completedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="own-appoint-container">
      <h2 className="own-appoint-title">Completed Appointments</h2>

      <div className="own-appoint-table-container">
        <table className="own-appoint-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Vehicle</th>
              <th>LicensePlate</th>
              <th>Appointment Date</th>
              <th>Status</th>
              <th>Price</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr key={appointment._id || index}>
                  <td>{appointment.userId?.fullName || "N/A"}</td>
                  <td>
                    {Array.isArray(appointment.serviceId)
                      ? appointment.serviceId.map((s) => s?.name).join(", ")
                      : "N/A"}
                  </td>
                  <td>{appointment.vehicleId?.model || "N/A"}</td>
                  <td>{appointment.vehicleId?.licensePlate || "N/A"}</td>
                  <td>
                    {appointment.appointmentDate
                      ? new Date(appointment.appointmentDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className={`own-appoint-status-${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </td>
                  <td>₹{appointment.finalPrice || 0}</td>
                  <td>{appointment.reason || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No completed appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
