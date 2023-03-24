import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import Column from './Column';
import { PlusOutlined, BarsOutlined, FolderViewOutlined, FolderOutlined } from '@ant-design/icons';
import Modal from './Modal';
import CreateColumnForm from './CreateColumnForm';
import { updateItem } from '../indexDB/dbHelpers';
import { IColumn } from '../typings';
import {
  selectBoardsMapping,
  selectAllowColumnDrag,
  selectBoards,
  selectShowArchived,
} from '../store/selectors';
import { useDispatch } from 'react-redux';
import { setAllowColumnDrag, setShowArchived } from '../store/appSlice';
import ShakeContainer from './ShakeContainer';
import { Button } from 'antd';

const Board = () => {
  const dispatch = useDispatch();

  //state is used to render columns here for a quicker reload after dragging
  const [columns, setColumns] = useState<IColumn[]>();
  const [showModal, setShowModal] = useState(false);

  //getting the board to be used here
  const { boardId } = useParams();
  const boards = useSelector(selectBoards);
  const board = useMemo(() => {
    if (boards) {
      return boards.filter((board) => board.boardId === parseInt(boardId))[0];
    }
  }, [boards, boardId]);

  const boardsMapping = useSelector(selectBoardsMapping);
  const allowColumnDrag = useSelector(selectAllowColumnDrag);
  const showArchived = useSelector(selectShowArchived);

  //getting columns to be used here
  useEffect(() => {
    if (boardsMapping && board) {
      setColumns(boardsMapping[board.boardId]);
    }
  }, [boardsMapping, board]);

  const onAddColumnId = (columnId: any) => {
    const newColumnIds = [...board.columnIds, columnId];
    updateItem('boardStore', board.boardId, { ...board, columnIds: newColumnIds });
  };

  const onDelColumnId = (columnId: any) => {
    const delIndex = board.columnIds.indexOf(columnId);
    const newColumnIds = [...board.columnIds];
    newColumnIds.splice(delIndex, 1);
    updateItem('boardStore', board.boardId, { ...board, columnIds: newColumnIds });
  };

  const renderColumns = () => {
    if (boardsMapping && Object.keys(boardsMapping).length > 0) {
      return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="columnsList" direction="horizontal">
            {(provided) => (
              <ColumnList {...provided.droppableProps} ref={provided.innerRef}>
                {columns &&
                  columns.map((column: IColumn, index) => {
                    return (
                      <Draggable
                        key={column.columnId}
                        draggableId={column.columnId.toString()}
                        index={index}
                        isDragDisabled={!allowColumnDrag}
                      >
                        {(provided) => (
                          //div is purely used to add props required for <Draggable/>
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={column.columnId}
                          >
                            <ShakeContainer shouldShake={allowColumnDrag}>
                              <Column {...column} onDelete={onDelColumnId} />
                            </ShakeContainer>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </ColumnList>
            )}
          </Droppable>
        </DragDropContext>
      );
    } else {
      return <AddColumn onClick={() => setShowModal(true)}>Add a column</AddColumn>;
    }
  };

  const handleOnDragEnd = (draggedItem: any) => {
    if (!draggedItem.destination) return;
    const newColumns = [...columns];
    const [reorderedColumn] = newColumns.splice(draggedItem.source.index, 1);
    newColumns.splice(draggedItem.destination.index, 0, reorderedColumn);

    setColumns(newColumns);
    updateItem('boardStore', board.boardId, {
      boardId: board.boardId,
      name: board.name,
      columnIds: newColumns.map((column) => column.columnId),
    });
  };

  return (
    <BoardWrapper>
      {board && (
        <>
          <ColumnOptions>
            <Button type={'primary'} onClick={() => setShowModal(true)} icon={<PlusOutlined />}>
              New Column
            </Button>
            <Button
              type={'primary'}
              onClick={() => dispatch(setAllowColumnDrag(!allowColumnDrag))}
              icon={<BarsOutlined />}
            >
              {allowColumnDrag ? 'Lock Columns' : 'Order Columns'}
            </Button>
            <Button
              type={'primary'}
              onClick={() => dispatch(setShowArchived(!showArchived))}
              icon={showArchived ? <FolderOutlined /> : <FolderViewOutlined />}
            >
              {showArchived ? 'Hide Archived' : 'Show Archived'}
            </Button>
          </ColumnOptions>
          {columns?.length === 0 && (
            <AddColumnTile onClick={() => setShowModal(true)}>Add a Column</AddColumnTile>
          )}
          {renderColumns()}
          {showModal && (
            <Modal showModal={showModal} onClose={() => setShowModal(false)}>
              <CreateColumnForm
                updateParentBoard={onAddColumnId}
                onSubmit={() => setShowModal(false)}
              />
            </Modal>
          )}
        </>
      )}
    </BoardWrapper>
  );
};

export default Board;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 12px;
`;

const AddColumnTile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20vw;
  height: 70vh;
  border-radius: 16px;
  border: 2px dashed var(--theme-board-dashed-lines);
  color: var(--theme-board-dashed-lines);

  &:hover {
    cursor: pointer;
  }
`;

const AddColumn = styled.div`
  width: 150px;
  height: 600px;
  border: 2px dashed var(--theme-board-dashed-lines);
`;
const ColumnList = styled.div`
  display: flex;
  align-items: center;
  /* width: 100vw; */
  min-width: 90vw;
  /* max-width: 1440px; */
  height: 80vh;

  > * {
    margin-left: 40px;
  }
`;

const ColumnOptions = styled.div`
  display: flex;
  gap: 12px;
  margin-left: auto;

  top: 10px;
  right: 10px;
`;

const IconButton = styled.button`
  display: flex;
`;
