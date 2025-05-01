import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../assets/css/manageuser.css";
import { Avatar } from "@mui/material";

export const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/users");
            setUsers(res.data.data);
        } catch (error) {
            toast.error("Failed to fetch users");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`/users/${id}`);
                toast.success("User deleted successfully");

                //  Close modal after deletion
                setShowModal(false);
                setSelectedUser(null);

                //  Refresh user list
                fetchUsers();
            } catch (error) {
                toast.error("Error deleting user");
            }
        }
    };

    const handleShowDetails = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="admin-userlist-container">
            <h2>Registered Users</h2>
            <div className="admin-userlist-table-wrapper">
                <table className="admin-userlist-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact No</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user._id}>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.contact}</td>
                                <td>{user.roleId?.name || "N/A"}</td>
                                <td>{user.status ? "Active" : "Inactive"}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        style={{
                                            marginLeft: "8px",
                                            backgroundColor: "#007bff",
                                            color: "white",
                                            padding: "5px 10px",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => handleShowDetails(user)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="admin-userlist-pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={`pagination-btn ${currentPage === i + 1 ? "active" : ""}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* User Details Modal */}
            {showModal && selectedUser && (
                <div className="admin-userlist-modal">
                    <div className="admin-userlist-modal-content">
                        <h3>User Details</h3>

                        <Avatar
                            alt={selectedUser?.fullName || "User"}
                            src={selectedUser?.imageURL || "/default-avatar.png"}
                            sx={{ width: 80, height: 80, margin: "10px auto", border: "2px solid black", cursor: "pointer" }}
                        />

                        <p><strong>Name:</strong> {selectedUser.fullName}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Contact:</strong> {selectedUser.contact}</p>
                        <p><strong>Role:</strong> {selectedUser.roleId?.name || "N/A"}</p>
                        <p><strong>Status:</strong> {selectedUser.status ? "Active" : "Inactive"}</p>
                        <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>

                        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                            <button
                                style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    padding: "8px 16px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginRight: "10px"
                                }}
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>

                            <button
                                className="admin-userlist-deletebtn"
                                onClick={() => handleDelete(selectedUser._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
