import styled from "styled-components";
import backImg from "../../assets/teamImg.jpg";
import { Link } from "react-router-dom";

export const PageBackground = styled.div`
  position: fixed;
  z-index: -1;
  background: url(${backImg}) center;
  object-fit: cover;
  height: ${(props) => props.theme.fullHeight};
  width: 100%;
`;

export const Frame = styled.div`
  border: ${(props) => props.theme.support.border};
  padding: ${(props) => props.theme.standart.gutterSize};
  background-color: ${(props) => props.theme.secondary.color};

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    padding: ${(props) => props.theme.tiny.gutterSize};
  }
`;

export const Title = styled.h2`
  color: ${(props) =>
    props.selected === true ? props.theme.support.color : "#000"};
  text-align: right;
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.primary.color};
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.secondary.fontSize};
  cursor: pointer;
  text-decoration: none;
`;

export const Block = styled.div`
  width: 50vw;
  margin-top: ${(props) => props.theme.standart.gutterSize};
  padding: ${(props) => props.theme.large.gutterSize};
  background: ${(props) => props.theme.primary.background};
`;

export const Logo = styled.img`
  height: ${(props) => props.theme.standart.height};
  position: fixed;
  bottom: 0px;
  left: 0px;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    height: ${(props) => props.theme.standart.height};
  }
`;

export const P = styled.p`
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
`;

export const FlexBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    text-align: center;
    margin: 0 auto;
    display: block;
  }
`;

export const InputBlock = styled.div`
  padding: ${(props) => props.theme.small.gutterSize} 0;
  position: ${(props) => (props.sticky === true ? "sticky" : "")};
  top: ${(props) =>
    props.sticky === true ? props.theme.large.gutterSize : ""};
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

export const ButtonBlock = styled.div`
  margin-top: ${(props) => props.theme.standart.gutterSize};
  text-align: right;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    display: none;
  }
`;

export const Subtitle = styled.h3`
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
  border-bottom: ${(props) => props.theme.support.border};
  padding: ${(props) => props.theme.tiny.gutterSize} 0;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    font-size: ${(props) => props.theme.tiny.height};
    padding: ${(props) => props.theme.small.gutterSize};
  }
`;
