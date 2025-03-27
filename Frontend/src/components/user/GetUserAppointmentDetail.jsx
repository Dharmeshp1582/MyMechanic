import { useEffect, useState } from "react";
import axios from "axios";

export const GetAppointmentDetail = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const userRole = localStorage.getItem("role");

    if (!userId) {
      setLoading(false);
      return;
    }

    if (!userRole || userRole !== "User") {
      setLoading(false);
      return;
    }

    setRole(userRole);

    axios
      .get(`/appointment/getappointmentbyuserid/${userId}`)
      .then((res) => {
        if (res.data.success) {
          setAppointments(res.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching appointments:",
          err.response?.data?.message || err.message
        );
        setLoading(false);
      });
  }, []);

  return (
    <>
      {role === "User" && (
        <div
          style={{
            maxWidth: "1200px",
            margin: "30px auto",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#333", marginBottom: "15px" }}>
            My Appointments
          </h2>

          {loading ? (
            <p style={{ textAlign: "center" }}>Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p style={{ textAlign: "center", color: "red" }}>
              No appointments found.
            </p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "left" }}>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Service</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Vehicle</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Garage</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Base Price</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Final Price</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Reason</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {appointment.serviceId?.join(", ") || "N/A"}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {appointment.vehicleId || "N/A"}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {appointment.garageownerId || "N/A"}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {appointment.appointmentDate
                        ? new Date(appointment.appointmentDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      ₹{appointment.basePrice || 0}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      ₹{appointment.finalPrice || 0}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        color: appointment.status === "pending" ? "orange" : "green",
                      }}
                    >
                      {appointment.status}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {appointment.reason || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};
