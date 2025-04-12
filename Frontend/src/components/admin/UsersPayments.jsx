import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/alluserpayments.css";

const UsersPayments = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("/payment/getallpayments");
        setPayments(res.data.data);
        setFiltered(res.data.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filteredData = payments.filter((item) => {
      const user = item.userId?.fullName?.toLowerCase();
      const serviceNames = item.appointmentId?.serviceId
        ?.map((s) => s.name.toLowerCase())
        .join(" ");
      const appointmentDate = new Date(
        item.appointmentId?.appointmentDate
      ).toLocaleDateString();

      return (
        user?.includes(term) ||
        serviceNames?.includes(term) ||
        appointmentDate?.includes(term)
      );
    });
    setFiltered(filteredData);
  }, [searchTerm, payments]);

  const totalRevenue = filtered.reduce(
    (acc, item) => acc + (item.amount || 0),
    0
  );

  return (
    <div className="admin-user-pay-container">
      <h2 className="admin-user-pay-heading">All User Payments</h2>

      <input
        type="text"
        className="admin-user-pay-search"
        placeholder="Search by user name, service, or date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="admin-user-pay-table-wrapper">
        <table className="admin-user-pay-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Appointment Date</th>
              <th>Service</th>
              <th>Garage</th>
              <th>Vehicle</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Paid On</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((payment) => {
              const appointment = payment.appointmentId;
              const serviceList = appointment?.serviceId
                ?.map((s) => s.name)
                .join(", ");
              const vehicle = appointment?.vehicleId;
              const garage = appointment?.garageownerId;
              const user = payment.userId;

              return (
                <tr key={payment._id}>
                  <td>{user?.fullName}</td>
                  <td>{user?.contact}</td>
                  <td>
                    {new Date(appointment?.appointmentDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                      }
                    )}
                  </td>

                  <td>{serviceList}</td>
                  <td>{garage?.name}</td>
                  <td>{vehicle?.model}</td>
                  <td>₹{payment.amount / 100}</td>
                  <td
                    style={{
                      color: payment.status === "success" ? "green" : "red"
                    }}
                  >
                    {payment.status}
                  </td>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="admin-user-pay-total">
        <strong>Total Revenue: ₹{(totalRevenue / 100).toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default UsersPayments;
