import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "./Button.jsx";
import theme from "../../theme";
import { ThemeProvider } from "styled-components";

storiesOf("Button", module)
  .add("Primary Button", () => (
    <ThemeProvider theme={theme}>
      <Button handleClick={() => console.log("click")} color="primary">
        main button
      </Button>
    </ThemeProvider>
  ))
  .add("Secondary Button", () => (
    <ThemeProvider theme={theme}>
      <Button handleClick={() => console.log("click")}>supporing button</Button>
    </ThemeProvider>
  ))
  .add("Small Button", () => (
    <ThemeProvider theme={theme}>
      <Button handleClick={() => console.log("click")} size="small">
        small button
      </Button>
    </ThemeProvider>
  ));
