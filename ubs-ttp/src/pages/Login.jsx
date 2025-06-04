import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.name); // Store user's name
        localStorage.setItem("careerStage", data.user.careerStage);
        localStorage.setItem("skills", JSON.stringify(data.user.currentSkills));
        localStorage.setItem("availability", data.user.timeAvailability.toString());
        localStorage.setItem("goals", data.user.learningGoals);
        localStorage.setItem("interests", JSON.stringify(data.user.areasOfInterest));
        navigate("/home");
      } else {
        const error = await response.json();
        alert("Login failed: " + error.message);
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("Login failed: server error");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 3, color: "#7b2ff7" }}
        variant="text"
      >
        Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Typography mb={4} color="text.secondary">
        Welcome back! Please login to your account.
      </Typography>

      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, backgroundColor: "#7b2ff7", "&:hover": { backgroundColor: "#6922c6" } }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
