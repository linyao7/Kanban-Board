import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBoards } from '../store/selectors';
import Modal from '../components/Modal';
import CreateBoardForm from '../components/CreateBoardForm';

const Home = () => {
  const navigate = useNavigate();
  const boards = useSelector(selectBoards);

  const [showModal, setShowModal] = useState(false);

  const handleBoardClick = (boardId: number) => {
    navigate(`/board/${boardId}`);
  };

  const renderBoards = () => {
    if (boards && boards.length > 0) {
      return (
        <BoardList>
          {boards.map((board) => (
            <BoardTile key={board.boardId} onClick={() => handleBoardClick(board.boardId)}>
              {board.name}
            </BoardTile>
          ))}
          <AddBoard onClick={() => setShowModal(true)}>{AddBoardText}</AddBoard>
        </BoardList>
      );
    } else {
      return <AddBoard onClick={() => setShowModal(true)}>{AddBoardText}</AddBoard>;
    }
  };

  return (
    <>
      {renderBoards()}
      {showModal && (
        <Modal showModal={showModal} onClose={() => setShowModal(false)}>
          <CreateBoardForm onSubmit={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default Home;

const BoardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw;

  gap: 12px;
`;

const BoardDimension = 300;
const BoardTile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${BoardDimension}px;
  height: ${BoardDimension}px;
  background: var(--theme-board-background);
  border-radius: 16px;
  font-weight: var(--font-accent);

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const AddBoardText = 'Add a Board +';
const AddBoard = styled(BoardTile)`
  background: transparent;
  border: 2px dashed var(--theme-board-dashed-lines);
  color: var(--text-contrast);
`;
