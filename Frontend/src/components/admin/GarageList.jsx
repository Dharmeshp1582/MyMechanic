import { Box, Typography, CircularProgress, Paper, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

export const GarageList = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllGarages = async () => {
    try {
      const res = await axios.get("/garage/getallgarages");
      setGarages(res.data.data);
    } catch (err) {
      setError("Failed to load garages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this garage?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/garage/delete/${id}`);
      setGarages(garages.filter((garage) => garage._id !== id));
    } catch (err) {
      alert("Failed to delete garage");
    }
  };

  useEffect(() => {
    getAllGarages();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Garage Name", width: 200 },
    { field: "owner", headerName: "Owner Name", width: 200 },
    { field: "availability_status", headerName: "Availability", width: 150 },
    { field: "openingHours", headerName: "Opening Time", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row._id)}
          sx={{ textTransform: "none", fontWeight: "bold", borderRadius: 1 }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ textAlign: "center", mt: 4, px: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Garage List
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
          <DataGrid
            rows={garages}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            autoHeight
            getRowId={(row) => row._id}
          />
        </Paper>
      )}
    </Box>
  );
};
