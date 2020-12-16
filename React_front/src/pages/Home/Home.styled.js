import styled from "styled-components";
import backImg from "../../assets/background.jpg";

export const Logo = styled.img`
  height: 9em;
  position: absolute;
  bottom: 0px;
  left: 0px;
  @media (max-width: 1068px) {
    height: 3em;
  }
`;

export const PageBackground = styled.div`
  background: url(${backImg}) center left;
  object-fit: cover;
  height: 100vh;
  width: 100%;

  @media (max-width: 1068px) {
    background: url(${backImg}) center center;
  }
`;
