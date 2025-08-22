import { Link, useNavigate } from "react-router-dom";

const PageNotFound = () => {

  const navigate = useNavigate();

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
      <p onClick={() => navigate(-1)} style={{ textDecoration: "none", color: "#007bff", cursor: "pointer" }}>
        Go to Home
      </p>
    </div>
  );
};

export default PageNotFound;
