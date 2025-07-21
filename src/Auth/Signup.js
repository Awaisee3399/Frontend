import React, { useState } from "react";
<<<<<<< HEAD
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
=======
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
import dark from "../assets/Dark.png";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 5) {
      newErrors.name = "Name must be at least 5 characters long";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "https://backend-8226.onrender.com/api/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
<<<<<<< HEAD
      if (err.response?.data?.message) {
        setServerError(err.response.data.message);
=======
      if (err.response && err.response.data && err.response.data.message) {
        setServerError(err.response.data.message); // Show backend error message
>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
      } else {
        setServerError("Signup failed. Please try again.");
      }
    }
  };

  return (
<<<<<<< HEAD
    <Box
      sx={{
        minHeight: "96.5vh",
        backgroundImage: `url(${dark})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
          Create Account 📝
        </Typography>
        <Typography
          variant="body2"
          align="center"
          gutterBottom
          sx={{ color: "#ccc" }}
        >
          Fill in the details to create your account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
          />

          {serverError && (
            <Typography color="error" variant="body2" mt={1}>
              {serverError}
            </Typography>
          )}

          <Button
            variant="contained"
            color="success"
            fullWidth
            type="submit"
            sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
          >
            Sign Up
          </Button>

          <Typography
            variant="body2"
            align="center"
            mt={3}
            sx={{ color: "#ccc" }}
          >
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              style={{
                color: "#90caf9",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sign In
            </span>
          </Typography>
        </form>
      </Paper>
    </Box>
=======
    <div className="d-flex" style={{ width: "100%", height: "96vh" }}>
      <div
        style={{
          flex: 1,
          backgroundColor: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={dark}
          alt="Signup Visual"
          className="img-fluid"
          style={{
            maxWidth: "80%",
            maxHeight: "80%",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          className="card p-5 shadow"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "20px",
            backgroundColor: "#ffffffee",
          }}
        >
          <h2 className="text-center mb-2 fw-bold text-primary">
            Create Account 📝
          </h2>
          <p className="text-center text-muted mb-3">
            Fill in the details to create your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"

                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"

                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""
                  }`}
                id="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                  }`}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="confrim pas"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            {serverError && (
              <div className="alert alert-danger" role="alert">
                {serverError}
              </div>
            )}

            <button type="submit" className="btn btn-success w-100 py-2 mt-2">
              Sign Up
            </button>

            <div className="text-center mt-3">
              <span className="text-secondary small">
                Already have an account?{" "}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Sign in
                </div>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
  );
};

export default SignUp;
