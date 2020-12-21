import { Link } from "react-router-dom";
import styled from "styled-components";

// ### TITLES ###

export const Title = styled.h1`
  text-align: right;
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
`;

// ### LINKS ###

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.primary.color};
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.secondary.fontSize};
  cursor: pointer;
  text-decoration: none;
`;

// ### IMAGES ###

export const Logo = styled.img`
  height: ${(props) => props.theme.standart.height};
  position: fixed;
  bottom: 0px;
  left: 0px;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    height: ${(props) => props.theme.standart.height};
  }
`;

export const BigLogo = styled.img`
  height: ${(props) => props.theme.huge.height};
  position: fixed;
  bottom: 0px;
  left: 0px;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    height: ${(props) => props.theme.standart.height};
  }
`;

// ### BIG COMPONENT BLOCKS ###

export const PageBackground = styled.div`
  position: fixed;
  z-index: -1;
  background: url(${(props) => props.backImg}) center;
  object-fit: cover;
  height: ${(props) => props.theme.fullHeight};
  width: 100%;
`;

export const Block = styled.div`
  min-width: ${(props) => (props.large === true ? "50vw" : "30vw")};
  margin-top: ${(props) => props.theme.standart.gutterSize};
  padding: ${(props) => props.theme.large.gutterSize};
  background: ${(props) => props.theme.primary.background};
`;

export const Frame = styled.div`
  border: ${(props) =>
    props.border === "support"
      ? props.theme.support.border
      : props.theme.primary.border};
  padding: ${(props) => props.theme.standart.gutterSize};
  background-color: ${(props) => props.theme.secondary.color};

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    padding: ${(props) => props.theme.tiny.gutterSize};
  }
`;

// ### SMALL COMPONENT BLOCKS ###

export const ButtonBlock = styled.div`
  margin-top: ${(props) => props.theme.standart.gutterSize};
  text-align: right;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    display: none;
  }
`;

export const InputBlock = styled.div`
  padding: ${(props) => props.theme.small.gutterSize} 0;
  position: ${(props) => (props.sticky === true ? "sticky" : "")};
  top: ${(props) =>
    props.sticky === true ? props.theme.large.gutterSize : ""};
`;

export const ErrorBlock = styled.div`
  margin-top: ${(props) => props.theme.small.gutterSize};
`;

export const InputBrick = styled.div`
  padding-top: ${(props) => props.theme.standart.gutterSize};
`;

export const TableButtonBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${(props) => props.theme.secondary.border};
  &:hover {
    border-bottom: ${(props) => props.theme.primary.border};
  }
`;
