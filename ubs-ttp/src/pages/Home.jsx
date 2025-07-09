import React, { useState, useEffect } from 'react';
import { Typography, Container, CircularProgress, Box, Grid, Card, CardMedia, CardContent, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import imageMap from '../assets/imageMap';

const Home = () => {
  const userId = localStorage.getItem('userId'); 
  const userName = localStorage.getItem('userName');
  const [interests, setInterests] = useState(() => JSON.parse(localStorage.getItem('interests')) || []);

  // State for enrolled courses
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // State for recommended courses
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  const [loadingEnrolled, setLoadingEnrolled] = useState(true);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  const [errorEnrolled, setErrorEnrolled] = useState(null);
  const [errorRecommended, setErrorRecommended] = useState(null);

  // Fetch enrolled courses
  useEffect(() => {
    if (!userId) {
      setErrorEnrolled('User not logged in.');
      setLoadingEnrolled(false);
      return;
    }

    const fetchEnrolled = async () => {
      setLoadingEnrolled(true);
      setErrorEnrolled(null);

      try {
        const res = await fetch(`http://localhost:5001/api/enrol/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch enrolled courses');
        const data = await res.json();
        setEnrolledCourses(data);
      } catch (err) {
        setErrorEnrolled(err.message);
      } finally {
        setLoadingEnrolled(false);
      }
    };

    fetchEnrolled();
  }, [userId]);

  // Fetch recommended courses based on interests
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoadingRecommended(true);
      setErrorRecommended(null);

      if (!interests || interests.length === 0) {
        setErrorRecommended('Please provide some interests to get recommendations.');
        setLoadingRecommended(false);
        return;
      }

      const cacheKey = `recommendations_${interests.join('_')}`;
      const cachedRecommendations = localStorage.getItem(cacheKey);

      if (cachedRecommendations) {
        try {
          const cachedData = JSON.parse(cachedRecommendations);
          // Filter out courses that are already enrolled
          const filteredCourses = cachedData.filter(course =>
            !enrolledCourses.some(enrolled => enrolled.id === course.id)
          );
          setRecommendedCourses(filteredCourses);
          setLoadingRecommended(false);
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
          // Filter out enrolled courses
          const filtered = data.recommendedCourses.filter(course =>
            !enrolledCourses.some(enrolled => enrolled.id === course.id)
          );
          setRecommendedCourses(filtered);
          localStorage.setItem(cacheKey, JSON.stringify(data.recommendedCourses));
        } else {
          setRecommendedCourses([]);
        }
      } catch (error) {
        setErrorRecommended(error.message);
      } finally {
        setLoadingRecommended(false);
      }
    };

    fetchRecommendations();
  }, [interests, enrolledCourses]);

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4">
          Welcome back{userName ? `, ${userName}` : ''}!
        </Typography>
      </Box>

      {/* Enrolled Courses Section */}
      <Box mb={5}>
        <Typography variant="h5" gutterBottom>
          Your Enrolled Courses
        </Typography>
        {loadingEnrolled ? (
          <Box display="flex" justifyContent="center" mb={2}>
            <CircularProgress />
          </Box>
        ) : errorEnrolled ? (
          <Typography color="error" align="center">{errorEnrolled}</Typography>
        ) : enrolledCourses.length === 0 ? (
          <Typography align="center" mb={2}>You have not enrolled in any courses yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {enrolledCourses.map((course) => {
              const imageSrc = imageMap[course.image];
              return (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <Link to={`/courses/${course.id}`} style={{ textDecoration: 'none' }} aria-label={`Go to details for ${course.title}`}>
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
      </Box>

      {/* Recommended Courses Section */}
      <Box mb={5}>
        <Typography variant="h5" gutterBottom>
          Recommended Courses
        </Typography>
        {loadingRecommended ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : errorRecommended ? (
          <Typography color="error" align="center">
            {errorRecommended}
          </Typography>
        ) : recommendedCourses.length === 0 ? (
          <Typography align="center">
            No recommendations available. Try adding some interests!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {recommendedCourses.map((course) => {
              const imageSrc = imageMap[course.image];
              return (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
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
      </Box>
    </Container>
  );
};

export default Home;
