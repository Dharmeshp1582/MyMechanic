import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20vw",
        width: "100vw",
        backgroundColor: "#f5f6fa",
        flexDirection: "column"
      }}
    >
      <h1 style={{ fontSize: "50px", color: "#ff6347" }}>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/home" style={{ textDecoration: "none", color: "#007bff" }}>
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
