import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import MiniCard from './MiniCard';
import Modal from './Modal';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import CreateCardForm from './CreateCardForm';
import { updateItem, delItem } from '../indexDB/dbHelpers';
import { ICard, IColumn } from '../typings';
import {
  selectAllowColumnDrag,
  selectColumnsMapping,
  selectShowArchived,
} from '../store/selectors';
import { DelNonEmptyColumn } from '../consts';
import { notify } from '../utils/notify';

type IProps = IColumn & { onDelete: (columnId: any) => void };

const Column = (props: IProps) => {
  const allowColumnDrag = useSelector(selectAllowColumnDrag);
  const [columnName, setColumnName] = useState(props.name);
  const [editingColName, setEditingColName] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //state is used to render cards here for a quicker reload after dragging
  const [cards, setCards] = useState<ICard[]>();
  const columnsMapping = useSelector(selectColumnsMapping);
  const showArchived = useSelector(selectShowArchived);

  useEffect(() => {
    if (columnsMapping) {
      setCards(columnsMapping[props.columnId]);
    }
  }, [columnsMapping, props.columnId]);

  const handleDelColumn = () => {
    //only allow deleting column when empty
    if (props.cardIds.length === 0) {
      delItem('columnStore', props.columnId);
      props.onDelete(props.columnId);
    } else {
      notify(DelNonEmptyColumn);
    }
  };

  const handleEditColumnName = (e: any) => {
    console.log('input: ', e.target.value);
    setColumnName(e.target.value);
  };

  const saveColumnName = () => {
    updateItem('columnStore', props.columnId, {
      columnId: props.columnId,
      name: columnName,
      cardIds: props.cardIds,
    });
    setEditingColName(false);
  };

  const handleInputKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      saveColumnName();
    }
  };

  const renderMiniCards = () => {
    if (columnsMapping && Object.keys(columnsMapping).length > 0) {
      return (
        <>
          {cards &&
            cards.length > 0 &&
            cards.map((miniCard: ICard, index) => {
              if (!showArchived && miniCard.archived) return;
              return (
                <Draggable
                  key={miniCard.cardId}
                  draggableId={miniCard.cardId.toString()}
                  index={index}
                  //when dragging columns, card dragging is disabled
                  isDragDisabled={allowColumnDrag}
                >
                  {(provided) => (
                    //div is purely used to add props required for <Draggable/>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={miniCard.cardId}
                    >
                      <MiniCard cardId={miniCard.cardId} onDelete={onDelCardId} />
                    </div>
                  )}
                </Draggable>
              );
            })}

          {cards && cards.length === 0 && (
            <AddCardTile onClick={() => setShowModal(true)}>Add Card</AddCardTile>
          )}
        </>
      );
    }
  };

  const onAddCardId = (cardId: any) => {
    const newCardIds = [...props.cardIds, cardId];
    updateItem('columnStore', props.columnId, {
      columnId: props.columnId,
      name: props.name,
      cardIds: newCardIds,
    });
  };

  const onDelCardId = (cardId: any) => {
    const delIndex = props.cardIds.indexOf(cardId);
    const newCardsIds = [...props.cardIds];
    newCardsIds.splice(delIndex, 1);
    updateItem('columnStore', props.columnId, {
      columnId: props.columnId,
      name: props.name,
      cardIds: newCardsIds,
    });
  };

  const handleOnDragEnd = (draggedItem: any) => {
    if (!draggedItem.destination) return;
    const newCards = [...cards];
    const [reorderedCard] = newCards.splice(draggedItem.source.index, 1);
    newCards.splice(draggedItem.destination.index, 0, reorderedCard);

    setCards(newCards);
    updateItem('columnStore', props.columnId, {
      columnId: props.columnId,
      name: props.name,
      cardIds: newCards.map((card) => card.cardId),
    });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="cardsList">
        {(provided) => (
          <ColumnWrapper {...provided.droppableProps} ref={provided.innerRef}>
            <FirstRow>
              <ColumnNameSection>
                {/* //TODO restrict number of chars name can have */}
                {editingColName ? (
                  <EditInput
                    type="text"
                    spellCheck={false}
                    onChange={handleEditColumnName}
                    onKeyPress={(e) => handleInputKeyPress(e)}
                    value={columnName}
                  />
                ) : (
                  props.name
                )}
                {editingColName ? (
                  <>
                    <CloseOutlined onClick={() => setEditingColName(false)} />
                    <CheckOutlined onClick={saveColumnName} />
                  </>
                ) : (
                  <EditOutlined onClick={() => setEditingColName(true)} />
                )}
              </ColumnNameSection>
              <ActionIcons>
                <PlusOutlined onClick={() => setShowModal(true)} />
                {/* //TODO prompt user for confirmation */}
                <DeleteOutlined onClick={handleDelColumn} />
              </ActionIcons>
            </FirstRow>
            {renderMiniCards()}
            {showModal && (
              <Modal showModal={showModal} onClose={() => setShowModal(false)}>
                <CreateCardForm
                  updateParentColumn={onAddCardId}
                  onSubmit={() => {
                    setShowModal(false);
                  }}
                />
              </Modal>
            )}
            {provided.placeholder}
          </ColumnWrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Column;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

const ColumnNameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: var(--font-accent);
`;

const ActionIcons = styled.div`
  display: flex;
  gap: 8px;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  min-width: 20vw;
  max-width: 25vw;
  min-height: 70vh;
  background: var(--theme-column-background);
  border-radius: 16px;

  //using this instead of gap in flexbox for react-beautiful-dnd to work properly
  > * {
    margin-top: 4px;
    margin-bottom: 4px;
  }
`;

const AddCardTile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed var(--theme-board-dashed-lines);
  border-radius: 16px;
  height: 150px;

  &:hover {
    cursor: pointer;
  }
`;

const EditInput = styled.input`
  background: transparent;
  width: 60%;
  border: 2px solid var(--theme-background-primary);
  caret-color: var(--theme-background-primary);
  border-radius: 8px;
  padding: 8px 8px;
  color: var(--text-primary);

  &:focus {
    outline: none;
    border: 2px solid var(--theme-background-primary);
  }
`;
