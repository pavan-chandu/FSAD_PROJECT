import { useEffect, useState } from "react";

function AdminViewDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    setDonations(stored);
  }, []);

  const updateStatus = (id, newStatus) => {
    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    const updated = stored.map((donation) =>
      donation.id === id ? { ...donation, status: newStatus } : donation
    );
    localStorage.setItem("donations", JSON.stringify(updated));
    setDonations(updated);
  };

  // Check if any donation is Pending to show Action header
  const hasPending = donations.some(donation => donation.status === "Pending");

  return (
    <div className="container mt-4">
      <h3>All Donations</h3>
      {donations.length === 0 ? (
        <p>No donations available.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Status</th>
              {hasPending && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {donations.map(donation => (
              <tr key={donation.id}>
                <td>{donation.item}</td>
                <td>{donation.quantity}</td>
                <td>
                  <span
                    className={`badge ${
                      donation.status === "Pending"
                        ? "bg-warning"
                        : donation.status === "Approved"
                        ? "bg-primary"
                        : "bg-success"
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>

                {donation.status === "Pending" && (
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => updateStatus(donation.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => updateStatus(donation.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminViewDonations;