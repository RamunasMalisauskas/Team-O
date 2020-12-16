import styled from "styled-components";

export const SectionBlock = styled.section`
  background: ${(props) => props.background};
  display: ${(props) => (props.center === true ? "flex" : "block")};
  justify-content: ${(props) => (props.center === true ? "center" : "")};
  align-items: ${(props) => (props.center === true ? "center" : "")};
  min-height: ${(props) =>
    props.center === true ? props.theme.fullHeight : ""};
`;

export const ContainerBox = styled.div`
  max-width: ${(props) => props.theme.websiteWidth};
  margin: 0 auto;
  padding: 1em 2em;
`;
