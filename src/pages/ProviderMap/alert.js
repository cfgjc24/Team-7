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
    setAlertList(["alert 1", "alert 2"]);
  }, []);

  return (
    <Container>
      <p>Alerts</p>
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
