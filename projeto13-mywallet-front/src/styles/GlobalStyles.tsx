import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';

export default createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        text-decoration: none;
        color: #FFFFFF;
        font-family: 'Raleway';
    }
    htlm, body, #root {
        height: 100vh;
        width: 100vw;
    }
    #root {
        padding: 0 25px;
    }
    body {
        background-color: #8C11BE;
    }
`;


