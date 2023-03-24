import React from 'react';
import styled from 'styled-components';

import { Select } from 'antd';

//TODO refine this, cant use in <Card />
const CustomSelect = (props: any) => {
  const { label, size, defaultValue, onChange, options, ...restProps } = props;
  return (
    <SelectWrapper id="selectWrapper">
      {label}
      <Select
        size={size}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        //renders node in wrapper. This helps model click outside to work properly
        getPopupContainer={() => document.getElementById('selectWrapper')}
        {...restProps}
      />
    </SelectWrapper>
  );
};

export default CustomSelect;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
