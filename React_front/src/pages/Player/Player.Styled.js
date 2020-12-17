import styled from "styled-components";
import backImg from "../../assets/playerImg.jpg";

export const PageBackground = styled.div`
  position: fixed;
  z-index: -1;
  background: url(${backImg}) center top;
  object-fit: cover;
  height: ${(props) => props.theme.fullHeight};
  width: 100%;

  @media (max-width: 66em) {
    background: url(${backImg});
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

export const Subtitle = styled.h3`
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
`;
export const Table = styled.table`
  border: ${(props) => props.theme.primary.border};
  padding: ${(props) => props.theme.standart.gutterSize};
  width: 100%;
`;

export const TH = styled.th`
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
`;

export const TR = styled.tr``;

export const TD = styled.td`
  padding-top: ${(props) => props.theme.standart.gutterSize};
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
  border-bottom: ${(props) => props.theme.secondary.border};
`;

export const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-around;
`;
