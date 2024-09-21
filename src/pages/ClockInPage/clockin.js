import React, { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const ClockInOut = () => {
    console.log("heree")
  const [status, setStatus] = useState('Not clocked in');

  //  get the current time
  const getCurrTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };

  // Handle Clock In button click
  const handleClockIn = () => {
    const time = getCurrTime();
    setStatus(`Clocked in at ${time}`);
  };

  // Handle Clock Out button click
  const handleClockOut = () => {
    const time = getCurrTime();
    setStatus(`Clocked out at ${time}`);
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Clock In / Clock Out
        </Typography>
        
        <Box mt={3} mb={3}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleClockIn}
            style={{ marginRight: '10px' }}
          >
            Clock In
          </Button>
          
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleClockOut}
          >
            Clock Out
          </Button>
        </Box>
        
        <Typography variant="h6">
          Status: {status}
        </Typography>
      </Box>
    </Container>
  );
};

export default ClockInOut;
