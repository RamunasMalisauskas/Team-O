import React from "react";
import * as S from "./Navigation.styled";
import PropType from "prop-types";

function Navigation({ loggedIn, logout }) {
  return (
    <S.Header>
      <S.Action>
        {loggedIn && (
          <>
            <S.LinkBlock>
              <S.StyledLink to="/player">PLAYER</S.StyledLink>
            </S.LinkBlock>
            <S.LinkBlock>
              <S.StyledLink to="/team">TEAM</S.StyledLink>
            </S.LinkBlock>
            <S.LinkBlock>
              <S.StyledLink onClick={logout} to="/">
                LOGOUT
              </S.StyledLink>
            </S.LinkBlock>
          </>
        )}
        {!loggedIn && (
          <>
            <S.LinkBlock>
              <S.StyledLink to="/login">LOGIN</S.StyledLink>
            </S.LinkBlock>
            <S.LinkBlock>
              <S.StyledLink to="/register">REGISTER</S.StyledLink>
            </S.LinkBlock>
          </>
        )}
      </S.Action>
    </S.Header>
  );
}

Navigation.propTypes = {
  loggedIn: PropType.bool,
  logout: PropType.func,
};

export default Navigation;
