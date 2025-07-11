const express = require('express');
const router = express.Router();
const User = require('../models/User');
const allCourses = require('../data/courses');

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const enrolledCourses = allCourses.filter(course =>
      user.enrolledCourses.includes(course.id)
    );

    res.json(enrolledCourses);
  } catch (err) {
    console.error('Error fetching enrolled courses:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:userId/:courseId', async (req, res) => {
  const { userId, courseId } = req.params;
  const numericCourseId = Number(courseId);

  if (isNaN(numericCourseId)) {
    return res.status(400).json({ message: 'Invalid course ID' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.enrolledCourses.includes(numericCourseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(numericCourseId);
    await user.save();

    res.json({ message: 'Successfully enrolled', enrolledCourses: user.enrolledCourses });
  } catch (err) {
    console.error('Error enrolling user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/check/:userId/:courseId', async (req, res) => {
  const { userId, courseId } = req.params;
  const numericCourseId = Number(courseId);

  if (isNaN(numericCourseId)) {
    return res.status(400).json({ message: 'Invalid course ID' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isEnrolled = user.enrolledCourses.includes(numericCourseId);
    res.json({ enrolled: isEnrolled });
  } catch (err) {
    console.error('Error checking enrolment:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
