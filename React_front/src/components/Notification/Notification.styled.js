import styled from "styled-components";

export const Button = styled.button`
  color: ${(props) => (props.color === "error" ? "#ff7f50" : "#000")};
  background: #fff;
  padding: 0.5em;
  margin-left: 0.5em;
  border-radius: 0.5em;
  border: ${(props) =>
    props.color === "error" ? "2px solid #ff7f50" : "2px solid #000"};
  cursor: pointer;
  &:hover {
    color: white;
    background: ${(props) => (props.color === "error" ? "#ff7f50" : "#000")};
  }
`;

export const Notification = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => (props.color === "error" ? "#ff7f50" : "#000")};
  background: #fff;
  padding: 2em;
  border-radius: 0.5em;
  border: ${(props) =>
    props.color === "error" ? "2px solid #ff7f50" : "2px solid #000"};
`;
