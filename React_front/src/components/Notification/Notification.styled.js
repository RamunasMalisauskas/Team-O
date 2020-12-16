import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
  color: ${(props) =>
    props.color === "error" ? props.theme.primary.color : "#000"};
  background: ${(props) => props.theme.primary.background};
  padding: 0.5em;
  margin-left: 0.5em;
  border: ${(props) =>
    props.color === "error"
      ? props.theme.primary.border
      : props.theme.secondary.border};
  &:hover {
    color: white;
    background: ${(props) =>
      props.color === "error"
        ? props.theme.primary.color
        : props.theme.secondary.color};
  }
`;

export const Notification = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.secondary.fontSize};
  color: ${(props) =>
    props.color === "error" ? props.theme.primary.color : "#000"};
  background: ${(props) => props.theme.primary.background};
  padding: 2em;
  border: ${(props) =>
    props.color === "error"
      ? props.theme.primary.border
      : props.theme.secondary.border};
`;
