import React, { useState } from "react";

function AdminCreateDrive() {
  const [driveName, setDriveName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [driveType, setDriveType] = useState("");
  const [itemsNeeded, setItemsNeeded] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDrive = {
      id: Date.now(),
      driveName,
      location,
      date,
      driveType,
      itemsNeeded,
      status: "Active"
    };

    const existingDrives =
      JSON.parse(localStorage.getItem("donationDrives")) || [];

    const updatedDrives = [...existingDrives, newDrive];

    localStorage.setItem("donationDrives", JSON.stringify(updatedDrives));

    setMessage("Donation Drive Created Successfully ✅");

    // Clear Form
    setDriveName("");
    setLocation("");
    setDate("");
    setDriveType("");
    setItemsNeeded("");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Create Donation Drive</h2>

        {message && (
          <div className="alert alert-success text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Drive Name Dropdown */}
          <div className="mb-3">
            <label className="form-label">Drive Name</label>
            <select
              className="form-select"
              value={driveName}
              onChange={(e) => setDriveName(e.target.value)}
              required
            >
              <option value="">Select Drive</option>
              <option value="Flood Relief 2026">Flood Relief 2026</option>
              <option value="Winter Blanket Drive">Winter Blanket Drive</option>
              <option value="Food for All Campaign">Food for All Campaign</option>
              <option value="Earthquake Emergency Support">
                Earthquake Emergency Support
              </option>
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="mb-3">
            <label className="form-label">Location</label>
            <select
              className="form-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="">Select Location</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>

          {/* Date */}
          <div className="mb-3">
            <label className="form-label">Drive Date</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Drive Type Dropdown */}
          <div className="mb-3">
            <label className="form-label">Drive Type</label>
            <select
              className="form-select"
              value={driveType}
              onChange={(e) => setDriveType(e.target.value)}
              required
            >
              <option value="">Select Drive Type</option>
              <option value="Food Donation">Food Donation</option>
              <option value="Clothing Donation">Clothing Donation</option>
              <option value="Medical Supplies">Medical Supplies</option>
              <option value="Disaster Relief">Disaster Relief</option>
            </select>
          </div>

          {/* Items Needed Dropdown */}
          <div className="mb-3">
            <label className="form-label">Items Needed</label>
            <select
              className="form-select"
              value={itemsNeeded}
              onChange={(e) => setItemsNeeded(e.target.value)}
              required
            >
              <option value="">Select Item Type</option>
              <option value="Rice & Groceries">Rice & Groceries</option>
              <option value="Blankets">Blankets</option>
              <option value="Clothes">Clothes</option>
              <option value="Medicines">Medicines</option>
            </select>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Create Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateDrive;