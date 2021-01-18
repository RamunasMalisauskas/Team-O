import styled from "styled-components";

// ### HEADINGS AND PARAGRAPHS ###

export const Title = styled.h2`
  color: ${(props) =>
    props.selected === true ? props.theme.primary.color : "#000"};
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
`;

export const Subtitle = styled.h3`
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
  border-bottom: ${(props) => props.theme.primary.border};
  padding: ${(props) => props.theme.tiny.gutterSize} 0;

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    font-size: ${(props) => props.theme.tiny.height};
    padding: ${(props) => props.theme.small.gutterSize};
  }
`;

export const P = styled.p`
  font-family: ${(props) => props.theme.primary.font};
  font-weight: ${(props) => props.theme.primary.fontSize};
`;

// ### SMALL COMPONENT BLOCKS ###

export const FlexBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: ${(props) => (props.sticky === true ? "sticky" : "")};
  top: ${(props) =>
    props.sticky === true ? props.theme.small.gutterSize : ""};

  @media (max-width: ${(props) => props.theme.websiteWidth}) {
    text-align: center;
    margin: 0 auto;
    display: block;
  }
`;
