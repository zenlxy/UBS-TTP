import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        <ListItem>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#7b2ff7' }}>
            Menu
          </Typography>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigate('/home')}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigate('/chatbot')}>
            <ListItemIcon><ChatIcon /></ListItemIcon>
            <ListItemText primary="Chatbot" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="subtitle2" color="textSecondary">Categories</Typography>
        </ListItem>
        {[
          'All Courses',
          'Web Development',
          'Mobile Apps',
          'Data Science',
          'AI/ML',
          'DevOps',
          'Cybersecurity',
          'UI/UX Design',
        ].map((category) => (
          <ListItem disablePadding key={category}>
            <ListItemButton onClick={() => handleNavigate(`/courses/${category.toLowerCase().replace(/ /g, '-')}`)}>
              <ListItemIcon><CategoryIcon /></ListItemIcon>
              <ListItemText primary={category} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
