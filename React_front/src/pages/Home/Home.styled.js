import styled from "styled-components";
import backImg from "../../assets/background.jpg";

export const Logo = styled.img`
  max-height: 9em;
  max-width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const PageBackground = styled.div`
  background: url(${backImg}) center left;
  object-fit: cover;
  height: calc(100vh - 3.3em);
  width: 100%;
`;
