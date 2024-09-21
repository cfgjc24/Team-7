import React, { useState, useEffect } from "react";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";

const AlertLayout = ({ alertList }) => {
  const [alert, setSelectedAlert] = useState(null);
  const onAlertSelect = (alert) => {
    setSelectedAlert(alert);
  };

  return (
    <Container sx={{ marginTop: "20px" }}>
      <h2>Alerts</h2>
      <hr></hr>
      {alert ? (
        <React.Fragment>
          <Typography variant="h6">{alert.caregivername}</Typography>
          <Typography>Phone: {alert.phonenumber}</Typography>
          <Typography>State: {alert.state}</Typography>
          <Typography>Client: {alert.client}</Typography>
          <Typography>Active: {alert.active ? "Yes" : "No"}</Typography>
          <Typography>Coordinates: {alert.geodata.join(", ")}</Typography>
          <Button
            variant="outlined"
            onClick={() => setSelectedAlert(null)}
            sx={{
              color: "black",
              borderColor: "black",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
              marginTop: "10px",
            }}
          >
            Back to List
          </Button>
        </React.Fragment>
      ) : (
        <List>
          {alertList.map((alert, index) => (
            <React.Fragment key={index}>
              <ListItem button onClick={() => onAlertSelect(alert)}>
                <ListItemText primary={"Crisis: " + alert.caregiverID} />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};
export default AlertLayout;
