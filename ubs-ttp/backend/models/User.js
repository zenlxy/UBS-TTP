const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  careerStage: { type: String },
  currentSkills: { type: [String], default: [] },
  learningGoals: { type: String },
  timeAvailability: { type: Number, default: 5 },
  areasOfInterest: { type: [String], default: [] },
  enrolledCourses: [{ type: Number }],
  progress: [
    {
      courseId: { type: Number, required: true },
      completedLessons: [
        {
          sectionIndex: { type: Number, required: true },
          lessonIndex: { type: Number, required: true }
        }
      ]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
