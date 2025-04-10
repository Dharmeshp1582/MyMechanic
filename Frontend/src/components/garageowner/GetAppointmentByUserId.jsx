import { useEffect, useState } from "react";
import axios from "axios";

export const GetAppointmentByUserId = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const UserId = localStorage.getItem("id"); // Ensure correct ID is stored

    console.log("Garage Owner ID:", UserId); // Debugging Log

    if (userRole !== "Garage owner" || !UserId) {
      setLoading(false);
      return;
    }

    setRole(userRole);

    axios
      .get(`/appointment/getappointmentsbygarageowneruserid/${UserId}`)
      .then((res) => {
        if (res.data.success) {
          setAppointments(res.data.data);
        }
      })
      .catch((err) => {
        console.error(
          "Error fetching appointments:",
          err.response?.data?.message || err.message
        );
      })
      .finally(() => setLoading(false));
  }, []);

  // Function to update appointment status
  const updateStatus = (appointmentId, newStatus) => {
    axios
      .put(`/appointment/updatestatus/${appointmentId}`, { status: newStatus })
      .then((res) => {
        if (res.data.success) {
          setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
              appointment._id === appointmentId
                ? { ...appointment, status: newStatus }
                : appointment
            )
          );
        }
      })
      .catch((err) => {
        console.error(
          "Error updating status:",
          err.response?.data?.message || err.message
        );
      });
  };

  return (
    <>
      {role === "Garage owner" && (
        <div
          style={{
            maxWidth: "1200px",
            margin: "30px auto",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h2
            style={{ textAlign: "center", color: "#333", marginBottom: "15px" }}
          >
            Service Appointments
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
                <tr
                  style={{
                    color: "#fff",
                    textAlign: "left"
                  }}
                >
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Customer
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Service
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Date
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Base Price
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Final Price
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Status
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment._id}
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {appointment.userId?.fullName || "N/A"}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {Array.isArray(appointment.serviceId)
                        ? appointment.serviceId
                            .map((service) => service.name)
                            .join(", ")
                        : "N/A"}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {appointment.appointmentDate
                        ? new Date(
                            appointment.appointmentDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      ₹{appointment.basePrice || 0}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      ₹{appointment.finalPrice || 0}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button
                        onClick={() =>
                          updateStatus(
                            appointment._id,
                            appointment.status === "pending"
                              ? "completed"
                              : "pending"
                          )
                        }
                        style={{
                          padding: "5px 10px",
                          backgroundColor:
                            appointment.status === "pending"
                              ? "orange"
                              : "green",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >
                        {appointment.status}
                      </button>
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
