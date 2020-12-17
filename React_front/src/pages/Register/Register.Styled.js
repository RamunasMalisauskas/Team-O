import styled from "styled-components";
import backImg from "../../assets/loginImg.jpg";

export const Logo = styled.img`
  height: ${(props) => props.theme.huge.height};
  position: absolute;
  bottom: 0px;
  left: 0px;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    height: ${(props) => props.theme.standart.height};
  }
`;

export const Block = styled.div`
  margin-top: ${(props) => props.theme.standart.gutterSize};
  padding: ${(props) => props.theme.large.gutterSize};
  background: ${(props) => props.theme.primary.background};
`;

export const ButtonBlock = styled.div`
  margin-top: ${(props) => props.theme.standart.gutterSize};
  text-align: right;
  
  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    display: none;
  }
`;

export const ErrorBlock = styled.div`
  margin-top: ${(props) => props.theme.small.gutterSize};
`;

export const Title = styled.h1`
  text-align: right;
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
`;

export const PageBackground = styled.div`
  position: fixed;
  z-index: -1;
  background: url(${backImg}) center;
  object-fit: cover;
  height: ${(props) => props.theme.fullHeight};
  width: 100%;

  @media (max-width: 66em) {
    background: url(${backImg});
  }
`;
