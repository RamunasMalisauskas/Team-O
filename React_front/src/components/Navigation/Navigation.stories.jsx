import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";
import React from "react";
import Navigation from "./Navigation";

storiesOf("NavigationBar", module)
  .addDecorator(StoryRouter())
  .add("Navigation", () => <Navigation />);
