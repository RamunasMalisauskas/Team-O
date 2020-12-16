import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Action = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    display: block;
    background-color: ${(props) => props.theme.secondary.color};
  }
`;

export const LinkBlock = styled.div`
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
  font-size: ${(props) => props.theme.small.height};
  margin: 0 auto;
  text-align: center;
  padding: ${(props) => props.theme.small.gutterSize};
  height: ${(props) => props.theme.fullHeight};
  width: 33%;
  &:hover {
    background-color: ${(props) => props.theme.secondary.background};
    transition: ${(props) => props.theme.transition};
  }

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    display: block;
  }
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.secondary.color};
  cursor: pointer;
  text-decoration: none;
  &:not(:last-child) {
    padding-right: ${(props) => props.theme.standart.gutterSize};
  }
`;
