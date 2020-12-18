import styled from "styled-components";
import backImg from "../../assets/teamImg.jpg";

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

export const Title = styled.h1`
  text-align: right;
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
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
