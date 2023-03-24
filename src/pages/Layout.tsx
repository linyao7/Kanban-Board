import React, { ReactNode } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <>
      <NavBar />
      <AppWrapper>{children}</AppWrapper>
    </>
  );
};

export default Layout;

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;
