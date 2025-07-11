import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Chip, Stack, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import ProgressBar from '../components/ProgressBar';
import SectionCard from '../components/SectionCard';
import SidebarSectionList from '../components/SidebarSectionList';
import LessonContent from '../components/LessonContent';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSectionIdx, setSelectedSectionIdx] = useState(null);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  const userId = localStorage.getItem('userId');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);

  const [showEnrollSnackbar, setShowEnrollSnackbar] = useState(false);

  useEffect(() => {
    setLoading(true);
    setProgressLoaded(false);

    fetch(`http://localhost:5001/api/course/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch course data');
        return res.json();
      })
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!userId || !course) return;

    fetch(`http://localhost:5001/api/enrol/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch enrolled courses');
        return res.json();
      })
      .then(data => {
        const enrolled = data.some(c => String(c.id) === String(id));
        setIsEnrolled(enrolled);
      })
      .catch(err => {
        console.error('Error checking enrolment:', err);
      });
  }, [userId, course, id]);

  useEffect(() => {
    if (!userId || !course || progressLoaded || !isEnrolled) return;

    const fetchProgress = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/progress/${userId}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch progress');
        const completedLessons = await res.json();

        const updatedSections = course.sections.map(section => ({
          ...section,
          lessons: section.lessons.map(lesson => ({ ...lesson })),
        }));

        completedLessons.forEach(({ sectionIndex, lessonIndex }) => {
          if (
            updatedSections[sectionIndex] &&
            updatedSections[sectionIndex].lessons[lessonIndex]
          ) {
            updatedSections[sectionIndex].lessons[lessonIndex].completed = true;
          }
        });

        setCourse(prev => ({ ...prev, sections: updatedSections }));
        setProgressLoaded(true);
      } catch (err) {
        console.error('Error loading progress:', err);
      }
    };

    fetchProgress();
  }, [userId, course, id, progressLoaded, isEnrolled]);

  const handleOptionChange = (lessonIdx, questionIdx, optionIdx) => {
    setAnswers(prev => ({
      ...prev,
      [lessonIdx]: {
        ...prev[lessonIdx],
        [questionIdx]: optionIdx,
      },
    }));

    setResults(prev => {
      if (prev[lessonIdx]?.[questionIdx] !== undefined) {
        const updated = { ...prev[lessonIdx] };
        delete updated[questionIdx];
        return { ...prev, [lessonIdx]: updated };
      }
      return prev;
    });
  };

  const handleSubmitAnswer = (lessonIdx, questionIdx, correctAnswer) => {
    const userAnswer = answers[lessonIdx]?.[questionIdx];
    if (userAnswer === undefined) return;

    const isCorrect = userAnswer === correctAnswer;
    setResults(prev => ({
      ...prev,
      [lessonIdx]: {
        ...prev[lessonIdx],
        [questionIdx]: isCorrect,
      },
    }));
  };

  const markLessonAsComplete = async (sectionIdx, lessonIdx) => {
    if (!userId) return alert('Please log in to save progress.');

    const updatedSections = [...course.sections];
    updatedSections[sectionIdx].lessons[lessonIdx].completed = true;
    setCourse({ ...course, sections: updatedSections });

    try {
      const res = await fetch(`http://localhost:5001/api/progress/${userId}/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionIndex: sectionIdx, lessonIndex: lessonIdx }),
      });

      if (!res.ok) throw new Error('Failed to save progress');
    } catch (err) {
      alert(`Error saving progress: ${err.message}`);
    }
  };

  const handleEnroll = async () => {
    if (!userId) return alert('Please log in to enrol in courses.');

    try {
      const res = await fetch(`http://localhost:5001/api/enrol/${userId}/${id}`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to enrol');
      alert('Successfully enrolled!');
      setIsEnrolled(true);
    } catch (err) {
      alert(`Error enrolling: ${err.message}`);
    }
  };

  const handleSectionClick = idx => {
    if (!isEnrolled) {
      setShowEnrollSnackbar(true);
    } else {
      setSelectedSectionIdx(idx);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!course) return <Typography>No course found.</Typography>;

  const totalLessons = course.sections.reduce((sum, sec) => sum + sec.lessons.length, 0);
  const completedLessons = course.sections.reduce(
    (sum, sec) => sum + sec.lessons.filter(lesson => lesson.completed).length,
    0
  );

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back 
      </Button>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">{course.title}</Typography>
        {!isEnrolled ? (
          <Button variant="contained" size="large" onClick={handleEnroll}>
            Enrol Now
          </Button>
        ) : (
          <Button variant="outlined" disabled>
            You are enrolled
          </Button>
        )}
      </Box>

      <Typography mb={2}>{course.description}</Typography>

      <Stack direction="row" spacing={1} mb={2}>
        {course.tags.map((tag, idx) => (
          <Chip key={idx} label={tag} color="primary" variant="outlined" />
        ))}
      </Stack>

      <Stack direction="row" spacing={3} mb={4}>
        <Typography sx={{ display: 'flex' }}>
          <StarIcon sx={{ mr: 0.5 }} /> {course.rating || '4.5'} rating
        </Typography>
        <Typography sx={{ display: 'flex' }}>
          <PeopleIcon sx={{ mr: 0.5 }} /> {course.students || '923'} students
        </Typography>
        <Typography sx={{ display: 'flex' }}>
          <AccessTimeIcon sx={{ mr: 0.5 }} /> {course.duration || '3 hours'}
        </Typography>
        <Typography sx={{ display: 'flex' }}>
          <MenuBookIcon sx={{ mr: 0.5 }} />
          {totalLessons} lessons
        </Typography>
      </Stack>

      <ProgressBar completed={completedLessons} total={totalLessons} />

      {selectedSectionIdx === null ? (
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
          {course.sections.map((section, idx) => (
            <SectionCard key={idx} section={section} onClick={() => handleSectionClick(idx)} />
          ))}
        </Box>
      ) : (
        <Box display="flex">
          <SidebarSectionList
            sections={course.sections}
            selectedIndex={selectedSectionIdx}
            onSelect={handleSectionClick}
          />
          <Box flex={1}>
            {course.sections[selectedSectionIdx].lessons.map((lesson, lidx) => {
              const lessonIdx = selectedSectionIdx * 1000 + lidx;
              return (
                <LessonContent
                  key={lidx}
                  lesson={lesson}
                  lessonIdx={lessonIdx}
                  answers={answers}
                  results={results}
                  handleOptionChange={handleOptionChange}
                  handleSubmitAnswer={handleSubmitAnswer}
                  markLessonAsComplete={() =>
                    markLessonAsComplete(selectedSectionIdx, lidx)
                  }
                />
              );
            })}
          </Box>
        </Box>
      )}

      <Snackbar
        open={showEnrollSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowEnrollSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowEnrollSnackbar(false)} severity="info" sx={{ width: '100%' }}>
          Please enrol in the course to begin learning.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CourseDetails;
