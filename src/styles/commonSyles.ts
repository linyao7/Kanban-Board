import React from 'react'; //required for styled components to work
import styled from 'styled-components';

export const CustomInput = styled.input`
  background: transparent;
  border: 2px solid var(--theme-background-primary);
  caret-color: var(--theme-background-primary);
  border-radius: 8px;
  padding: 8px;
  color: var(--text-primary);

  &:focus {
    outline: none;
    border: 2px solid var(--theme-background-primary);
  }
`;

export const CustomTextArea = styled.textarea`
  background: transparent;
  border: 2px solid var(--theme-background-primary);
  caret-color: var(--theme-background-primary);
  color: var(--text-primary);
  border-radius: 8px;
  padding: 8px;

  &:focus {
    outline: none;
  }
`;
