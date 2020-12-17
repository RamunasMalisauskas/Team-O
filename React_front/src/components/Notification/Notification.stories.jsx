import { storiesOf } from "@storybook/react";
import React from "react";
import Notification from "./Notification.jsx";
import theme from "../../theme";
import { ThemeProvider } from "styled-components";

storiesOf("Notification", module)
  .add("error", () => (
    <ThemeProvider theme={theme}>
      <Notification
        notificationMessage="error notification"
        handleClick={() => console.log("click")}
        color="error"
      />{" "}
    </ThemeProvider>
  ))
  .add("success", () => (
    <ThemeProvider theme={theme}>
      <Notification
        notificationMessage="success notification"
        handleClick={() => console.log("click")}
      />
    </ThemeProvider>
  ));
