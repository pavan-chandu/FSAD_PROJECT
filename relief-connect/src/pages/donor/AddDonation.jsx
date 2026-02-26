import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddDonation() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const driveName = queryParams.get("drive") || "";

  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    const allDonations = JSON.parse(localStorage.getItem("donations")) || [];

    const donation = {
      id: new Date().getTime(),
      driveName: driveName,
      item: formData.item,
      quantity: formData.quantity,
      status: "Pending",
      donorEmail: currentUser.email, // Track donor
    };

    allDonations.push(donation);
    localStorage.setItem("donations", JSON.stringify(allDonations));

    alert("Donation added successfully!");
    navigate("/track-donations");
  };

  return (
    <div className="container mt-5">
      <h2>Add Donation for {driveName}</h2>
      <form className="col-md-4 mx-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Item Name"
          name="item"
          value={formData.item}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Submit Donation
        </button>
      </form>
    </div>
  );
}

export default AddDonation;