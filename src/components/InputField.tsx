import React from 'react';
import styled from 'styled-components';
import { CustomInput } from '../styles/commonSyles';

const InputField = (props: any) => {
  const { label, type, placeholder, onChange, ...restProps } = props;
  return (
    <InputWrapper>
      {label}
      <CustomInput type={type} placeholder={placeholder} onChange={onChange} {...restProps} />
    </InputWrapper>
  );
};

export default InputField;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
