import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

export const GarageOwnerDashboard = () => {
  const [stats, setStats] = useState({});
  const [service, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          "/garage/getgaragebyuserid/" + localStorage.getItem("id")
        );
        console.log(res.data); //api response...
        setStats(res.data.data);
        const servicesResponse = await axios.get(
          "/service/getservicesbyuserid/" + localStorage.getItem("id")
        );

        setServices(servicesResponse.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <Typography align="center" variant="h6" sx={{ mt: 10 }}>
        Loading...
      </Typography>
    );

  return (
    <div>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Garage Owner Dashboard
        </Typography>

        <Grid container spacing={3} mb={3}>
          {[
            { title: "Total Services", value: service.length },
            {
              title: "Total Service Revenue",
              value: `$${service.reduce((acc, ser) => acc + ser.price, 0)}`
            },

            {
              title: "Pending Requests",
              value: service.filter((ser) => ser.availability === "false")
                .length
            }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="h4">{item.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box bgcolor="white" p={3} borderRadius={2} boxShadow={2}>
          <Typography variant="h5" gutterBottom>
            My Services
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {service.map((ser) => (
                <TableRow key={ser._id}>
                  <TableCell>{ser._id}</TableCell>
                  <TableCell>{ser.name}</TableCell>
                  <TableCell>{ser.description}</TableCell>
                  <TableCell>{ser.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </div>
  );
};
