import { Typography } from "@mui/material";
import { PieChart as MuiPieChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart as RechartsPieChart,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Pie,
  Cell
} from "recharts";

import dayjs from "dayjs";
import "../../assets/css/AdminDashboard.css";

export const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  // const [garage, setGarages] = useState([]);
  const [garageCount, setGarageCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueData, setRevenueData] = useState([]);

  const [data, setData] = useState([
    { name: "Active", value: 0 },
    { name: "Inactive", value: 0 }
  ]);

  const fetchUsersChart = async () => {
    try {
      const res = await axios.get("/users");
      const users = res.data.data;
      const active = users.filter((user) => user.status).length;
      const inactive = users.length - active;

      setData([
        { name: "Active", value: active },
        { name: "Inactive", value: inactive }
      ]);
    } catch (error) {
      console.error("Error fetching user stats", error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const res = await axios.get("/payment/gettotalrevenue");
      setTotalRevenue(res.data.totalRevenue);
    } catch (err) {
      console.error("Error fetching revenue:", err);
    }
  };

  const fetchRevenueChartData = async () => {
    try {
      const res = await axios.get("/payment/getrevenuechartdata");
      const rawData = res.data.map((item) => ({
        date: item.date,
        revenue: item.total / 100 // Convert paise to ₹
      }));

      // Step 1: Create a map of date => revenue
      const dataMap = new Map(rawData.map((item) => [item.date, item.revenue]));

      // Step 2: Generate last 7 days (or any range you want)
      const lastNDays = 7;
      const filledData = [];

      for (let i = lastNDays - 1; i >= 0; i--) {
        const date = dayjs().subtract(i, "day").format("YYYY-MM-DD");
        filledData.push({
          date,
          revenue: dataMap.get(date) || 0
        });
      }

      setRevenueData(filledData);
    } catch (err) {
      console.error("Error fetching revenue chart data:", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/appointment/getappointment`);
      setAppointments(response.data.data);
      setAppointmentsCount(response.data.data.length);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchGarages = async () => {
    try {
      const response = await axios.get(`/garage/getallgarages`);
      // setGarages(response.data.data);
      setGarageCount(response.data.data.length);
    } catch (error) {
      console.error("Error fetching Garages:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/users`);
      setUserCount(response.data.data.length);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchGarages();
    fetchUsers();
    fetchRevenue();
    fetchRevenueChartData();
    fetchUsersChart();
  }, []);

  // const COLORS = ["#28a745", "#dc3545"];
  const COLORS = ["#007bff", "#0056b3"]; // Blue shades for the theme

  // 📊 Count statuses for PieChart
  const statusCount = appointments.reduce((acc, appt) => {
    acc[appt.status] = (acc[appt.status] || 0) + 1;
    return acc;
  }, {});

  const statusColors = {
    pending: "#4FC3F7",
    booked: "#81D4FA",
    inProgress: "#64B5F6",
    completed: "#42A5F5",
    rejected: "#2196F3"
  };
  // const statusColors = {
  //   pending: "#BBDEFB",
  //   booked: "#64B5F6",
  //   inProgress: "#42A5F5",
  //   completed: "#2196F3",
  //   rejected: "#1565C0",
  // };
  // const statusColors = {
  //   pending: "#1976D2",
  //   booked: "#1565C0",
  //   inProgress: "#0D47A1",
  //   completed: "#2196F3",
  //   rejected: "#1E88E5",
  // };

  const pieData = Object.entries(statusCount).map(([status, count], index) => ({
    id: index,
    value: count,
    label: status,
    color: statusColors[status] || undefined
  }));

  return (
    <div style={{ minHeight: "90%" }}>
      <div className="app-content">
        <div className="admin-dash-header">
          <div className="admin-dash-container">
            <div className="admin-dash-row">
              <div className="admin-dash-col-left">
                <h3 className="admin-dash-title">Admin Dashboard</h3>
              </div>
              <div className="admin-dash-col-right">
                <ol className="admin-dash-breadcrumb">
                  <li className="admin-dash-breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="admin-dash-breadcrumb-item active">
                    Admin Dashboard
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-dash-container">
          <div className="admin-dash-row admin-dash-stats-row">
            {/* Total Garages */}
            <div className="admin-dash-box">
              <div className="admin-dash-box-inner admin-dash-blue-1">
                <div className="admin-dash-box-content">
                  <h3>{garageCount}</h3>
                  <p>Total Garages</p>
                </div>
                <div className="admin-dash-icon-wrapper">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <Link to="garagelist" className="admin-dash-footer">
                  More info
                </Link>
              </div>
            </div>

            {/* Registered Users */}
            <div className="admin-dash-box">
              <div className="admin-dash-box-inner admin-dash-blue-2">
                <div className="admin-dash-box-content">
                  <h3>{userCount}</h3>
                  <p>Registered Users</p>
                </div>
                <div className="admin-dash-icon-wrapper">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <Link to="manage" className="admin-dash-footer">
                  More info
                </Link>
              </div>
            </div>

            {/* Active Bookings */}
            <div className="admin-dash-box">
              <div className="admin-dash-box-inner admin-dash-blue-3">
                <div className="admin-dash-box-content">
                  <h3>{appointmentsCount}</h3>
                  <p>Active Bookings</p>
                </div>
                <div className="admin-dash-icon-wrapper">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <Link to="appointment" className="admin-dash-footer">
                  More info
                </Link>
              </div>
            </div>

            {/* Total Earnings */}
            <div className="admin-dash-box">
              <div className="admin-dash-box-inner admin-dash-blue-4">
                <div className="admin-dash-box-content">
                  <h3>₹{(totalRevenue / 100).toFixed(2)}</h3>
                  <p>Total Earnings</p>
                </div>
                <div className="admin-dash-icon-wrapper">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontSize="20"
                      fill="white"
                      fontFamily="Arial, sans-serif"
                    >
                      ₹
                    </text>
                  </svg>
                </div>
                <Link to="payment" className="admin-dash-footer">
                  More info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        {appointments.length > 0 && (
          <div className="admin-dash-piecharts">
            <h2 className="own-appoint-title">Booking Appointments</h2>
            <Typography variant="h6" gutterBottom align="center">
              Appointment Status Distribution
            </Typography>
            <MuiPieChart
              className="admin-dash-mui-pie"
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
        )}

      <div className="admin-userchart-container">
  <h3 className="admin-userchart-title">Active Users Overview</h3>
  <div className="admin-userchart-content-responsive">
    <div className="admin-userchart-chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius="80%"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>

    <div className="admin-userchart-legend">
      {data.map((entry, index) => (
        <div key={index} className="admin-userchart-legend-item">
          <span
            className="admin-userchart-legend-color"
            style={{ backgroundColor: COLORS[index] }}
          />
          {entry.name}
        </div>
      ))}
    </div>
  </div>
</div>

      </div>

      <div className="admin-revenue-container">
        <h2 className="admin-revenue-title">Daily Revenue Overview</h2>
        <p className="admin-revenue-subtitle">
          Daily revenue from successful payments (in ₹)
        </p>
        <div className="admin-revenue-chart">
          <ResponsiveContainer>
            <LineChart
              data={revenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#00BFFF" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#1E90FF" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `₹${value}`} />
              <Tooltip
                formatter={(value) => [`₹${value.toFixed(2)}`, "Revenue"]}
                labelStyle={{ color: "#555" }}
                contentStyle={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "5px"
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="url(#revenueGradient)"
                strokeWidth={3}
                dot={{ stroke: "#8884d8", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
