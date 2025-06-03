const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  console.log('Signup data:', req.body); 
  try {
    const {
      name,
      email,
      password,
      careerStage,
      currentSkills,
      learningGoals,
      timeAvailability,
      areasOfInterest,
    } = req.body;

    // Basic validation for required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with all fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      careerStage,
      currentSkills,
      learningGoals,
      timeAvailability,
      areasOfInterest,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
