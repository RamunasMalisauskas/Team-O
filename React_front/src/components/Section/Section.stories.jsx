import { storiesOf } from "@storybook/react";
import React from "react";
import Section from "./Section";
import theme from "../../theme";
import { ThemeProvider } from "styled-components";

storiesOf("Section", module)
  .add("Section Block Full-width", () => (
    <ThemeProvider theme={theme}>
      <Section fullWidth={true}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
        deleniti consequuntur mollitia, neque ab excepturi placeat itaque,
        perspiciatis deserunt dicta animi dolor maiores pariatur voluptatum
        explicabo quibusdam ex labore expedita!
      </Section>
    </ThemeProvider>
  ))
  .add("Section Block Full-width Colored", () => (
    <ThemeProvider theme={theme}>
      <Section background="#ff7f50" fullWidth={true}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
        deleniti consequuntur mollitia, neque ab excepturi placeat itaque,
        perspiciatis deserunt dicta animi dolor maiores pariatur voluptatum
        explicabo quibusdam ex labore expedita!
      </Section>
    </ThemeProvider>
  ));
