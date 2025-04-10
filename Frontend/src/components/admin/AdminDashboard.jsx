import { Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import axios from 'axios';
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../../assets/css/admindashboard.css"

export const AdminDashboard = () => {

    const [appointments, setAppointments] = useState([]);
    // const [garage, setGarages] = useState([]);
    const [garageCount, setGarageCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const[appointmentsCount, setAppointmentsCount] = useState(0)
  
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointment/getappointment");
        setAppointments(response.data.data);
        setAppointmentsCount(response.data.data.length)
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } 
    };

    const fetchGarages = async () => {
      try {
        const response = await axios.get("/garage/getallgarages");
        // setGarages(response.data.data);
        setGarageCount(response.data.data.length); 
      } catch (error) {
        console.error("Error fetching Garages:", error);
      } 
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUserCount(response.data.data.length)
        
      } catch (error) {
        console.error("Error fetching Users:", error);
      } 
    };
  
    useEffect(() => {
      fetchAppointments();
      fetchGarages();
      fetchUsers();
      
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
    <div style={{minHeight:"90%"}}>
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
          <li className="admin-dash-breadcrumb-item active">Admin Dashboard</li>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <Link to="garagelist" className="admin-dash-footer">More info</Link>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M7 21v-2a4 4 0 0 1 3-3.87"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <Link to="manage" className="admin-dash-footer">More info</Link>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <Link to="appointment" className="admin-dash-footer">More info</Link>
      </div>
    </div>

    {/* Total Earnings */}
    <div className="admin-dash-box">
      <div className="admin-dash-box-inner admin-dash-blue-4">
        <div className="admin-dash-box-content">
          <h3>₹5,420</h3>
          <p>Total Earnings</p>
        </div>
        {/* <div className="admin-dash-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div> */}
        <div className="admin-dash-icon-wrapper">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="white" fontFamily="Arial, sans-serif">
      ₹
    </text>
  </svg>
</div>
        <a href="#" className="admin-dash-footer">More info</a>
      </div>
    </div>
  </div>
</div>



      </div>

<h2 className="own-appoint-title">Booking Appointments</h2>

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
  )
}