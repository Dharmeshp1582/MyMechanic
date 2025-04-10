import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/appointments.css"; // Import the CSS

export const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("id"); // Removed extra semicolon

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `/appointment/getappointmentsbygarageowneruserid/${userId}`
      );
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getNextStatus = (currentStatus) => {
    const statusOrder = ["pending", "booked", "inProgress", "completed"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return currentIndex !== -1 && currentIndex < statusOrder.length - 1
      ? statusOrder[currentIndex + 1]
      : currentStatus;
  };

  // Update Status in Backend
  const updateStatus = async (appointmentId, currentStatus, action) => {
    let newStatus = currentStatus;

    if (action === "reject") {
      newStatus = "rejected";
    } else if (action === "reschedule") {
      newStatus = "pending";
    } else {
      newStatus = getNextStatus(currentStatus);
    }

    try {
      await axios.put(`/appointment/updatestatus/${appointmentId}/status`, {
        status: newStatus
      }); // Fixed API call
      fetchAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Delete Appointment
  const deleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`/appointment/deleteappointment/${appointmentId}`);
      fetchAppointments(); // Refresh UI
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div className="own-appoint-container">
      <h2 className="own-appoint-title">Garage Owner's Appointments</h2>
      <div className="own-appoint-table-container">
        <table className="own-appoint-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Service</th>
              <th>Vehicle</th>
              <th>LicensePlate</th>
              <th>Appointment Date</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr key={appointment._id || index}>
                  <td>{appointment.userId?.fullName || "N/A"}</td>
                  <td>
                    {Array.isArray(appointment.serviceId)
                      ? appointment.serviceId
                          .map((service) => service?.name)
                          .join(", ")
                      : "N/A"}
                  </td>
                  <td> {appointment.vehicleId?.model || "N/A"}</td>
                  <td>{appointment.vehicleId?.licensePlate || "N/A"}</td>
                  <td>{appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      }
                    ): "N/A"}
                  </td>

                  <td
                    className={`own-appoint-status-${appointment.status.toLowerCase()}`}
                  >
                    {appointment.status}
                  </td>
                  <td>{appointment.reason || "N/A"}</td>
                  <td>
                    {appointment.status === "pending" && (
                      <>
                        <button
                          className="own-appoint-status-btn"
                          onClick={() =>
                            updateStatus(
                              appointment._id,
                              appointment.status,
                              "next"
                            )
                          } style={{width:"90%"}}
                        >
                          Book Now
                        </button>
                        <button
                          className="own-appoint-reject-btn"
                          onClick={() =>
                            updateStatus(
                              appointment._id,
                              appointment.status,
                              "reject"
                            )
                          } style={{width:"90%",marginTop:"5px"}}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {appointment.status === "rejected" && (
                      <button
                        className="own-appoint-reschedule-btn"
                        onClick={() =>
                          updateStatus(
                            appointment._id,
                            appointment.status,
                            "reschedule"
                          )
                        } style={{width:"90%"}}
                      >
                        Reschedule
                      </button>
                    )}

                    {appointment.status !== "pending" &&
                      appointment.status !== "rejected" &&
                      appointment.status !== "completed" && (
                        <button
                          className="own-appoint-status-btn"
                          onClick={() =>
                            updateStatus(
                              appointment._id,
                              appointment.status,
                              "next"
                            )
                          } style={{width:"90%"}}
                        >
                          Next Step
                        </button>
                      )}

                    {appointment.status === "completed" && (
                      <button
                        className="own-appoint-delete-btn"
                        // onClick={() => deleteAppointment(appointment._id)} 
                        style={{width:"90%"}} disabled
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
