const express = require('express');
const router = express.Router();
const courses = require('../data/courses');

router.get('/:category', (req, res) => {
  const categorySlug = req.params.category.toLowerCase();

  if (categorySlug === 'all-courses') {
    // Special case: return all courses
    return res.json(courses);
  }

  // Convert course.category to slug and compare
  const filteredCourses = courses.filter(course => {
    const courseSlug = course.category?.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
    return courseSlug === categorySlug;
  });

  if (filteredCourses.length === 0) {
    return res.status(404).json({ message: 'No courses found in this category' });
  }

  res.json(filteredCourses);
});

module.exports = router;
