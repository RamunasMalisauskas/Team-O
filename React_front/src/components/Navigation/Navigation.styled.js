import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  border-bottom: 2px solid #000;
`;

export const Action = styled.div``;

export const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-child) {
    padding-right: 2em;
  }
`;

export const Logo = styled.img`
  max-height: 2em;
  max-width: 100%;
`;
