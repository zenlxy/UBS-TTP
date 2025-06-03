import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  FormLabel,
  Slider,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";

export default function Signup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    careerStage: "",
    currentSkills: [],
    learningGoals: "",
    timeAvailability: 5,
    areasOfInterest: [],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (key, value) => {
    setFormData((prev) => {
      const list = prev[key];
      return {
        ...prev,
        [key]: list.includes(value)
          ? list.filter((item) => item !== value)
          : [...list, value],
      };
    });
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      if (!formData.password.trim()) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
    }

    if (currentStep === 2) {
      if (!formData.careerStage) newErrors.careerStage = "Please select your career stage";
    }

    if (currentStep === 3) {
      if (formData.currentSkills.length === 0)
        newErrors.currentSkills = "Select at least one current skill";
      if (!formData.learningGoals.trim())
        newErrors.learningGoals = "Please enter your learning goals";
    }

    if (currentStep === 4) {
      if (formData.areasOfInterest.length === 0)
        newErrors.areasOfInterest = "Select at least one area of interest";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo(0, 0);
      } else {
        navigate("/home");
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting formData:", formData);
    try {
      const response = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        localStorage.setItem('userName', formData.name);
        localStorage.setItem('careerStage', formData.careerStage);
        localStorage.setItem('skills', JSON.stringify(formData.currentSkills)); 
        localStorage.setItem('availability', formData.timeAvailability.toString());
        localStorage.setItem('goals', formData.learningGoals);
        localStorage.setItem('interests', JSON.stringify(formData.areasOfInterest));
        navigate('/home'); // redirect after success
      } else {
        const error = await response.json();
        console.error("Signup failed:", error.message);
        alert("Signup failed: " + error.message);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      alert("Signup failed: server error");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ 
          mb: 3, 
          color: '#7b2ff7',
        }}
        variant="text"
      >
        Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Create Your Learning Profile
      </Typography>
      <Typography mb={4} color="text.secondary">
        Help us personalise your learning experience by telling us about yourself
      </Typography>

      <Box sx={{ height: 10, backgroundColor: "#eee", borderRadius: 5, mb: 4 }}>
        <Box
          sx={{
            height: "100%",
            width: `${(currentStep / totalSteps) * 100}%`,
            backgroundColor: '#7b2ff7',
            borderRadius: 5,
            transition: "width 0.3s ease",
          }}
        />
      </Box>

      <Paper sx={{ p: 4 }}>
        {currentStep === 1 && (
          <>
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <FormLabel component="legend" sx={{ mb: 2 }}>
              Career Stage
            </FormLabel>
            <RadioGroup
              name="careerStage"
              value={formData.careerStage}
              onChange={handleInputChange}
            >
              {[
                "Student / Learning to Code",
                "Early Career (0-2 years)",
                "Mid Career (3-5 years)",
                "Experienced (6+ years)",
                "Leadership / Management",
                "Career Changer",
              ].map((stage) => (
                <FormControlLabel
                  key={stage}
                  value={stage}
                  control={<Radio />}
                  label={stage}
                />
              ))}
            </RadioGroup>
            {errors.careerStage && (
              <Typography color="error" variant="body2">
                {errors.careerStage}
              </Typography>
            )}
          </>
        )}

        {currentStep === 3 && (
          <>
            <FormLabel component="legend" sx={{ mb: 2 }}>
              Current Skills (select all that apply)
            </FormLabel>
            <FormGroup>
              {[
                "HTML/CSS",
                "JavaScript",
                "React",
                "Node.js",
                "Python",
                "Data Science",
                "UI/UX Design",
                "Product Management",
              ].map((skill) => (
                <FormControlLabel
                  key={skill}
                  control={
                    <Checkbox
                      checked={formData.currentSkills.includes(skill)}
                      onChange={() => handleCheckboxChange("currentSkills", skill)}
                    />
                  }
                  label={skill}
                />
              ))}
            </FormGroup>
            {errors.currentSkills && (
              <Typography color="error" variant="body2">
                {errors.currentSkills}
              </Typography>
            )}
            <TextField
              label="What are your learning goals?"
              name="learningGoals"
              value={formData.learningGoals}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={Boolean(errors.learningGoals)}
              helperText={errors.learningGoals}
            />
          </>
        )}

        {currentStep === 4 && (
          <>
            <Typography gutterBottom>
              Hours available per week: {formData.timeAvailability}
            </Typography>
            <Slider
              min={0}
              max={40}
              value={formData.timeAvailability}
              onChange={(e, value) =>
                setFormData((prev) => ({ ...prev, timeAvailability: value }))
              }
              valueLabelDisplay="auto"
              sx={{ mb: 4 }}
            />

            <FormLabel component="legend" sx={{ mb: 2 }}>
              Areas of Interest (select all that apply)
            </FormLabel>
            <FormGroup>
              {[
                "Web Development",
                "Mobile Apps",
                "Data Science",
                "AI/ML",
                "DevOps",
                "Cybersecurity",
                "UX/UI Design",
              ].map((area) => (
                <FormControlLabel
                  key={area}
                  control={
                    <Checkbox
                      checked={formData.areasOfInterest.includes(area)}
                      onChange={() => handleCheckboxChange("areasOfInterest", area)}
                    />
                  }
                  label={area}
                />
              ))}
            </FormGroup>
            {errors.areasOfInterest && (
              <Typography color="error" variant="body2">
                {errors.areasOfInterest}
              </Typography>
            )}
          </>
        )}

        {currentStep === 5 && (
          <>
            <Typography variant="h6" gutterBottom>
              Review Your Profile
            </Typography>
            <Box>
              <Typography><strong>Name:</strong> {formData.name}</Typography>
              <Typography><strong>Email:</strong> {formData.email}</Typography>
              <Typography><strong>Career Stage:</strong> {formData.careerStage}</Typography>
              <Typography><strong>Current Skills:</strong> {formData.currentSkills.join(", ")}</Typography>
              <Typography><strong>Learning Goals:</strong> {formData.learningGoals}</Typography>
              <Typography><strong>Time Availability:</strong> {formData.timeAvailability} hours/week</Typography>
              <Typography><strong>Areas of Interest:</strong> {formData.areasOfInterest.join(", ")}</Typography>
            </Box>
          </>
        )}

        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Back
          </Button>

          <Button
            variant="contained"
            endIcon={currentStep === totalSteps ? <CheckIcon /> : <ArrowForwardIcon />}
            onClick={currentStep === totalSteps ? handleSubmit : nextStep}
            sx={{ backgroundColor: '#7b2ff7', '&:hover': { backgroundColor: '#6922c6' } }}
          >
            {currentStep === totalSteps ? "Finish" : "Next"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
