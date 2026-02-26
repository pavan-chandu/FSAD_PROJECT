import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Captcha states
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");

  // Generate captcha when component loads
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const number1 = Math.floor(Math.random() * 10) + 1;
    const number2 = Math.floor(Math.random() * 10) + 1;
    setNum1(number1);
    setNum2(number2);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Captcha Validation
    if (parseInt(captchaInput) !== num1 + num2) {
      alert("Captcha is incorrect!");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) =>
        user.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        user.password.trim() === password.trim()
    );

    if (foundUser) {
      // ✅ Store logged in user in consistent key
      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      // Clear form
      setEmail("");
      setPassword("");
      setCaptchaInput("");

      // Regenerate captcha
      generateCaptcha();

      // Navigate based on role
      navigate(`/${foundUser.role}`);

      // Reload to update Navbar immediately
      window.location.reload();

    } else {
      alert("Invalid Email or Password");
      generateCaptcha();
      setCaptchaInput("");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Login</h3>

      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="col-md-4 mx-auto"
      >
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />

        <div className="mb-3">
          <label className="form-label fw-bold">
            Solve: {num1} + {num2} = ?
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter captcha answer"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;