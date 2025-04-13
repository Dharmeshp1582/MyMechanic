import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../assets/css/manageuser.css";

export const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

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
                fetchUsers();
            } catch (error) {
                toast.error("Error deleting user");
            }
        }
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
                                    {/* Uncomment below if delete button is needed */}
                                    {/* <button
                                        className="admin-userlist-deletebtn"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button> */}
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
        </div>
    );
};
