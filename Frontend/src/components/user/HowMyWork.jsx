import React from "react";
import { Car, Calendar, Eye, Gift } from "lucide-react"; // Importing icons

const steps = [
  {
    id: 1,
    title: "Select The Perfect Car Service",
    description: "From MyMechanic's broad portfolio of services",
    icon: <Car size={30} color="#1e3a8a" />,
  },
  {
    id: 2,
    title: "Schedule Free Doorstep Pick-up",
    description: "We offer free pick up and drop for all services booked",
    icon: <Calendar size={30} color="#1e3a8a" />,
  },
  {
    id: 3,
    title: "Track Your Car Service Real-Time",
    description: "We will take care of everything from here!",
    icon: <Eye size={30} color="#1e3a8a" />,
  },
  {
    id: 4,
    title: "Earn While We Service",
    description: "Spread the word! You get Rs.750. Your friends get Rs.750!",
    icon: <Gift size={30} color="#1e3a8a" />,
  },
];

export const HowMyWork = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        How MyMechanic Works?
      </h2>
      <div>
        {steps.map((step) => (
          <div
            key={step.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "20px",
              padding: "15px",
              borderRadius: "8px",
              background: "#f1f5f9",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                minWidth: "40px",
                height: "40px",
                borderRadius: "5px",
                backgroundColor: "#1e3a8a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#fff",
                fontSize: "18px",
              }}
            >
              {step.id}
            </div>
           
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: "bold", margin: "0" }}>{step.title}</p>
              <p style={{ margin: "5px 0 0", color: "#555" }}>{step.description}</p>
            </div>
            <div style={{textAlign:"right"}}>{step.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
