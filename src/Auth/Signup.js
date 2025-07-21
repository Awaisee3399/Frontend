import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
      if (err.response?.data?.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Signup failed. Please try again.");
      }
    }
  };

  return (
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
          Create Account
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
          <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
            Full Name
          </Typography>
          <TextField
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{ style: { color: "#fff" } }}
          />

          <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
            Email
          </Typography>
          <TextField
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{ style: { color: "#fff" } }}
          />

          <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
            Password
          </Typography>
          <TextField
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{ style: { color: "#fff" } }}
          />

          <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
            Confirm Password
          </Typography>
          <TextField
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{ style: { color: "#fff" } }}
          />

          {serverError && (
            <Typography color="error" variant="body2">
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
  );
};

export default SignUp;
