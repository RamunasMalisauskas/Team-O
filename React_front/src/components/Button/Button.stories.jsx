import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "./Button.jsx";

storiesOf("Button", module)
  .add("Primary Button", () => (
    <Button handleClick={() => console.log("click")} color="primary">
      main button
    </Button>
  ))
  .add("Secondary Button", () => (
    <Button handleClick={() => console.log("click")}>supporing button</Button>
  ));
