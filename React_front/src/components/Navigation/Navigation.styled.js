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
    background-color: ${(props) => props.theme.secondary.background};
    display: block;
  }
`;

export const LinkBlock = styled.div`
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
  font-size: ${(props) => props.theme.small.height};
  margin: 0 auto;
  text-align: center;
  padding: ${(props) => props.theme.small.gutterSize};
  height: calc(100vh - 2em);
  width: 33%;
  &:hover {
    background-color: ${(props) => props.theme.secondary.background};
    transition: ${(props) => props.theme.transition};
    &:nth-child(2) {
      background-color: ${(props) => props.theme.support.background};
    }
    &:nth-child(3) {
      background-color: ${(props) => props.theme.complimentary.background};
    }
  }

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    height: inherit;
    margin: inherit;
    text-align: left;
  }
`;

export const StyledLink = styled(Link)`
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
  color: ${(props) => props.theme.secondary.color};
  cursor: pointer;
  text-decoration: none;
  &:not(:last-child) {
    padding-right: ${(props) => props.theme.standart.gutterSize};
  }
`;
