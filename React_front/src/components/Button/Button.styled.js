import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) =>
    props.size !== "small"
      ? props.theme.primary.fontSize
      : props.theme.secondary.fontSize};
  color: ${(props) =>
    props.color === "primary" ? props.theme.primary.color : "#000"};
  background: ${(props) => props.theme.primary.background};
  padding: ${(props) => props.theme.small.gutterSize};
  border: ${(props) =>
    props.color === "primary"
      ? props.theme.primary.border
      : props.color === "support"
      ? props.theme.support.border
      : props.theme.secondary.border};

  &:hover {
    color: ${(props) => props.theme.secondary.color};
    background: ${(props) =>
      props.color === "primary"
        ? props.theme.primary.color
        : props.color === "support"
        ? props.theme.support.color
        : "#000000"};
  }

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    font-size: ${(props) => props.theme.tiny.height};
    padding: ${(props) => props.theme.tiny.gutterSize};
  }
`;
