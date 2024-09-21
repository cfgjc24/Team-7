import React, { useState } from 'react';
import { Button, Container, Typography, Box, Select, InputLabel, MenuItem, FormControl } from '@mui/material';

// ClockInOut Component
const ClockInOut = () => {
  const [status, setStatus] = useState('Not clocked in');
  const [location, setLocation] = useState(null);

  // Get the user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude, longitude});
          console.log(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Get the current time
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
    getLocation();
    setStatus(`Clocked out at ${time}`);
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          TimeSheet
        </Typography>

        <Box mt={5} mb={5} display="flex" flexDirection="column" alignItems="center">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleClockIn}
            style={{ marginRight: '10px' }}
          >
            Clock In
          </Button>
          <Typography variant="h10" gutterBottom>
            Click to clock in to shift 
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleClockOut}
            style={{ marginRight: '10px' }}
          >
            Clock Out
          </Button>
          <Typography variant="h10" gutterBottom>
            Click to clock out of shift 
          </Typography>
        </Box>

        <Box mt={5} mb={5} display="flex" flexDirection="column" alignItems="center">
        <Button 
        variant="contained" 
        onClick={handleClockOut}
        style={{ 
            backgroundColor: 'red',  
            color: 'white',          
            marginRight: '10px'
  }}
>
EMERGENCY
</Button>
          <Typography variant="h10" gutterBottom>
            ONLY IN CASE OF EMERGENCY 
          </Typography>
        </Box>
          <Typography variant="h6">
          Status: {status}
        </Typography>
        <Typography>
            Enter your shift details below
          </Typography>

    
      <BasicSelect />  
      <Box mt={5} mb={5} display="flex" flexDirection="column" alignItems="center">
        <Button 
        variant="contained" 
        onClick={handleClockOut}
        style={{ 
            backgroundColor: 'green',  
            color: 'white',           
            marginLeft: '300px'
  }}
>
Submit
</Button>

        </Box>
          
        
      </Box>
    </Container>
  );
};

// BasicSelect Component
const BasicSelect = () => {
  const [selectState, setSelectState] = useState('');

  const handleChange = (event) => {
    setSelectState(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="state-select-label">Current State</InputLabel>
      <Select
        labelId="state-select-label"
        value={selectState}
        onChange={handleChange}
      >
        <MenuItem value="Recreational External Activity">Recreational</MenuItem>
        <MenuItem value="Leisure At Home Activity">Leisure</MenuItem>
        <MenuItem value="Emotional Support">Emotional</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ClockInOut;

export { BasicSelect };
