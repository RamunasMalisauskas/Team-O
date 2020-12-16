import { storiesOf } from "@storybook/react";
import React from "react";
import Section from "./Section";

storiesOf("Section", module)
  .add("Section Block Full-width", () => (
    <Section fullWidth={true}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus deleniti
      consequuntur mollitia, neque ab excepturi placeat itaque, perspiciatis
      deserunt dicta animi dolor maiores pariatur voluptatum explicabo quibusdam
      ex labore expedita!
    </Section>
  ))
  .add("Section Block Full-width Colored", () => (
    <Section background="#ff7f50" fullWidth={true}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus deleniti
      consequuntur mollitia, neque ab excepturi placeat itaque, perspiciatis
      deserunt dicta animi dolor maiores pariatur voluptatum explicabo quibusdam
      ex labore expedita!
    </Section>
  ));
