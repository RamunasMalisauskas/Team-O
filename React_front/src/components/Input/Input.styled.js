import styled from "styled-components";

export const Input = styled.input`
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.secondary.fontSize};
  height: ${(props) => props.theme.standart.height};
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-bottom: ${(props) => props.theme.secondary.border};
  margin-bottom: ${(props) => props.theme.standart.gutterSize};
  padding: 0 1em;
  &:focus {
    border-bottom: ${(props) => props.theme.primary.border};
  }
`;

export const TextArea = styled.textarea`
  height: ${(props) => props.theme.large.height};
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-bottom: ${(props) => props.theme.secondary.border};
  margin-bottom: ${(props) => props.theme.standart.gutterSize};
  padding: ${(props) => props.theme.small.gutterSize};
  &:focus {
    border-bottom: ${(props) => props.theme.primary.border};
  }
`;

export const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-bottom: ${(props) => props.theme.primary.border};
  height: ${(props) => props.theme.standart.height};
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
  margin-left: ${(props) => props.theme.small.gutterSize};
`;

export const Label = styled.label`
  color: ${(props) => props.theme.primary.color};
  padding-left: 0.25em;
`;
