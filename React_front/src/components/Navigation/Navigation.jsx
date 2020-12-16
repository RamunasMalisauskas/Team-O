import React from "react";
import * as S from "./Navigation.styled";
import PropType from "prop-types";

function Navigation({ loggedIn, logout }) {
  return (
    <S.Header>
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
    </S.Header>
  );
}

Navigation.propTypes = {
  loggedIn: PropType.bool,
  logout: PropType.func,
};

export default Navigation;
