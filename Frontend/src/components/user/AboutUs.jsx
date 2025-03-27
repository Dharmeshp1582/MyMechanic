import { motion } from 'framer-motion';
// import { FaTools, FaUserCheck, FaHistory, FaAward } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const AboutUs = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Master Mechanic",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "John has over 15 years of experience in automotive repair and is ASE certified in multiple specialties."
    },
    {
      name: "Jane Smith",
      role: "Service Manager",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Jane ensures that all service operations run smoothly and that our customers receive the best possible experience."
    },
    {
      name: "Mike Johnson",
      role: "Diagnostic Specialist",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      bio: "Mike specializes in advanced diagnostics and can troubleshoot even the most complex automotive issues."
    },
    {
      name: "Sarah Williams",
      role: "Customer Service Manager",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      bio: "Sarah is dedicated to ensuring that every customer has a positive experience with our garage."
    }
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f9fafb" }}>
      {/* Hero Section */}
      <section style={{
        background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
        color: "white",
        padding: "80px 20px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "10px" }}>About Us</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto", opacity: "0.9" }}>
          Discover our journey, our dedicated team, and our commitment to excellence in automotive service.
        </p>
      </section>

      {/* Our Story Section */}
      <section style={{ padding: "80px 20px", background: "white" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "40px", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div 
            style={{ flex: "1" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#111827", marginBottom: "20px" }}>Our Story</h2>
            <p style={{ fontSize: "1.1rem", color: "#4b5563", lineHeight: "1.6" }}>
              Established in 2005, My Mechanic started as a small workshop with a big vision—to bring transparency, 
              reliability, and quality to automotive repair. Over the years, our team has grown, our expertise has deepened, 
              and our services have evolved to meet modern demands.
            </p>
          </motion.div>
          <motion.div 
            style={{ flex: "1" }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1000&q=80" 
              alt="Garage workshop" 
              style={{ width: "100%", borderRadius: "15px", boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section style={{ padding: "80px 20px", background: "white" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#111827", marginBottom: "20px" }}>Meet Our Expert Team</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease-in-out",
                  cursor: "pointer"
                }}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ width: "100%", height: "280px", objectFit: "cover" }}
                />
                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1e3a8a" }}>{member.name}</h3>
                  <p style={{ fontSize: "1.1rem", fontWeight: "500", color: "#3b82f6", marginBottom: "10px" }}>{member.role}</p>
                  <p style={{ fontSize: "0.95rem", color: "#6b7280" }}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: "80px 20px",
        background: "linear-gradient(90deg, #3b82f6, #1e3a8a)",
        color: "white",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "10px" }}>Ready to Experience Excellence?</h2>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 20px", opacity: "0.9" }}>
          Schedule an appointment today and let us take care of your vehicle with precision and care.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
          <a href="/booking" style={{
            backgroundColor: "white",
            color: "#1e3a8a",
            fontWeight: "bold",
            padding: "12px 24px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(255,255,255,0.2)",
            textDecoration: "none",
            transition: "background 0.3s"
          }}>Book Now</a>
          <Link to="/user/contact" style={{
            border: "2px solid white",
            color: "white",
            fontWeight: "bold",
            padding: "12px 24px",
            borderRadius: "8px",
            transition: "background 0.3s"
          }}>Contact Us</Link>
        </div>
      </section>
    </div>
  );
};
