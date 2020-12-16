import { storiesOf } from "@storybook/react";
import React from "react";
import Notification from "./Notification.jsx";

storiesOf("Notification", module)
  .add("error", () => (
    <Notification
      notificationMessage="error notification"
      handleClick={() => console.log("click")}
      color="error"
    />
  ))
  .add("success", () => (
    <Notification
      notificationMessage="success notification"
      handleClick={() => console.log("click")}
    />
  ));
