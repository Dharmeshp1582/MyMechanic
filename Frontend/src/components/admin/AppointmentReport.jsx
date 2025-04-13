import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/appointments.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const AppointmentReport = () => {
  const [appointments, setAppointments] = useState([]);
  const [earningsData, setEarningsData] = useState({ labels: [], datasets: [] });

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/appointment/getappointment`);
      const data = response.data.data;
      setAppointments(data);
      generateEarningsChart(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const generateEarningsChart = (appointments) => {
    const monthlyCompleted = {};
    const monthlyPending = {};

    appointments.forEach((appointment) => {
      const date = new Date(appointment.appointmentDate);
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      const key = `${month} ${year}`;
      const price = appointment.finalPrice || 0;

      if (appointment.status === "completed") {
        monthlyCompleted[key] = (monthlyCompleted[key] || 0) + price;
      } else if (
        appointment.status === "pending" ||
        appointment.status === "booked" ||
        appointment.status === "inProgress"
      ) {
        monthlyPending[key] = (monthlyPending[key] || 0) + price;
      }
    });

    const allMonths = Array.from(
      new Set([...Object.keys(monthlyCompleted), ...Object.keys(monthlyPending)])
    ).sort((a, b) => new Date("1 " + a) - new Date("1 " + b));

    const completedValues = allMonths.map((month) => monthlyCompleted[month] || 0);
    const pendingValues = allMonths.map((month) => monthlyPending[month] || 0);

    setEarningsData({
      labels: allMonths,
      datasets: [
        {
          label: "Completed Earnings (₹)",
          data: completedValues,
          backgroundColor: "#4CAF50",
          borderRadius: 5,
        },
        {
          label: "Pending Earnings (₹)",
          data: pendingValues,
          backgroundColor: "#FF9800",
          borderRadius: 5,
        },
      ],
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="own-appoint-container">
      <h2 className="own-appoint-title">Total Appointments Overview</h2>

      <div style={{ margin: "2rem 0" }} className="own-earningdata">
        <h3 style={{ textAlign: "center" }}>Earnings Overview</h3>
        <Bar data={earningsData} />
      </div>

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
                  <td>{appointment.finalPrice}</td>
                  <td>{appointment.reason || "N/A"}</td>
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
