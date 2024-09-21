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

// Get the current time
const getCurrTime = () => {
  const now = new Date();
  return now.toLocaleTimeString();
};

// ClockInOut Component
const ClockInOut = ({ }) => {
  const [emailId, setEmailId] = useState("ninjatoob@gmail.com")
  const [status, setStatus] = useState("Not clocked in");
  const [location, setLocation] = useState(null);
  const [locationString, setLocationString] = useState("");
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [name, setName] = useState("");
  const [selectState, setSelectState] = useState("");

  const [userData, setUserData] = useState({
    caregiverID: emailId,
    state: status,
    geodata: locationString,
    client: name,
    timestamp: getCurrTime(),
    active: true,
    alert: emergencyActive,
  });

  // State to store submitted information
  const [submittedInfo, setSubmittedInfo] = useState({});

  // Get the user's location
  const getLocation = (callback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationStr = `${latitude},${longitude}`;
          setLocation({ latitude, longitude });
          setLocationString(locationStr);
          console.log(locationStr);
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
    fetch(`http://127.0.0.1:5000/changeAlert?caregiverid=${emailId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    alert(`Emergency status: ${isActive ? "Emergency" : "Non-Emergency"}`);
  };


  const handleClockIn = () => {
    getLocation(() => {
      const time = getCurrTime();
      const updatedData = {
        ...userData,
        client: name,
        geodata: locationString,
        currentState: selectState,
        timestamp: time,
        active: true,
      };
      setUserData(updatedData);
      setStatus(`Clocked in at ${time}`);
      alert(`Clocked In: ${JSON.stringify(updatedData)}`);
      fetch(`http://127.0.0.1:5000/clockIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caregiverID: emailId,
          state: status,
          geodata: locationString,
          client: name,
          timestamp: getCurrTime(),
          active: true,
          alert: emergencyActive
        })
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));
    });
  };






  // Handle Clock Out button click
  const handleClockOut = () => {
    const time = getCurrTime();
    const info = {
      name,
      location: locationString,
      emailId,
      currentState: selectState,
      timestamp: time,
      active: false, // Inactive when clocking out
    };
    setSubmittedInfo(info);
    fetch(`http://127.0.0.1:5000/clockOut?caregiverid=${emailId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    alert(`Clocked Out: ${JSON.stringify(info)}`);
    setStatus(`Clocked out at ${time}`);
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
