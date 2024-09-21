import React, { useContext } from "react";
import { Button, Container, Typography, Box, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../..";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap');
</style>;

const StyledButton = styled(Button)({
  //background color of button
  backgroundColor: "rgba(102, 154, 204, 0.5)",
  border: "1px solid #7D9CCE",
  color: "black",
  //size of button
  width: "40%",
  fontSize: "13px",
  fontFamily: "inherit",
  lineHeight: 3,
  marginLeft: 10,
});

const HomePage = () => {
  const user = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" backgroundColor="#ffffff">
      <Box textAlign="center" mt={5}>
        <Typography
          variant="h2"
          gutterBottom
          fontFamily={"Crimson Text"}
          sx={{ marginTop: "150px", marginBottom: "30px" }}
        >
          LodeWatch
        </Typography>
        <img
          src="lodestarlogo.png"
          style={{
            width: "200px",
            height: "auto",
            position: "absolute", // Set position to absolute
            top: "0", // Align to top
            left: "0", // Align to left
          }}
        />

        {/*         <Typography variant="body1" gutterBottom>
          Hello {user.name}!
        </Typography>

        <Typography variant="body1" gutterBottom>
          Clock In Below
        </Typography> */}
        <StyledButton
          variant="outlined"
          color="primary"
          onClick={() => navigate("/clock-in")}
        >
          Clock In/Out
        </StyledButton>
        {/* EDIT for Supervisor Dashboard */}
        <StyledButton
          variant="outlined"
          color="primary"
          onClick={() => navigate("/ProviderMap")}
        >
          Supervisor Dashboard
        </StyledButton>
        <img
          src="children_health2-removebg-preview.png"
          style={{
            width: "400px",
            left: "0",
            height: "auto",
            position: "absolute",
            bottom: "0",
          }}
        ></img>
        <img
          src="mental_health1-removebg-preview.png"
          style={{
            width: "500px",
            bottom: "0",
            right: "0",
            height: "auto",
            position: "absolute",
          }}
        ></img>
      </Box>
    </Container>
  );
};

export default HomePage;
