import { useEffect, useState } from "react";

function LogisticsDashboard() {
  const [donations, setDonations] = useState([]);

  // Load all donations that are Approved or Delivered
  const loadDonations = () => {
    const allDonations = JSON.parse(localStorage.getItem("donations")) || [];
    const visibleDonations = allDonations.filter(
      donation => donation.status === "Approved" || donation.status === "Delivered"
    );
    setDonations(visibleDonations);
  };

  useEffect(() => {
    loadDonations();

    // Listen for localStorage changes (Admin approves or another logistics updates)
    const handleStorageChange = (event) => {
      if (event.key === "donations") loadDonations();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const markDelivered = (id) => {
    const allDonations = JSON.parse(localStorage.getItem("donations")) || [];
    const updatedAll = allDonations.map(donation =>
      donation.id === id ? { ...donation, status: "Delivered" } : donation
    );
    localStorage.setItem("donations", JSON.stringify(updatedAll));
    loadDonations();
  };

  return (
    <div className="container mt-4">
      <h3>Approved Donations</h3>

      {donations.length === 0 ? (
        <p>No approved or delivered donations available.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {donations.map(donation => (
              <tr key={donation.id}>
                <td>{donation.item}</td>
                <td>{donation.quantity}</td>
                <td>
                  {donation.status === "Approved" ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => markDelivered(donation.id)}
                    >
                      Mark Delivered
                    </button>
                  ) : (
                    <span className="badge bg-success">Delivered</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LogisticsDashboard;