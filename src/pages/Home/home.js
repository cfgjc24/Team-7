import React, { useContext } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../..";

const HomePage = () => {
  const user = useContext(AuthContext);

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
          Hello {user.name}!
        </Typography>

        <Typography variant="body1" gutterBottom>
          Clock In Below
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/clock-in")}
        >
          Clock In/Out
        </Button>
        {/* EDIT for Supervisor Dashboard */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/ProviderMap")}
        >
          Supervisor Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
