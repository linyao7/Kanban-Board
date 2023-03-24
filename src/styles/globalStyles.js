import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
    :root {
        --theme-background-primary: #e8d8c3;
        --theme-background-secondary: #cbad8d;
        --theme-background-tertiary: #8d9ca4;
        --theme-board-background: #6b7d89;
        --theme-board-dashed-lines: #6b7d89;
        --theme-column-background: #cbad8d;
        --theme-column-modal: #6b7d89;
        --theme-card-background: #657681;
        --text-primary: white;
        --text-secondary:#E3E3E3;
        --text-contrast: #6b7d89;


        --font-accent: 600;

        --larger-font: 18px;
        --smaller-font: 14px;
    }
    
    * {
        font-family: Montserrat, sans-serif;
    }

    body {
        background: var(--theme-background-primary);
        color: var(--text-primary);
        margin: 0;
        padding: 0;
    }
    input {
        font-family: Montserrat, sans-serif;
        font-size: 16px;
    }
    * {
        box-sizing: border-box;
    }

//antd css selectors
    .ant-select-selector {
        background: transparent !important;
        border-color: var(--theme-background-primary) !important;
        color: var(--text-primary) !important;
    } 

    .ant-select-arrow {
        color: var(--theme-background-primary) !important;
    }

    .ant-select-dropdown {
        background: var(--theme-board-background) !important;
    }

    //react-toastify css selectors
    .Toastify__toast {
        background: var(--theme-board-background);
        color: var(--text-primary);
        border-radius: 12px;
    }
    .Toastify__progress-bar {
        background: none;
    }
`;

export default GlobalStyle;
