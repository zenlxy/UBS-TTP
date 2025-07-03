import React from 'react';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import Profile from './pages/Profile';
import Header from './components/Header';

function App() {
  const location = useLocation();
  const hideHeaderOnRoutes = ['/', '/login', '/signup'];
  const shouldShowHeader = !hideHeaderOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
