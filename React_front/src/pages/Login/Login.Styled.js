import styled from "styled-components";

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
  padding: ${(props) => props.theme.large.gutterSize};
  background: ${(props) => props.theme.primary.background};
`;

export const ButtonBlock = styled.div`
  text-align: right;
`;

export const ErrorBlock = styled.div`
  position: absolute;
  top: ${(props) => props.theme.large.gutterSize};
`;

export const Title = styled.h1`
  text-align: right;
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
`;
