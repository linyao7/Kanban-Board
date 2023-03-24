import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { capitalize } from '../utils/capitalize';
import { DeleteOutlined, FolderOpenOutlined, EyeOutlined } from '@ant-design/icons';
import { delItem, updateItem } from '../indexDB/dbHelpers';
import useCard from '../hooks/useCard';
import { ICard } from '../typings';

interface IProps {
  cardId: number;
  onDelete: (cardId: any) => void;
}

const MiniCard = ({ cardId, onDelete }: IProps) => {
  const navigate = useNavigate();
  const card = useCard(cardId);

  const handleDelCard = (e: any) => {
    //prevent activating click event on parent
    e.stopPropagation();
    delItem('cardStore', cardId);
    onDelete(cardId);
  };

  const handleCardClick = () => {
    navigate(`/card/${cardId}`);
  };

  const handleCardArchiving = (e: any, shouldArchive: boolean) => {
    e.stopPropagation();
    const latestCard: ICard = {
      cardId: card.cardId,
      name: card.name,
      description: card.description,
      status: card.status,
      assignee: card.assignee,
      protected: card.protected,
      createdDate: card.createdDate,
      author: card.author,
      archived: shouldArchive,
    };
    updateItem('cardStore', card.cardId, latestCard);
  };

  return (
    <>
      {card && ( //card should be ready before rendering all features
        <MiniCardWrapper isCardArchived={card.archived} onClick={handleCardClick}>
          <TitleRow>
            <div>{capitalize(card.name)}</div>
            <CardOptions>
              {card.archived ? (
                <EyeOutlined onClick={(e) => handleCardArchiving(e, false)} />
              ) : (
                <FolderOpenOutlined onClick={(e) => handleCardArchiving(e, true)} />
              )}
              <DeleteOutlined onClick={handleDelCard} />
            </CardOptions>
          </TitleRow>
          <DescriptionStyle>{card.description}</DescriptionStyle>
        </MiniCardWrapper>
      )}
    </>
  );
};

export default MiniCard;

const MiniCardWrapper = styled.div<{ isCardArchived: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 12px;
  background: var(--theme-card-background);
  border-radius: 8px;
  opacity: ${(props) => (props.isCardArchived ? '0.5' : '1')};

  &:hover {
    cursor: pointer;
  }
`;

const DescriptionStyle = styled.div`
  color: var(--text-secondary);
  font-size: var(--smaller-font);
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardOptions = styled.div`
  display: flex;
  gap: 8px;
`;
