import React, { useState } from "react";
<<<<<<< HEAD
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../assets/rose.jpg"; // your uploaded image
=======
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import dark from "../assets/Dark.png";
>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
=======

>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "https://backend-8226.onrender.com/api/auth/signin",
<<<<<<< HEAD
        { email, password }
=======
        {
          email,
          password,
        }
>>>>>>> 7fb2a65447a93b6ebe4ca47bf415205cc18b8f81
      );
      localStorage.setItem("token", response.data.token);
      navigate("/Taskmanagenment");
    } catch (err) {
      console.error(err);
      setServerError("Invalid credentials");
    }
  };

  return (
<<<<<<< HEAD
    <Box
      sx={{
        minHeight: "96.5vh",
        backgroundImage: `url(${background})`,
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
        <Typography variant="h5" fontWeight={700} gutterBottom align="center">
          LOGIN FORM
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{
              style: { color: "#fff", borderColor: "#fff" },
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{
              style: { color: "#fff", borderColor: "#fff" },
            }}
          />

          {serverError && (
            <Typography color="error" variant="body2" mt={1}>
              {serverError}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            align="center"
            mt={3}
            sx={{ color: "#ccc" }}
          >
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/SignUp")}
              style={{
                color: "#90caf9",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sign Up
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
          alt="Login Visual"
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
            Welcome Back 👋
          </h2>
          <p className="text-center text-muted mb-3">
            Please enter your credentials to sign in
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"

                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {serverError && (
              <div className="alert alert-danger" role="alert">
                {serverError}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100 py-2 mt-2">
              Sign In
            </button>

            <div className="text-center mt-3">
              <span className="text-secondary small">
                Don’t have an account?{" "}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/SignUp");
                  }}
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Sign Up
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

export default SignIn;
