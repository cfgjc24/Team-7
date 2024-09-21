import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          LodeWatch
        </Typography>
        <img
          src="lodestarlogo.png"
          style={{ width: "500px", height: "auto" }}
        />
        <Typography variant="body1" gutterBottom>
          Sign In Below
        </Typography>
        {/* EDIT for Sign In Button  */}
        <Button variant="contained" color="primary" onClick={() => navigate("/signin")}>
          Sign In Page
        </Button>

        <Typography variant="body1" gutterBottom>
          Clock In Below
        </Typography>
     {/* EDIT for Supervisor Dashboard */}
        <Button variant="contained" color="primary" onClick={() => navigate("/ProviderMap")}>
          Supervisor Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
