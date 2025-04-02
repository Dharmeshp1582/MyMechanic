import { useState } from "react";

const faqs = [
  {
    question:
      "Why should I choose MyMechanic over other service providers in Ahmedabad?",
    answer:
      "MyMechanic provides top-quality car services with expert mechanics, genuine spare parts, and affordable pricing. We ensure customer satisfaction with doorstep pickup and drop services."
  },
  {
    question: "How can I book my car service with MyMechanic in Ahmedabad?",
    answer:
      "You can book your car service through our website or mobile app in just a few clicks. Choose your service, select a time slot, and confirm your booking."
  },
  {
    question: "What kind of car services can I avail with MyMechanic?",
    answer:
      "You can choose from a wide range of services such as periodic maintenance, AC servicing, battery replacement, tyre care, denting & painting, and much more."
  },
  {
    question: "What are the basic charges for my car service in Ahmedabad?",
    answer:
      "The charges depend on the type of service and your car model. You can check the price list on our website before booking."
  },
  {
    question: "Do I have to drop my car to the workshop?",
    answer:
      "No, MyMechanic offers free pickup and drop services for your convenience. Our team will collect and return your car after servicing."
  },
  {
    question: "What if I am not satisfied with my car service?",
    answer:
      "Customer satisfaction is our priority. If you're not happy with the service, we offer free rework within a specified period."
  }
];

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "10px auto",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        background: "#fff",
        cursor: "pointer"
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "16px",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left"
        }}
      >
        <span style={{ flex: 1 }}>{faq.question}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <p style={{  fontWeight: "bold",
          fontSize: "16px",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left",
          backgroundColor:"#f9f9f9"}}>
          {faq.answer}
        </p>
      )}
    </div>
  );
};

export const Faqs = () => {
  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <FAQItem key={index} faq={faq} />
      ))}
    </div>
  );
};
