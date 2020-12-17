import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";
import React from "react";
import Navigation from "./Navigation";
import theme from "../../theme";
import { ThemeProvider } from "styled-components";

storiesOf("NavigationBar", module)
  .addDecorator(StoryRouter())
  .add("Navigation", () => (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  ));
