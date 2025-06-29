const express = require("express");
const router = express.Router();
const courses = require("../data/courses");

router.post('/', (req, res) => {
  const { interests } = req.body;
  if (!interests || !Array.isArray(interests) || interests.length === 0) {
    return res.status(400).json({ message: "No interests provided" });
  }
  const recommended = courses.filter(course =>
    interests.includes(course.category)
  );
  res.json({
    recommendedCourses: recommended
  });
});

module.exports = router;