import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DonorDashboard() {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const storedDrives = JSON.parse(localStorage.getItem("donationDrives")) || [];
    const activeDrives = storedDrives.filter((drive) => drive.status === "Active");
    setDrives(activeDrives);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Donor Dashboard</h2>

      <h4 className="mb-3 text-danger">🔥 Active Donation Drives</h4>

      {drives.length === 0 ? (
        <div className="alert alert-info">
          No active drives available right now.
        </div>
      ) : (
        <div className="row">
          {drives.map((drive) => (
            <div className="col-md-4 mb-4" key={drive.id}>
              <div className="card shadow p-3 h-100">
                <h5 className="text-primary">{drive.driveName}</h5>
                <p><strong>📍 Location:</strong> {drive.location}</p>
                <p><strong>📅 Date:</strong> {drive.date}</p>
                <p><strong>📦 Items Needed:</strong> {drive.itemsNeeded}</p>

                <Link
                  to={`/add-donation?drive=${drive.driveName}`}
                  className="btn btn-primary btn-sm mt-auto"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr className="my-4" />
      <div className="text-center">
        <Link to="/track-donations" className="btn btn-warning">
          Track My Donations
        </Link>
      </div>
    </div>
  );
}

export default DonorDashboard;