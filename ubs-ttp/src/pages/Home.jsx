// Home.jsx
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  CircularProgress,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { Link } from 'react-router-dom';

// Import images from assets
import course1Img from '../assets/course1.jpg';

// Image mapping based on filename
const imageMap = {
  'course1.jpg': course1Img,
};

const Home = () => {
  const userName = localStorage.getItem('userName');
  const [interests, setInterests] = useState(() => JSON.parse(localStorage.getItem('interests')) || []);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Welcome Back{userName ? `, ${userName}` : ''}!
      </Typography>
      <Typography mb={2}>Your personalised recommendations will appear here.</Typography>

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
            const imageSrc = imageMap[course.image] || '/placeholder-image.jpg';
            return (
              <Grid item xs={12} sm={6} md={4} key={course.id || course.title}>
                <Link
                  to={`/courses/${course.id}`}
                  style={{ textDecoration: 'none' }}
                  aria-label={`Go to details for ${course.title}`}
                >
                  <Card
                    sx={{
                      height: '100%',
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
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom color="textPrimary">
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {course.description}
                      </Typography>
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
