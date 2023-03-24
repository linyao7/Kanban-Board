import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <h1>Invalid URL</h1>
    </NotFoundWrapper>
  );
};

export default NotFound;

const NotFoundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
