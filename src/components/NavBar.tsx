import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <NavBarWrapper>
      <HomeButton onClick={() => navigate('/')}>Kanban Board</HomeButton>
    </NavBarWrapper>
  );
};

export default NavBar;

const NavBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 10vh;
  padding: 16px 40px;
  background: var(--theme-background-secondary);
`;

const HomeButton = styled.div`
  font-weight: var(--font-accent);

  &:hover {
    cursor: pointer;
  }
`;
