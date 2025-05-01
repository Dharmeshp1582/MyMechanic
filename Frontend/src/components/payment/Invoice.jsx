import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "../../assets/css/invoice.css";

export const Invoice = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [payment, setPayment] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    axios
      .get(`/appointment/getappointmentbyid/${id}`)
      .then((res) => {
        setAppointment(res.data.data);
        return axios.get(`/payment/getPaymentByAppointment/${id}`);
      })
      .then((res) => setPayment(res.data.data))
      .catch((err) => console.error("Error fetching invoice data:", err));
  }, [id]);

  const downloadInvoice = () => {
    const opt = {
      margin: 0.5,
      filename: `Mymechanic_${id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };
    html2pdf().from(invoiceRef.current).set(opt).save();
  };

  if (!appointment) {
    return <div className="invoice-loading">Loading invoice...</div>;
  }

  const {
    _id,
    appointmentDate,
    finalPrice,
    vehicleId,
    garageownerId,
    serviceId,
    isPaid
  } = appointment;

  return (
    <div className="invoice-container">
      <div className="invoice-actions">
        <button onClick={downloadInvoice} className="invoice-download-btn">
          📥 Download Invoice
        </button>
      </div>

      <div className="invoice-box" ref={invoiceRef}>
        <h1 className="invoice-header">My Mechanic Invoice</h1>
        <p className="invoice-subtext">Professional Auto Services</p>

        <div className="invoice-section">
          <h2>Invoice Details</h2>
          <p>
            <strong>Invoice ID:</strong> {_id}
          </p>
          <p>
            <strong>Appointment Date:</strong>{" "}
            {new Date(appointmentDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {isPaid ? "✅ Paid" : "❌ Unpaid"}
          </p>
          {payment && (
            <>
              <p>
                <strong>Order ID:</strong> {payment.razorpay_order_id}
              </p>
              <p>
                <strong>Payment ID:</strong> {payment.razorpay_payment_id}
              </p>
              <p>
                <strong>Payment Date:</strong>{" "}
                {new Date(payment.createdAt).toLocaleString()}
              </p>
            </>
          )}
        </div>

        {payment?.userId && (
          <div className="invoice-section">
            <h2>User Details</h2>
            <p>
              <strong>Name:</strong> {payment.userId.fullName}
            </p>
            <p>
              <strong>Email:</strong> {payment.userId.email}
            </p>
            <p>
              <strong>Contact:</strong> {payment.userId.contact}
            </p>
          </div>
        )}

        <div className="invoice-section">
          <h2>Vehicle Information</h2>

          <p>
            <strong>Model:</strong> {vehicleId?.model}
          </p>
          <p>
            <strong>License Plate:</strong> {vehicleId?.licensePlate}
          </p>
        </div>

        <div className="invoice-section">
          <h2>Garage Details</h2>
          <p>
            <strong>Garage Name:</strong> {garageownerId?.name}
          </p>
          <p>
            <strong>Garage Owner:</strong> {garageownerId?.userId?.fullName}
          </p>
        </div>

        <div className="invoice-section">
          <h2>Service Summary</h2>
          <ul>
            {serviceId?.map((service) => (
              <li key={service._id}>
                {service.name} - ₹{service.price}
              </li>
            ))}
          </ul>
        </div>

        <div className="invoice-total">
          <h2>Total Amount: ₹{finalPrice}</h2>
        </div>

        <div className="invoice-footer">
          <p>
            Thank you for choosing <strong>My Mechanic</strong> 🚗🔧
          </p>
          <p className="invoice-note">
            This invoice is generated digitally and does not require a
            signature. For questions, contact our support. <br />©{" "}
            {new Date().getFullYear()} My Mechanic. All rights reserved. |
            Privacy Policy & Terms Apply.
          </p>
        </div>
      </div>
    </div>
  );
};
