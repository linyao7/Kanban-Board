import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { updateItem } from '../indexDB/dbHelpers';
import { ICard } from '../typings';
import { Select } from 'antd';
import { assigneeOptions, statusOptions } from '../consts';
import useCard from '../hooks/useCard';
import { CustomInput, CustomTextArea } from '../styles/commonSyles';

const Card = () => {
  //input value states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ICard['status']>();
  const [assignee, setAssignee] = useState('');
  const [isProtected, setIsProtected] = useState<boolean>();

  //open and close input states
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);

  //getting the card to be used here
  const { cardId } = useParams();
  const card = useCard(parseInt(cardId));

  //initialize input value states
  useEffect(() => {
    if (card) {
      setName(card.name);
      setDescription(card.description);
      setStatus(card.status);
      setAssignee(card.assignee);
      setIsProtected(card.protected);
    }
  }, [card]);

  const handleFieldChange = (e: any, setValueFn: React.Dispatch<any>) => {
    setValueFn(e.target.value);
  };

  const handleCancelField = (
    value: any,
    setValueFn: React.Dispatch<any>,
    setEditingFn: React.Dispatch<any>
  ) => {
    setValueFn(value);
    setEditingFn(false);
  };

  const handleSaveField = (setEditingFn: React.Dispatch<any>) => {
    const latestCard: ICard = {
      cardId: card.cardId,
      name: name,
      description: description,
      status: status,
      assignee: assignee,
      protected: isProtected,
      //below two fields cannot be changed
      createdDate: card.createdDate,
      author: card.author,
      archived: card.archived,
    };
    updateItem('cardStore', card.cardId, latestCard);
    setEditingFn(false);
  };

  //TODO special case for switch toggling, better UI for this required
  const handleSwitchToggle = (switchValue: boolean) => {
    const latestCard: ICard = {
      cardId: card.cardId,
      name: name,
      description: description,
      status: status,
      assignee: assignee,
      protected: switchValue,
      //below two fields cannot be changed
      createdDate: card.createdDate,
      author: card.author,
      archived: card.archived,
    };
    updateItem('cardStore', card.cardId, latestCard);
  };

  const handleSelectChange = (
    selectType: 'status' | 'assignee',
    selectValue: any,
    setValueFn: React.Dispatch<any>,
    setEditingFn: React.Dispatch<any>
  ) => {
    console.log('selectValue: ', selectValue);
    setValueFn(selectValue);
    setEditingFn(false);

    const latestCard: ICard = {
      cardId: card.cardId,
      name: name,
      description: description,
      status: selectType === 'status' ? selectValue : status,
      assignee: selectType === 'assignee' ? selectValue : assignee,
      protected: isProtected,
      //below two fields cannot be changed
      createdDate: card.createdDate,
      author: card.author,
      archived: card.archived,
    };
    updateItem('cardStore', card.cardId, latestCard);
  };

  return (
    <CardWrapper>
      {card && (
        <>
          <FlexColumn widthPercentage={50}>
            <FlexRow>
              {isEditingName ? (
                <EditInput value={name} onChange={(e) => handleFieldChange(e, setName)} />
              ) : (
                <Name onClick={() => setIsEditingName(true)}>{card.name}</Name>
              )}
              {isEditingName && (
                <>
                  <CloseOutlined
                    onClick={() => handleCancelField(card.name, setName, setIsEditingName)}
                  />
                  <CheckOutlined onClick={() => handleSaveField(setIsEditingName)} />
                </>
              )}
            </FlexRow>
            <FlexRow>
              {isEditingDescription ? (
                <CustomTextArea onChange={(e) => handleFieldChange(e, setDescription)}>
                  {description}
                </CustomTextArea>
              ) : (
                <Description onClick={() => setIsEditingDescription(true)}>
                  {card.description ? card.description : 'Enter a description'}
                </Description>
              )}
              {isEditingDescription && (
                <>
                  <CloseOutlined
                    onClick={() =>
                      handleCancelField(card.description, setDescription, setIsEditingDescription)
                    }
                  />
                  <CheckOutlined onClick={() => handleSaveField(setIsEditingDescription)} />
                </>
              )}
            </FlexRow>
          </FlexColumn>
          <FlexColumn widthPercentage={40}>
            <FlexRow>
              <AttrLabel>Status</AttrLabel>
              {isEditingStatus ? (
                <Select
                  defaultValue={status}
                  onChange={(e) => handleSelectChange('status', e, setStatus, setIsEditingStatus)}
                  options={statusOptions}
                />
              ) : (
                <HoverClick onClick={() => setIsEditingStatus(true)}>
                  <AttrValue>{card.status}</AttrValue>
                </HoverClick>
              )}
            </FlexRow>
            <FlexRow>
              <AttrLabel>Assignee</AttrLabel>
              {isEditingAssignee ? (
                <Select
                  defaultValue={assignee}
                  onChange={(e) =>
                    handleSelectChange('assignee', e, setAssignee, setIsEditingAssignee)
                  }
                  options={assigneeOptions}
                />
              ) : (
                <HoverClick onClick={() => setIsEditingAssignee(true)}>
                  <AttrValue>{card.assignee}</AttrValue>
                </HoverClick>
              )}
            </FlexRow>
            <FlexRow>
              <HoverClick>
                <AttrLabel>Created</AttrLabel>
              </HoverClick>
              <AttrValue>{new Date(card.createdDate).toDateString()}</AttrValue>
            </FlexRow>
            <FlexRow>
              <AttrLabel>Author</AttrLabel>
              <AttrValue>{card.author}</AttrValue>
            </FlexRow>
            <FlexRow>
              <AttrLabel>Protected</AttrLabel>
              <Switch onChange={handleSwitchToggle} size={'default'} checked={card.protected} />
            </FlexRow>
          </FlexColumn>
        </>
      )}
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  display: flex;
  background: var(--theme-card-background);
  gap: 16px;
  width: 50vw;
  padding: 24px 32px;
  border-radius: 12px;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FlexColumn = styled.div<{ widthPercentage: number }>`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
  width: ${(props) => props.widthPercentage}%;
  height: 100%;
`;

const AttrLabel = styled.div`
  font-size: var(--smaller-font);
  width: 80px;
`;

const AttrValue = styled.div`
  font-weight: var(font-accent);
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: var(--font-accent);

  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.div`
  color: var(--text-secondary);
  font-size: var(--smaller-font);

  &:hover {
    cursor: pointer;
  }
`;

const EditInput = styled(CustomInput)`
  width: 100%;
`;

const HoverClick = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
