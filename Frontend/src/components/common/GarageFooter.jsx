// import React from 'react'
import { Link } from 'react-router-dom'

// Use after user login
export const GarageFooter = () => {
  return (
    <footer 
      className="bg-dark text-white text-center py-2" 
      style={{
        marginTop: "auto",
        width: "100%",
        position: "relative",
        bottom: "0",
        left: "0"
      }}
    >
      <div>
        <p className="mb-1">&copy; 2025 My Mechanic. All rights reserved.</p>
        <p className="mb-0" style={{ color: "gray", fontSize: "0.8rem" }}>
          <Link to="#" style={{ color: "grey", marginRight: "10px" }}>Privacy Policy</Link> |
          <Link to="#" style={{ color: "gray", marginLeft: "10px" }}>Terms of Service</Link>
        </p>
      </div>
    </footer>
  )
}
