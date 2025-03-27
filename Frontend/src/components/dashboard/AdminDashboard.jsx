// import React from "react";
import { Box, Typography, Grid, Paper, Card, CardContent } from "@mui/material";
import { People, Business, HourglassBottom } from "@mui/icons-material";

// Hardcoded Dashboard Data
const stats = {
  totalUsers: 150,
  totalGarages: 35,
  pendingRequests: 7,
  recentActivities: [
    "User Alex Johnson registered",
    "New Garage added: SpeedFix Auto",
    "Admin approved 5 pending requests",
    "User Emma Watson booked a service",
    "Garage XYZ updated service prices",
  ],
};

export const AdminDashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
        🚗 Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: 2,
              backgroundImage: "url('https://source.unsplash.com/300x200/?team,people')",
              backgroundSize: "cover",
              color: "white",
              textAlign: "center",
              height: 140,
            }}
          >
            <CardContent>
              <People fontSize="large" />
              <Typography variant="h6" fontWeight="bold">
                {stats.totalUsers}
              </Typography>
              <Typography variant="body2">Total Users</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: 2,
              backgroundImage: "url('https://source.unsplash.com/300x200/?mechanic,garage')",
              backgroundSize: "cover",
              color: "white",
              textAlign: "center",
              height: 140,
            }}
          >
            <CardContent>
              <Business fontSize="large" />
              <Typography variant="h6" fontWeight="bold">
                {stats.totalGarages}
              </Typography>
              <Typography variant="body2">Total Garages</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: 2,
              backgroundImage: "url('https://source.unsplash.com/300x200/?clock,time')",
              backgroundSize: "cover",
              color: "white",
              textAlign: "center",
              height: 140,
            }}
          >
            <CardContent>
              <HourglassBottom fontSize="large" />
              <Typography variant="h6" fontWeight="bold">
                {stats.pendingRequests}
              </Typography>
              <Typography variant="body2">Pending Requests</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activities */}
      <Paper sx={{ mt: 4, p: 3, boxShadow: 3, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📢 Recent Activities
        </Typography>
        <ul>
          {stats.recentActivities.map((activity, index) => (
            <li key={index}>
              <Typography variant="body2" color="textSecondary">
                {activity}
              </Typography>
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
};


