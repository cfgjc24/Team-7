import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";

// ClockInOut Component
const ClockInOut = ({ emailId }) => {
  const [status, setStatus] = useState("Not clocked in");
  const [locationString, setLocationString] = useState("");
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [name, setName] = useState("");
  const [selectState, setSelectState] = useState("");

  // Get the user's location
  const getLocation = (callback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Create a location string with only numeric values
          const locationStr = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setLocationString(locationStr); // Update state with the actual coordinates
          console.log(locationStr); // Log the location string
          if (callback) callback(locationStr);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Handle Emergency Toggle
  const handleEmergencyToggle = (event) => {
    const isActive = event.target.checked;
    setEmergencyActive(isActive);
    alert(`Emergency status: ${isActive ? "Emergency" : "Non-Emergency"}`);

    fetch("/api/changeAlert", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify({ caregiverid: emailId }), // Include caregiverid in the body
    })
      .then((response) => response.text()) // Assuming the response is just a text message
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  // Get the current time
  const getCurrTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };

  // Handle Clock In button click
  const handleClockIn = () => {
    getLocation(() => {
      const time = getCurrTime();
      const info = {
        name,
        location: locationString, // Updated with the actual digits of location
        emailId,
        currentState: selectState,
        timestamp: time,
        active: true, // Active when clocking in
      };
      alert(`Clocked In: ${JSON.stringify(info)}`);
      setStatus(`Clocked in at ${time}`);

      fetch("/api/clockIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          caregiverID: emailId,
          state: selectState,
          geodata: locationString, // Use the actual locationString
          client: name,
          timestamp: time,
          active: true, // Active when clocking in
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    });
  };

  // Handle Clock Out button click
  const handleClockOut = () => {
    const time = getCurrTime();
    const info = {
      name,
      location: locationString, // Updated with the actual digits of location
      emailId,
      currentState: selectState,
      timestamp: time,
      active: false, // Inactive when clocking out
    };
    alert(`Clocked Out: ${JSON.stringify(info)}`);
    setStatus(`Clocked out at ${time}`);
    // Uncomment and modify the fetch request as needed
    /*
    fetch('api/clockOut', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    */
    fetch(`127.0.0.1:8080/clockOut?caregiverid=${emailId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify({ caregiverid: emailId }), // Include caregiverid in the body
    })
      .then((response) => response.text()) // Assuming the response is just a text message
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          TimeSheet
        </Typography>

        <Box
          mt={5}
          mb={5}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h6">Status: {status}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClockIn}
            style={{ marginRight: "10px" }}
          >
            Clock In
          </Button>
          <Typography variant="body1" gutterBottom>
            Click to clock in to shift
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClockOut}
            style={{ marginRight: "10px" }}
          >
            Clock Out
          </Button>
          <Typography variant="body1" gutterBottom>
            Click to clock out of shift
          </Typography>
        </Box>
      </Box>

      <Box
        mt={5}
        mb={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <FormControlLabel
          control={
            <Switch
              checked={emergencyActive}
              onChange={handleEmergencyToggle}
              color="secondary"
            />
          }
          label="Emergency"
        />
        <Typography variant="body1" gutterBottom>
          Toggle Emergency (Emergency/Non-Emergency)
        </Typography>
      </Box>

      <Typography align="left">Enter your client name below</Typography>
      <BasicTextFields setName={setName} />

      <Typography align="left">Enter your shift status below</Typography>
      <BasicSelect setSelectState={setSelectState} />

      <Box
        mt={2}
        mb={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={handleClockIn} // Submit button calls clock in for demonstration
          style={{
            backgroundColor: "green",
            color: "white",
          }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

// BasicSelect Component
const BasicSelect = ({ setSelectState }) => {
  const handleChange = (event) => {
    setSelectState(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="state-select-label">Current State</InputLabel>
      <Select labelId="state-select-label" onChange={handleChange}>
        <MenuItem value="Recreational External Activity">Recreational</MenuItem>
        <MenuItem value="Leisure At Home Activity">Leisure</MenuItem>
        <MenuItem value="Emotional Support">Emotional</MenuItem>
      </Select>
    </FormControl>
  );
};

// BasicTextFields Component (with setName prop)
const BasicTextFields = ({ setName }) => {
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "63ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={handleNameChange}
      />
    </Box>
  );
};

export default ClockInOut;
export { BasicSelect };
export { BasicTextFields };
