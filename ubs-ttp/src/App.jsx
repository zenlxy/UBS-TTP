import React from 'react';
import styles from './App.module.css';
import { Button, Typography } from '@mui/material';

function App() {
  return (
    <div className={styles.container}>
      <Typography variant="h5">Accelerate Your Tech Journey</Typography>
      <Button variant="outlined">Get Started</Button>
    </div>
  );
}

export default App;

