import styled from "styled-components";

export const SectionBlock = styled.section`
  background: ${(props) => props.background};
  border: ${(props) => (props.border === true ? "2px solid #000" : "0px")};
`;

export const ContainerBox = styled.div`
  max-width: 1068px;
  margin: 0 auto;
  padding: 1em 2em;
`;
