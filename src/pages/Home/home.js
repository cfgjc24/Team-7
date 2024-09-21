import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '/home.css';

const HomePage = () => {
    const navigate = useNavigate();
  return (
    <Container maxWidth="sm">

      <Box textAlign="center" mt={5}>

        <Typography variant="h4" gutterBottom>
          LodeWatch
        </Typography>
         <img src="lodestarlogo.png"/>
        <Typography variant="body1" gutterBottom>
        Clock In Below
        </Typography>
        
        {/* Use Link to refer to the clock page */}
        <Button variant="contained" color="primary" onClick={() => navigate("/clock-in")}>
          Go to Clock In/Out Page
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
