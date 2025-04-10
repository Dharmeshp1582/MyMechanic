import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

export const BookingReports = () => {
  const [appointmentData, setAppointmentData] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/appointment/getappointment");
      const result = await response.json();
      if (result.data) {
        setAppointmentData(result.data);
      } else {
        console.error("Error fetching appointments:", result.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);


  const totalAppointments = appointmentData.length;
  const pendingCount = appointmentData.filter((a) => a.status === "pending").length;
  const confirmedCount = appointmentData.filter((a) => a.status === "confirmed").length;
  const completedCount = appointmentData.filter((a) => a.status === "completed").length;
  const cancelledCount = appointmentData.filter((a) => a.status === "cancelled").length;

  const totalRevenue = appointmentData.reduce((sum, a) => sum + (a.finalPrice || 0), 0);

  return (
    <Box className="report-container">
      <Typography variant="h4" className="report-title">
        Appointment Report
      </Typography>

      {/* Info Cards */}
      <Grid container spacing={3} justifyContent="center">
        {[
          { label: "Total Appointments", value: totalAppointments },
          { label: "Pending", value: pendingCount },
          { label: "Confirmed", value: confirmedCount },
          { label: "Completed", value: completedCount },
          { label: "Cancelled", value: cancelledCount },
          { label: "Total Revenue", value: `₹${totalRevenue}` },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="report-card">
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  {item.label}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <div className="chart-section">
        <div className="chart-box">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: pendingCount, label: "Pending" },
                  { id: 1, value: confirmedCount, label: "Confirmed" },
                  { id: 2, value: completedCount, label: "Completed" },
                  { id: 3, value: cancelledCount, label: "Cancelled" },
                ],
                innerRadius: 50,
                outerRadius: 110,
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelRadius: 130,
              },
            ]}
            width={350}
            height={350}
          />
        </div>

        <div className="chart-box">
          <PieChart
            series={[
              {
                data: appointmentData.map((a, i) => ({
                  id: i,
                  value: typeof a.finalPrice === "number" ? a.finalPrice : 0,
                  label: `${a.userId?.fullName ?? "User"} - ₹${a.finalPrice ?? 0}`,
                })),
                innerRadius: 60,
                outerRadius: 120,
                arcLabel: (item) => item.label,
                arcLabelRadius: 140,
              },
            ]}
            width={350}
            height={350}
          />
        </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper} className="booking-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Garage</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Final Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentData.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell>{appointment.userId?.fullName ?? "N/A"}</TableCell>
                <TableCell>{appointment.vehicleId?.model ?? "N/A"}</TableCell>
                <TableCell>{appointment.garageownerId?.name ?? "N/A"}</TableCell>
                <TableCell>
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </TableCell>
                <TableCell>₹{appointment.finalPrice ?? 0}</TableCell>
                <TableCell>{appointment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
