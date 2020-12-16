import styled from "styled-components";
import backImg from "../../assets/background.jpg";

export const Logo = styled.img`
  height: ${(props) => props.theme.huge.height};
  position: absolute;
  bottom: 0px;
  left: 0px;

  @media (max-width: 66em) {
    height: ${(props) => props.theme.standart.height};
  }
`;

export const PageBackground = styled.div`
  background: url(${backImg}) center left;
  object-fit: cover;
  height: ${(props) => props.theme.fullHeight};
  width: 100%;

  @media (max-width: 66em) {
    background: url(${backImg}) center center;
  }
`;
