import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../assets/rose.jpg"; // your uploaded image
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
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
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/Taskmanagenment");
    } catch (err) {
      console.error(err);
      setServerError("Invalid credentials");
    }
  };

  return (
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
          <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
            Email
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              style: { color: "#fff" },
            }}
          />

          <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
            Password
          </Typography>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              style: { color: "#fff" },
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
  );
};

export default SignIn;
