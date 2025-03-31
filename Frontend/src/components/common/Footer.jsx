// import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-2" style={{
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%"
    }}>
        <div className="">
          <p className="mb-1">&copy; 2025 My Mechanic. All rights reserved.</p>
          <p className="mb-0" style={{color:"gray", fontSize:"0.8rem"}}>
            <Link to="#" class=" me-3" style={{color:"grey"}}>Privacy Policy</Link> |
            <Link to="#" class=" ms-3" style={{color:"gray"}}>Terms of Service</Link>
          </p>
        </div>
      </footer>
  )
}