import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    font-family: "Montserrat, sans-serif";  
    ::-webkit-scrollbar {
      display: none;
    }
  }

  p {
    font-family: "Montserrat, sans-serif";
    font-weight: 500
  }

  h2 {
    text-align: right;
    font-family: "Montserrat, sans-serif";
    font-weight: 800
  }

  h3 {
    font-family: "Montserrat, sans-serif";
    font-weight: 800
  }

  button {
    font-family: "Montserrat, sans-serif";
    font-weight: 800
  }

  a {
    font-family: "Montserrat, sans-serif";
    font-weight: 800
  }
`;

export default globalStyle;
