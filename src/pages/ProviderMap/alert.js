import React, { useState, useEffect } from "react";
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
const AlertLayout = () => {
  const [alertList, setAlertList] = useState([]);

  useEffect(() => {
    setAlertList(["Alert 1", "Alert 2"]);
  }, []);

  return (
    <Container sx={{ marginTop: "20px" }}>
      <h2>Alerts</h2>
      <hr></hr>
      <List>
        {alertList.map((alert, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText primary={alert} />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};
export default AlertLayout;
