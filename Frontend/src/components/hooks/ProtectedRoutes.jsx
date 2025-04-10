import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children , allowedRoles }) => {
    const role = localStorage.getItem("role"); // e.g., 'admin', 'garageowner', 'user'

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
