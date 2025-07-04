import React, { useEffect, useState } from 'react';
import { Typography, Container, CircularProgress, Box, Grid, Card, CardMedia, CardContent, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Import images from assets
import course1Img from '../assets/course1.jpg';
import course2Img from '../assets/course2.jpg';
import course3Img from '../assets/course3.jpg';
import course4Img from '../assets/course4.jpg';
import course5Img from '../assets/course5.jpg';
import course6Img from '../assets/course6.jpg';
import course7Img from '../assets/course7.jpg';
import course8Img from '../assets/course8.jpg';
import course9Img from '../assets/course9.jpg';
import course10Img from '../assets/course10.jpg';
import course11Img from '../assets/course11.jpg';
import course12Img from '../assets/course12.jpg';
import course13Img from '../assets/course13.jpg';
import course14Img from '../assets/course14.jpg';

// Image mapping based on filename
const imageMap = {
  'course1.jpg': course1Img,
  'course2.jpg': course2Img,
  'course3.jpg': course3Img,
  'course4.jpg': course4Img,
  'course5.jpg': course5Img,
  'course6.jpg': course6Img,
  'course7.jpg': course7Img,
  'course8.jpg': course8Img,
  'course9.jpg': course9Img,
  'course10.jpg': course10Img,
  'course11.jpg': course11Img,
  'course12.jpg': course12Img,
  'course13.jpg': course13Img,
  'course14.jpg': course14Img,
};

const Home = () => {
  const userName = localStorage.getItem('userName');
  const [interests, setInterests] = useState(() => JSON.parse(localStorage.getItem('interests')) || []);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      if (!interests || interests.length === 0) {
        setError('Please provide some interests to get recommendations.');
        setLoading(false);
        return;
      }

      const cacheKey = `recommendations_${interests.join('_')}`;
      const cachedRecommendations = localStorage.getItem(cacheKey);

      if (cachedRecommendations) {
        try {
          setCourses(JSON.parse(cachedRecommendations));
          setLoading(false);
          return;
        } catch (parseError) {
          console.error('Failed to parse cached recommendations:', parseError);
        }
      }

      try {
        const response = await fetch('http://localhost:5001/api/recommendation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ interests }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch recommendations');
        }

        const data = await response.json();
        if (data.recommendedCourses) {
          setCourses(data.recommendedCourses);
          localStorage.setItem(cacheKey, JSON.stringify(data.recommendedCourses));
        } else {
          setCourses([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [interests]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'interests') {
        setInterests(JSON.parse(event.newValue || '[]'));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Container >
      <Box mt={4} mb={2}>
        <Typography variant="h4">
          Welcome Back{userName ? `, ${userName}` : ''}!
        </Typography>
        <Typography>Your personalised recommendations will appear here.</Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : courses.length === 0 ? (
        <Typography align="center">
          No recommendations available. Try adding some interests!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => {
            const imageSrc = imageMap[course.image];
            return (
              <Grid item xs={12} sm={6} md={4} key={course.id || course.title}>
                <Link
                  to={`/courses/${course.id}`}
                  style={{ textDecoration: 'none' }}
                  aria-label={`Go to details for ${course.title}`}
                >
                  <Card
                    sx={{
                      height: 370,
                      width: 500,
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      '&:hover': { boxShadow: 6 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={imageSrc}
                      alt={course.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                          <Typography variant="h6" color="textPrimary" fontWeight="bold">
                            {course.title}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <StarIcon fontSize="small" color="warning" />
                            <Typography variant="body2" color="textSecondary">
                              {course.rating}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          {course.description}
                        </Typography>
                      </Box>
                      <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <GroupIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="textSecondary">
                            {course.students}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <AccessTimeIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="textSecondary">
                            {course.duration}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
