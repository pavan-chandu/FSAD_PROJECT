import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor", // default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (user) =>
        user.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (userExists) {
      alert("Email already registered!");
      return;
    }

    // Optional: extra safety to prevent "recipient" role (if someone manipulates the form)
    if (formData.role === "recipient") {
      alert("Recipient role is no longer allowed!");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Register</h3>

      <form onSubmit={handleSubmit} className="col-md-4 mx-auto">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Role dropdown without Recipient */}
        <select
          className="form-control mb-3"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="donor">Donor</option>
          <option value="logistics">Logistics</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;