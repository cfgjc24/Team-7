import React, { useState } from 'react';
import { Button, Container, Typography, Box, Select, InputLabel, MenuItem, FormControl, TextField } from '@mui/material';

// ClockInOut Component
const ClockInOut = () => {
  const [status, setStatus] = useState('Not clocked in');
  const [location, setLocation] = useState(null);
  const [locationString, setLocationString] = useState('');

  // Get the user's location
  const getLocation = (callback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationStr = `Latitude: ${latitude}, Longitude: ${longitude}`;
          setLocation({ latitude, longitude });
          setLocationString(locationStr);
          console.log(locationStr); 
          if (callback) callback(locationStr); 
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  

  //Handle Emergency Buttion
  const handleEmergency =() => {
    getLocation((locationStr) =>{
        alert(`Emergency button clicked. Location: ${locationStr}`);
        setStatus(`Emergency button clicked at ${getCurrTime()}`);
    });
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
        <Typography variant="h6">
          Status: {status}
        </Typography>
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
        </Box>

        
        <Box mt={5} mb={5} display="flex" flexDirection="column" alignItems="center">
        <Button 
        variant="contained" 
        onClick={handleEmergency}
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
        <Typography>
            Enter your client name below
          </Typography>
        <BasicTextFields /> 
        <Box mt={0} mb={0} display="flex" flexDirection="column" alignItems="center">
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
          
        <Typography align ="left">
            Enter your shift status below
          </Typography>

    
      <BasicSelect />  
      <Box mt={1} mb={0} display="flex" flexDirection="column" alignItems="center">
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
const BasicTextFields = () => {
    return (
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '63ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        
      </Box>
    );
  }

export default ClockInOut;

export { BasicSelect };

export {BasicTextFields}

//name,location, client id, current state, timestamp, active, emergency