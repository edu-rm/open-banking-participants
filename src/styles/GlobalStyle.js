import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus {
    /* input ou botao, que no chrome ele deixa azul por volta */
    outline: 0;
  }
  html, body, #root{
    height: 100%;
  }
  body {
    /* fontes mais definidas */
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-family: 'Open Sans', sans-serif;
  }
  a {
    text-decoration: none;
  }
  ul{
    list-style: none;
  }
  button {
    cursor: pointer;
  }
`;