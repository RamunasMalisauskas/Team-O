import { storiesOf } from "@storybook/react";
import React from "react";
import Input from "./Input";
import theme from "../../theme";
import { ThemeProvider } from "styled-components";

storiesOf("Input", module)
  .add("text input", () => (
    <ThemeProvider theme={theme}>
      <Input
        type="text"
        placeholder="Name"
        handleChange={(e) => console.log(e.target.value)}
      />
    </ThemeProvider>
  ))
  .add("number input", () => (
    <ThemeProvider theme={theme}>
      <Input
        type="number"
        placeholder="1 . 2 . 3"
        handleChange={(e) => console.log(e.target.value)}
      />
    </ThemeProvider>
  ))
  .add("text area input", () => (
    <ThemeProvider theme={theme}>
      <Input
        type="textarea"
        placeholder="text area"
        handleChange={(e) => console.log(e.target.value)}
      />
    </ThemeProvider>
  ))
  .add("dropdown", () => (
    <ThemeProvider theme={theme}>
      <Input
        type="dropdown"
        handleChange={(e) => console.log(e.target.value)}
        options={[
          { name: "Vilnius", value: "vilnius" },
          { name: "Kaunas", value: "kaunas" },
        ]}
      />
    </ThemeProvider>
  ))
  .add("radio", () => (
    <ThemeProvider theme={theme}>
      <Input
        type="radio"
        handleChange={(e) => console.log(e.target.value)}
        radio={[
          { value: "boy", label: "boy" },
          { value: "girl", label: "girl" },
        ]}
      />
    </ThemeProvider>
  ))
  .add("checkbox", () => (
    <ThemeProvider theme={theme}>
      <Input
        type="checkbox"
        handleChange={(e) => console.log(e.target.value)}
        checkbox={[
          { value: "boy", label: "boy" },
          { value: "girl", label: "girl" },
        ]}
      />
    </ThemeProvider>
  ));
