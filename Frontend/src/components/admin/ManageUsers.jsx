import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/users/${id}`)
      .then(() => {alert("User deleted success?")
        setUsers(users.filter((user) => 
          user._id !== id));
      })
      .catch(() => {
        setError("Failed to delete user");
      });
  };

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 4,
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f8f9fa",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}>
        Manage Users
      </Typography>
      <Table>
        <TableHead sx={{ backgroundColor: "#1976d2" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Role</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user._id}
              sx={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f1f1f1" }}
            >
              <TableCell>{user.roleId?.name || "N/A"}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(user._id)}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: 1,
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
