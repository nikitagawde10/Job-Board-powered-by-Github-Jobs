import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body & .JobData-Master{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};    
    transition: all 0.25s linear;
  }
  body & {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};    
    transition: all 0.25s linear;
  }
  .JobField
        background: ${({theme}) => theme.secondary};
        color: ${({ theme }) => theme.text};  
  `
