const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Your user model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    console.log('Login route hit');
    try {
      const { email, password } = req.body;
      console.log('Login attempt:', email);
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
      }
  
      console.log('Finding user by email:', email);
      const user = await User.findOne({ email });
      console.log('User found:', user);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      const payload = { id: user._id, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({
        token,
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          careerStage: user.careerStage,
          currentSkills: user.currentSkills,
          learningGoals: user.learningGoals,
          timeAvailability: user.timeAvailability,
          areasOfInterest: user.areasOfInterest,
        }
      });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
  