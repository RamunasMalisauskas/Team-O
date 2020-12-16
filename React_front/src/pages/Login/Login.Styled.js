import styled from "styled-components";

export const Logo = styled.img`
  height: ${(props) => props.theme.huge.height};
  position: absolute;
  bottom: 0px;
  left: 0px;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    height: ${(props) => props.theme.large.height};
  }
`;
