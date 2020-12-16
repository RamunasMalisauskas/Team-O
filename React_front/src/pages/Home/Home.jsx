import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { Navigation } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";

import * as S from "./Home.styled";

function Home() {
  const auth = useContext(AuthContext);

  return (
    <>
      <Navigation loggedIn={!!auth.token} logout={() => auth.setToken("")} />
      <S.PageBackground />

      <Link to="/">
        <S.Logo src={logoImg} alt="teamo logo" />
      </Link>
    </>
  );
}

export default Home;
