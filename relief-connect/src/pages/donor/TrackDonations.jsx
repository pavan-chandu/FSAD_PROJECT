import React, { useEffect, useState } from "react";

function TrackDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const stored = JSON.parse(localStorage.getItem("donations")) || [];
    const myDonations = stored.filter(
      (donation) => donation.donorEmail === currentUser.email
    );

    setDonations(myDonations);
  }, []);

  return (
    <div className="container mt-5">
      <h2>Track Your Donations</h2>

      {donations.length === 0 ? (
        <p>No donations made yet.</p>
      ) : (
        <div className="row">
          {donations.map((donation) => (
            <div className="col-md-4 mb-4" key={donation.id}>
              <div className="card p-3 shadow">
                <h5>{donation.driveName}</h5>
                <p><strong>Item:</strong> {donation.item}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p>
                  <strong>Status:</strong>{" "}
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
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackDonations;