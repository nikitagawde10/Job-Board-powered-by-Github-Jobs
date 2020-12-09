import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body & .JobData-Master{                               //body and nested class JobData-Master
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};    
    transition: all 0.25s linear;
  }
  body & {                                              //body and nested span class
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};    
    transition: all 0.25s linear;
  }
  .JobField
        background: ${({theme}) => theme.secondary};
        color: ${({ theme }) => theme.text};  
  `
