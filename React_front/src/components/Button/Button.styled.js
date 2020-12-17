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
      : props.theme.secondary.border};
  position: ${(props) => (props.sticky === true ? "sticky" : "")};
  top: ${(props) =>
    props.sticky === true ? props.theme.small.gutterSize : ""};
  &:hover {
    color: ${(props) => props.theme.secondary.color};
    background: ${(props) =>
      props.color === "primary" ? props.theme.primary.color : "#000"};
  }

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    font-size: ${(props) => props.theme.tiny.height};
    padding: ${(props) => props.theme.tiny.gutterSize};
  }
`;
