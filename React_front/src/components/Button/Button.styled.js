import styled from "styled-components";

export const Button = styled.button`
  color: ${(props) => (props.color === "primary" ? "#ff7f50" : "#000")};
  background: #fff;
  padding: 0.5em;
  border-radius: 0.5em;
  border: ${(props) =>
    props.color === "primary" ? "2px solid #ff7f50" : "2px solid #000"};
  cursor: pointer;
  &:hover {
    color: white;
    background: ${(props) =>
      props.color === "primary" ? "#ff7f50" : "#000"};
  }
`;
