import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-bottom: 2px solid gray;
  height: ${(props) => props.theme.stardart.heigth};
  padding: 0 1em;
  margin-bottom: 2em;
  &:focus {
    border-bottom: 2px solid #ff7f50;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-bottom: 2px solid gray;
  height: ${(props) => props.theme.large.heigth};
  padding: 1em;
  margin-bottom: 2em;
  &:focus {
    border-bottom: 2px solid #ff7f50;
  }
`;

export const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-bottom: ${(props) => props.theme.primary.border};
  height: ${(props) => props.theme.stardart.heigth};
  padding: 0 1em;
  &:focus {
    border: ${(props) => props.theme.secondary.border};
  }
`;

export const RadioInput = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 1em 0;
  display: flex;
  border: 0;
  border-bottom: ${(props) => props.theme.primary.border};
  &:hover {
    border: ${(props) => props.theme.secondary.border};
  }
`;

export const Radio = styled.input`
  cursor: pointer;
  margin-left: 1em;
`;

export const Label = styled.label`
  color: ${(props) => props.theme.primary.color};
  padding-left: 0.25em;
`;
