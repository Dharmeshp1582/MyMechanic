import { useEffect, useState } from "react";
import axios from "axios";

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
    return <h3 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h3>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>Garage Owner Dashboard</h2>

      {/* Stats Cards */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
        {[
          { title: "Total Services", value: service.length },
          {
            title: "Total Service Revenue",
            value: `$${service.reduce((acc, ser) => acc + ser.price, 0)}`
          },
          {
            title: "Pending Requests",
            value: service.filter((ser) => ser.availability === "false").length
          }
        ].map((item, index) => (
          <div
            key={index}
            style={{
              flex: "1",
              minWidth: "250px",
              backgroundColor: "#f4f4f4",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}
          >
            <h4 style={{ margin: "0", color: "#444" }}>{item.title}</h4>
            <h2 style={{ margin: "10px 0", color: "#333" }}>{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Services Table */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginBottom: "15px" }}>My Services</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#ddd" }}>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #aaa" }}>ID</th>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #aaa" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #aaa" }}>Description</th>
              <th style={{ padding: "10px", textAlign: "left", borderBottom: "2px solid #aaa" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {service.map((ser) => (
              <tr key={ser._id}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{ser._id}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{ser.name}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{ser.description}</td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>${ser.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
