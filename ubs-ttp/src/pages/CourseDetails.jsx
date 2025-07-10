import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Chip, Stack } from '@mui/material';
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

  useEffect(() => {
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

  const markLessonAsComplete = (sectionIdx, lessonIdx) => {
    const updatedSections = [...course.sections];
    updatedSections[sectionIdx].lessons[lessonIdx].completed = true;
    setCourse({ ...course, sections: updatedSections });
  };

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

  const handleEnroll = async () => {
    if (!userId) return alert('Please log in to enrol in courses.');

    try {
      const res = await fetch(`http://localhost:5001/api/enrol/${userId}/${id}`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to enrol');
      alert('Successfully enrolled!');
      navigate('/home');
    } catch (err) {
      alert(`Error enrolling: ${err.message}`);
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
        onClick={() => navigate('/home')}
        sx={{ mb: 3 }}
      >
        Back to Home
      </Button>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">{course.title}</Typography>
        <Button variant="contained" size="large" onClick={handleEnroll}>
          Enrol Now
        </Button>
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
        // Section overview
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
          {course.sections.map((section, idx) => (
            <SectionCard
              key={idx}
              section={section}
              onClick={() => setSelectedSectionIdx(idx)}
            />
          ))}
        </Box>
      ) : (
        // Detailed view of section
        <Box display="flex">
          <SidebarSectionList
            sections={course.sections}
            selectedIndex={selectedSectionIdx}
            onSelect={setSelectedSectionIdx}
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
    </Container>
  );
};

export default CourseDetails;
