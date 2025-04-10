export const Unauthorized = () => {


  return(
  <div
    style={{
       display: "flex", justifyContent: "center", alignItems: "center",
      height: "20vw", width: "100vw", backgroundColor: "#f5f6fa",flexDirection:"column"
    }}
  >
    <h2>403 - Unauthorized</h2>
    <p>You do not have permission to access this page.</p>
    <p style={{ marginTop: "1rem", color: "blue", cursor: "pointer" }}>Go Back</p>
  </div>

)
}