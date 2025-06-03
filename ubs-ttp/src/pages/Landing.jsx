import React from 'react';
import { Box, Button, Typography, Container, Stack, Grid, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CodeIcon from '@mui/icons-material/Code';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from 'react-router-dom';

const features = [
  {
    id: 'personalised-learning-paths',
    title: 'Personalised Learning Paths',
    description: 'AI-powered recommendations based on your career stage, skills, and goals.',
    icon: <LightbulbIcon sx={{ fontSize: 48, color: '#7b2ff7' }} />,
  },
  {
    id: 'experiential-learning',
    title: 'Experiential Learning',
    description: 'Hands-on projects, coding simulations, and real-world challenges.',
    icon: <CodeIcon sx={{ fontSize: 48, color: '#7b2ff7' }} />,
  },
  {
    id: 'gamified-progress',
    title: 'Gamified Progress',
    description: 'Track your journey with badges, skill trees, and achievement streaks.',
    icon: <EmojiEventsIcon sx={{ fontSize: 48, color: '#7b2ff7' }} />,
  },
  {
    id: 'performance-analytics',
    title: 'Performance Analytics',
    description: 'Visual reports highlighting your strengths and growth areas.',
    icon: <BarChartIcon sx={{ fontSize: 48, color: '#7b2ff7' }} />,
  },
  {
    id: 'supportive-community',
    title: 'Supportive Community',
    description: 'Connect, collaborate, and learn with like-minded peers.',
    icon: <PeopleIcon sx={{ fontSize: 48, color: '#7b2ff7' }} />,
  },
  {
    id: 'learning-assistant',
    title: 'Learning Assistant',
    description: 'Chat-based guidance to keep you motivated and on track.',
    icon: <ChatBubbleOutlineIcon sx={{ fontSize: 48, color: '#7b2ff7' }} />,
  },
];

export default function Landing () {
  return (
    <Box sx={{ background: 'linear-gradient(to right, #7b2ff7, #f107a3)', color: 'white' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Container>
          <Toolbar disableGutters sx={{ justifyContent: 'flex-end', pt: 2 }}>
            <Stack direction="row" spacing={3}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button sx={{ color: 'white', fontWeight: 'bold' }}>Login</Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={4}>
            <Typography variant="h2" fontWeight="bold" mb={2} lineHeight={1.2}>
              Empower Your Tech Journey with{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(to right, #facc15, #fb923c)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block',
                }}
              >
                SheLearnsTech
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Personalised learning paths, hands-on projects, and a supportive community designed specifically for women breaking into tech.
            </Typography>
            <Box>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'white',
                    color: '#7b2ff7',
                    fontWeight: 'bold',
                    px: 4,
                    '&:hover': {
                      backgroundColor: '#f3e5f5',
                    },
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, backgroundColor: '#fff', color: '#333' }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            Platform Features
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 6 }}>
            Explore the key features designed to help you succeed in tech.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={4} key={feature.id}>
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: 350,
                    height: 250,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderRadius: 3,
                    textAlign: 'center',
                    py: 4,
                    boxSizing: 'border-box',
                  }}
                  elevation={3}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      px: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: 'normal',
                        overflowWrap: 'break-word',
                        lineHeight: 1.5,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: 6,
          background: 'linear-gradient(to right, #7b2ff7, #f107a3)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Ready to Accelerate Your Tech Career?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Join our community of women in tech and take control of your learning journey.
          </Typography>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button variant="contained" size="large" sx={{ backgroundColor: 'white', color: '#7b2ff7', fontWeight: 'bold' }}>
              Get Started Now
            </Button>
          </Link>
        </Container>
      </Box>
    </Box>
  );
};


