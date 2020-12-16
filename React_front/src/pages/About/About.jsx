import React, { useContext } from "react";
import { Section } from "../../components/";
import { AuthContext } from "../../contexts/AuthContext";

function About() {
  const auth = useContext(AuthContext);

  return <Section> {auth.token ? "This is secret page you have unlocked" : "you forgot to login"}</Section>;
}

export default About;
