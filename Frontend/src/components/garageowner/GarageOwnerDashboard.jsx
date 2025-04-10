import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/appointments.css";
import { Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

export const GarageOwnerDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `/appointment/getappointmentsbygarageowneruserid/${userId}`
        );

        // Sort by status priority and latest appointment date
        const priority = { pending: 1, booked: 2, inProgress: 3, completed: 4, rejected: 5 };

        const sortedAppointments = response.data.data.sort((a, b) => {
          const statusA = priority[a.status] || 99;
          const statusB = priority[b.status] || 99;

          if (statusA !== statusB) return statusA - statusB;
          return new Date(b.appointmentDate) - new Date(a.appointmentDate);
        });

        setAppointments(sortedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const statusCount = appointments.reduce((acc, appt) => {
    acc[appt.status] = (acc[appt.status] || 0) + 1;
    return acc;
  }, {});

  const statusColors = {
    pending: "#FFA500",
    booked: "#4CAF50",
    inProgress: "#2196F3",
    completed: "#9C27B0",
    rejected: "#F44336"
  };

  const pieData = Object.entries(statusCount).map(([status, count], index) => ({
    id: index,
    value: count,
    label: status,
    color: statusColors[status] || undefined
  }));

  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthlyAppointments = new Array(12).fill(0);
  const completedAppointments = new Array(12).fill(0);

  appointments.forEach((appt) => {
    const date = new Date(appt.appointmentDate);
    const month = date.getMonth();
    monthlyAppointments[month]++;
    if (appt.status === "completed") {
      completedAppointments[month]++;
    }
  });

  const barData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Total Appointments",
        data: monthlyAppointments,
        backgroundColor: "#2196F3",
        borderRadius: 5
      }
    ]
  };

  const lineData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Completed Appointments",
        data: completedAppointments,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="own-appoint-container">
      <h2 className="own-appoint-title">Garage Owner's Dashboard</h2>

      {appointments.length > 0 && (
        <div style={{ marginBottom: "30px", display: "flex", justifyContent: "center" }}>
          <div>
            <Typography variant="h6" gutterBottom align="center">
              Appointment Status Distribution
            </Typography>
            <PieChart
              series={[
                {
                  data: pieData,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: { additionalRadius: -10, color: "gray" }
                }
              ]}
              width={500}
              height={300}
            />
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        <div style={{ width: "450px", height: "300px" }}>
          <Typography variant="h6" gutterBottom align="center">
            Monthly Appointments
          </Typography>
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div style={{ width: "450px", height: "300px" }}>
          <Typography variant="h6" gutterBottom align="center">
            Completed Appointments Trend
          </Typography>
          <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="own-appoint-table-container" style={{ marginTop: "50px" }}>
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
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr key={appointment._id || index}>
                  <td>{appointment.userId?.fullName || "N/A"}</td>
                  <td>
                    {Array.isArray(appointment.serviceId)
                      ? appointment.serviceId.map((service) => service?.name).join(", ")
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
                  <td>{appointment.reason || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
