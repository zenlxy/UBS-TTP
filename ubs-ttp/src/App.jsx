import React, { useState } from 'react';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import Profile from './pages/Profile';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import CategoryCourses from './pages/CategoryCourses';
import Chatbot from './pages/Chatbot';

function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hideHeaderOnRoutes = ['/', '/login', '/signup'];
  const shouldShowHeader = !hideHeaderOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header onSidebarToggle={() => setSidebarOpen(true)} />}
      {shouldShowHeader && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/categories/:category" element={<CategoryCourses />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </>
  );
}

export default App;
