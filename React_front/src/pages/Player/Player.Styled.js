import styled from "styled-components";
import backImg from "../../assets/playerImg.jpg";

export const PageBackground = styled.div`
  position: fixed;
  z-index: -1;
  background: url(${backImg}) center top;
  object-fit: cover;
  height: ${(props) => props.theme.fullHeight};
  width: 100%;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
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

export const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InputBlock = styled.div`
  padding: ${(props) => props.theme.small.gutterSize} 0;
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
  border: ${(props) => props.theme.primary.border};
  padding: ${(props) => props.theme.standart.gutterSize};

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    font-size: ${(props) => props.theme.tiny.height};
    padding: ${(props) => props.theme.small.gutterSize};
  }
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

export const Frame = styled.div`
  border: ${(props) => props.theme.primary.border};
  padding: ${(props) => props.theme.standart.gutterSize};

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    padding: ${(props) => props.theme.tiny.gutterSize};
  }
`;
