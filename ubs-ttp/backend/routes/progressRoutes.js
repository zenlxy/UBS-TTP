const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:userId/:courseId', async (req, res) => {
  const { userId, courseId } = req.params;
  console.log('Saving progress:', sectionIndex, lessonIndex);

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const courseProgress = user.progress.find(p => p.courseId === Number(courseId));
    res.json(courseProgress?.completedLessons || []);
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save user lesson completion
router.post('/:userId/:courseId', async (req, res) => {
  const { userId, courseId } = req.params;
  const { sectionIndex, lessonIndex } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let courseProgress = user.progress.find(p => p.courseId === Number(courseId));

    if (!courseProgress) {
      courseProgress = { courseId: Number(courseId), completedLessons: [] };
      user.progress.push(courseProgress);
    }

    const alreadyCompleted = courseProgress.completedLessons.some(
      (l) => l.sectionIndex === sectionIndex && l.lessonIndex === lessonIndex
    );

    if (!alreadyCompleted) {
      courseProgress.completedLessons.push({ sectionIndex, lessonIndex });
    }

    await user.save();
    res.json({ message: 'Progress saved', progress: courseProgress.completedLessons });
  } catch (err) {
    console.error('Error saving progress:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
