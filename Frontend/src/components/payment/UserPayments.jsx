import  { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/userpayment.css";

export const UserPayments = () => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const paymentsPerPage = 10;

    useEffect(() => {
        const userId = localStorage.getItem("id");
        if (!userId) return;

        axios
            .get(`/payment/getPaymentsByUser/${userId}`)
            .then((res) => setPayments(res.data.data))
            .catch((err) => console.error("Error fetching payment data:", err));
    }, []);

    const indexOfLast = currentPage * paymentsPerPage;
    const indexOfFirst = indexOfLast - paymentsPerPage;
    const currentPayments = payments.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(payments.length / paymentsPerPage);

    const changePage = (page) => setCurrentPage(page);

    return (
        <div className="userpay-container">
            <h2 className="userpay-title">Your Payment History</h2>

            <table className="userpay-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Garage Owner</th>
                        <th>Service(s)</th>
                        <th>Vehicle</th>
                        <th>Amount (₹)</th>
                        <th>Order ID</th>
                        <th>Payment ID</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPayments.map((payment, index) => {
                        const { appointmentId } = payment;
                        const garageName = appointmentId?.garageownerId?.name || "N/A";
                        const services = appointmentId?.serviceId || [];
                        const vehicle = appointmentId?.vehicleId;

                        return (
                            <tr key={payment._id}>
                                <td>{indexOfFirst + index + 1}</td>
                                <td>{garageName}</td>
                                <td>{services.map(s => s?.name).join(", ")}</td>
                                <td>
                                    {vehicle
                                        ?  `${vehicle.model} (${vehicle.licensePlate})`
                                        : "N/A"}
                                </td>
                                <td>₹{(payment.amount / 100).toFixed(2)}</td>
                                <td>{payment.razorpay_order_id}</td>
                                <td>{payment.razorpay_payment_id}</td>
                                <td><span className="userpay-paid">Paid</span></td>
                                <td>{new Date(payment.createdAt).toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="userpay-pagination">
                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num}
                            className={`userpay-page-btn ${currentPage === num + 1 ? "active" : ""}`}
                            onClick={() => changePage(num + 1)}
                        >
                            {num + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

