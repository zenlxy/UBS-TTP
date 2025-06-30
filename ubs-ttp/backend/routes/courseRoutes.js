const express = require('express');
const router = express.Router();

const courses = require('../data/courses'); 

router.get('/:id', (req, res) => {
  const courseId = Number(req.params.id);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  res.json(course);
});

module.exports = router;
