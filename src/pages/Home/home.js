import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        {/*         <Typography variant="h4" gutterBottom>
          LodeWatch
        </Typography> */}
        <img
          src="lodestarlogo.png"
          style={{ width: "500px", height: "auto" }}
        />
        {/*         <Typography variant="body1" gutterBottom>
          Sign In Below
        </Typography> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.href = "http://localhost:5000/login";
          }}
        >
          Sign In
        </Button>

        {/*         <Typography variant="body1" gutterBottom>
          Clock In Below
        </Typography>
 */}
        {/* Use Link to refer to the clock page */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/clock-in")}
        >
          Clock In/Out
        </Button>
        {/* 
        <Typography variant="body1" gutterBottom>
          Supervisor Dashboard
        </Typography> */}
        {/* EDIT for Supervisor Dashboard */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/clock-in")}
        >
          Supervisor Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
