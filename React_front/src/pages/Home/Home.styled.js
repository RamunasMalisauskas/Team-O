import styled from "styled-components";
import backImg from "../../assets/background.jpg";

export const Logo = styled.img`
  height: 9em;
  position: absolute;
  bottom: 0px;
  left: 0px;
`;

export const PageBackground = styled.div`
  background: url(${backImg}) center left;
  object-fit: cover;
  height: 100vh;
`;
