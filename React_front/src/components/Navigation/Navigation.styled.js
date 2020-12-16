import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.div`
  position: absolute;
  top: 0;
  min-width: 100%;
`;

export const Action = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const LinkBlock = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1em;
  height: calc(100vh - 2em);
  width: 33%;
  &:hover {
    background-color: rgba(241, 90, 36, 0.6);
    transition: 1s;
  }
`;

export const StyledLink = styled(Link)`
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  &:not(:last-child) {
    padding-right: 2em;
  }
`;
