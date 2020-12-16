import React from "react";
import * as S from "./Navigation.styled";
import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";

function Navigation({ loggedIn, logout }) {
  return (
    <S.Header>
      <Link to="/">
        <S.Logo src={LogoImg} alt="coral logo" />
      </Link>

      <S.Action>
        {loggedIn && (
          <>
            <S.StyledLink to="/player">PLAYER</S.StyledLink>
            <S.StyledLink to="/team">TEAM</S.StyledLink>
            <S.StyledLink onClick={logout} to="/login">
              LOGOUT
            </S.StyledLink>
          </>
        )}
        {!loggedIn && (
          <>
            <S.StyledLink to="/login">LOGIN</S.StyledLink>
            <S.StyledLink to="/register">REGISTER</S.StyledLink>
          </>
        )}
      </S.Action>
    </S.Header>
  );
}

export default Navigation;
