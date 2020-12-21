import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { Navigation } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import * as G from "../../themes/Global.styled";
import backImg from "../../assets/background.jpg";

function Home() {
  const auth = useContext(AuthContext);

  return (
    <>
      <G.PageBackground backImg={backImg} />

      <Navigation loggedIn={!!auth.token} logout={() => auth.setToken("")} />

      <Link to="/team">
        <G.BigLogo src={logoImg} alt="teamo logo" />
      </Link>
    </>
  );
}

export default Home;
