import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  children: ReactNode;
  shouldShake: boolean;
}

const ShakeContainer = ({ children, shouldShake }: IProps) => {
  return <ShakeWrapper shouldShake={shouldShake}>{children}</ShakeWrapper>;
};

export default ShakeContainer;

const ShakeWrapper = styled.div<{
  shouldShake: boolean;
}>`
  animation: shake 0.2s;
  animation-iteration-count: ${(props) => (props['shouldShake'] ? 'infinite' : 0)};
  @keyframes shake {
    0% {
      transform: rotate(-0.2deg);
    }
    100% {
      transform: rotate(0.2deg);
    }
  }
`;
