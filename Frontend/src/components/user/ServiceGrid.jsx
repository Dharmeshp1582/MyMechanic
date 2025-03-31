
const services = [
  {
    name: "Periodic Services",
    icon: "📅",
    details: "Regular car maintenance and checkups."
  },
  {
    name: "AC Service & Repair",
    icon: "❄️",
    details: "AC gas refilling, cooling check, and repairs."
  },
  {
    name: "Batteries",
    icon: "🔋",
    details: "Battery replacement and charging solutions."
  },
  {
    name: "Tyres & Wheel Care",
    icon: "🚗",
    details: "Tyre replacement, alignment, and balancing."
  },
  {
    name: "Denting & Painting",
    icon: "🛠️",
    details: "Body repair, scratch removal, and painting."
  },
  {
    name: "Detailing Services",
    icon: "🔧",
    details: "Interior and exterior car detailing."
  },
  {
    name: "Car Spa & Cleaning",
    icon: "🧽",
    details: "Car washing, vacuuming, and polishing."
  },
  {
    name: "Car Inspections",
    icon: "📋",
    details: "Full vehicle health checkup.",
    isNew: true
  },
  {
    name: "Windshields & Lights",
    icon: "🚦",
    details: "Windshield repair and light replacements.",
    isNew: true
  },
  {
    name: "Suspension & Fitments",
    icon: "⚙️",
    details: "Suspension system check and repairs."
  },
  {
    name: "Engine Diagnostics",
    icon: "🔍",
    details: "Engine performance analysis and troubleshooting."
  },
  {
    name: "Brake Repair & Service",
    icon: "🛑",
    details: "Brake pad replacement and fluid check."
  }
];

const ServiceCard = ({ service }) => (
  <div
    style={{
      width: "310px",
      height: "280px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
      margin: "10px",
      position: "relative",
      padding: "5px",
      textAlign: "center"
    }}
  >
    {service.isNew && (
      <span
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          backgroundColor: "#4CAF50",
          color: "white",
          fontSize: "12px",
          // padding: "2px 6px",
          borderRadius: "5px"
        }}
      >
        New
      </span>
    )}
    <div style={{ fontSize: "70px" }}>{service.icon}</div>
    <p
      style={{
        marginTop: "10px",
        fontSize: "20px",
        fontWeight: "bold",
        color: "black"
      }}
    >
      {service.name}
    </p>
    <p
      style={{
        fontSize: "17px",
        marginTop: "2px",
        marginBottom: "5px",
        color: "black"
      }}
    >
      {service.details}
    </p>
    <br />
  </div>
);

const ServicesGrid = () => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: "20px"
    }}
  >
    {services.map((service, index) => (
      <ServiceCard key={index} service={service} />
    ))}
  </div>
);

export default ServicesGrid;
