import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Payment = ({ appointmentId, userId, amount, onSuccess }) => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const [userDetails, setUserDetails] = useState(null);
  const [razorpayKey, setRazorpayKey] = useState("");


  useEffect(() => {
    const fetchKey = async () => {
      try {
        const res = await axios.get("/payment/getkey");
        setRazorpayKey(res.data.key);
      } catch (err) {
        console.error("Failed to fetch Razorpay key:", err);
      }
    };
  
    fetchKey();
  },[]);

  const handlePayment = async () => {
    const isScriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!isScriptLoaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    try {
      const orderRes = await axios.post("/payment/create_order", {
        amount,
        currency: "INR",
        receipt: `receipt_${appointmentId}`,
      });

      const orderData = orderRes.data;

      const options = {
        key: razorpayKey ,//use your key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "My Mechanic",
        description: "Service Payment",
        order_id: orderData.id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post("/payment/verify_order", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId,
              userId,
              amount: orderData.amount,
            });

            if (verifyRes.data.message.includes("successfully")) {
              toast.success("Payment successful!");
              if (onSuccess) onSuccess(); // Optional callback
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            toast.error("Server error verifying payment");
            console.error(err);
          }
        },

       prefill: {
          name: userDetails?.fullName || "Customer",
          email: userDetails?.email || "customer@example.com",
          contact: userDetails?.contact || "9999999999",},
        theme: {
          color: "#0d6efd",
        },
      };


      const razorpayObject = new window.Razorpay(options);
      razorpayObject.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment initiation failed.");
    }
  };

  // Get user info from backend using userId
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${userId}`);
        setUserDetails(res.data.data); // assuming your backend returns full user object
      } catch (err) {
        console.error("Failed to fetch user details", err);
        toast.error("Unable to fetch user details");
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  return (
    <button onClick={handlePayment} style={{ padding: "8px 16px", background: "#0d6efd", color: "#fff", border: "none", borderRadius: "4px" }}>
      Pay ₹{amount / 100}
    </button>
  );
};

export default Payment;