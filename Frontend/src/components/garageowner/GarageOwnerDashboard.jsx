import { Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../../assets/css/garageownerdashboard.css"
import { Link } from 'react-router-dom';

export const GarageOwnerDashboard = () => {

  const [appointments, setAppointments] = useState([]);
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [servicesCount,setServicesCount] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0);
  const userId = localStorage.getItem("id");


  const fetchRevenue = async () => {
    try {
      const res = await axios.get(`/payment/getgarageownerpayments/${userId}`);
      setTotalRevenue(res.data.totalRevenue || 0);
    } catch (error) {
      console.error("Error fetching revenue:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/appointment/getappointmentsbygarageowneruserid/${userId}`);
      setAppointments(response.data.data);
      setAppointmentsCount(response.data.data.length)
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } 
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(`/service/getservicesbyuserid/${userId}`);
      setServicesCount(response.data.data.length)
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } 
  };

  useEffect(() => {
    fetchAppointments();
    fetchServices();
    fetchRevenue();
  }, []);

  // 📊 Count statuses for PieChart
  const statusCount = appointments.reduce((acc, appt) => {
    acc[appt.status] = (acc[appt.status] || 0) + 1;
    return acc;
  }, {});

  // 🎨 Define status colors
  const statusColors = {
    pending: "#FFA500",
    booked: "#4CAF50",
    inProgress: "#2196F3",
    completed: "#9C27B0", 
    rejected: "#F44336",
  };

  const pieData = Object.entries(statusCount).map(([status, count], index) => ({
    id: index,
    value: count,
    label: status,
    color: statusColors[status] || undefined,
  }));


  return (
    <div className="" style={{minHeight:"80%", padding:"0px 8px",backgroundColor:"rgb(220, 225, 245)"}} >
      
      <div className="garown-dash-header">
        <div className="garown-dash-container">
          <div className="garown-dash-row">
            <div className="garown-dash-col-left">
              <h3 className="garown-dash-title">GarageOwner Dashboard</h3>
            </div>
            <div className="garown-dash-col-right">
              <ol className="garown-dash-breadcrumb">
                <li className="garown-dash-breadcrumb-item"><a href="#">Home</a></li>
                <li className="garown-dash-breadcrumb-item active">GarageOwner Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="garown-dash-container">
        <div className="garown-dash-row garown-dash-stats-row">

          {/* Available Services */}
          <div className="garown-dash-box">
            <div className="garown-dash-box-inner garown-dash-blue-1">
              <div className="garown-dash-box-content">
                <h3>{servicesCount}</h3>
                <p>Available Services</p>
              </div>
              <div className="garown-dash-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1v22M4.93 4.93l14.14 14.14M1 12h22M4.93 19.07l14.14-14.14" />
                </svg>
              </div>
              <Link to="availableservice" className="garown-dash-footer">More info</Link>
            </div>
          </div>

          {/* Active Bookings */}
          <div className="garown-dash-box">
            <div className="garown-dash-box-inner garown-dash-blue-2">
              <div className="garown-dash-box-content">
                <h3>{appointmentsCount}</h3>
                <p>Active Bookings</p>
              </div>
              <div className="garown-dash-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <Link to="servicerequest" className="garown-dash-footer">More info</Link>
            </div>
          </div>

          {/* Customer Rating */}
          <div className="garown-dash-box">
            <div className="garown-dash-box-inner garown-dash-blue-3">
              <div className="garown-dash-box-content">
                <h3>4.7</h3>
                <p>Customer Rating</p>
              </div>
              <div className="garown-dash-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15 10 22 10 17 14 19 21 12 17 5 21 7 14 2 10 9 10 12 2" />
                </svg>
              </div>
              <a href="#" className="garown-dash-footer">More info</a>
            </div>
          </div>

          {/* Monthly Earnings */}
          <div className="garown-dash-box">
            <div className="garown-dash-box-inner garown-dash-blue-4">
              <div className="garown-dash-box-content">
                <h3>₹ {(totalRevenue / 100).toFixed(2)}</h3>
                <p>Monthly Earnings</p>
              </div>
              <div className="garown-dash-icon-wrapper">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="white" fontFamily="Arial, sans-serif">
                    ₹
                  </text>
                </svg>
              </div>
              <Link to="earning" className="garown-dash-footer">More info</Link>
            </div>
          </div>

        </div>
      </div>



<h2 className="own-appoint-title">Garage Owner's Appointments</h2>

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
            faded: { additionalRadius: -10, color: "gray" },
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  </div>
)}

    </div>
  );
};