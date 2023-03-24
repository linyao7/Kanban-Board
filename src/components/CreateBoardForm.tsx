import React, { useState } from 'react';
import styled from 'styled-components';
import { addItem } from '../indexDB/dbHelpers';
import { Button } from 'antd';
import { CustomInput } from '../styles/commonSyles';
import { notify } from '../utils/notify';
import { CreateBoardMsg } from '../consts';

interface IProps {
  onSubmit: () => void;
}

const CreateBoardForm = ({ onSubmit }: IProps) => {
  const [boardName, setBoardName] = useState(undefined);

  const handleCreateBoard = async () => {
    const boardId = await addItem('boardStore', { name: boardName, columnIds: [] });

    notify(CreateBoardMsg);
    onSubmit();
  };

  const handleNameChange = (e: any) => {
    setBoardName(e.target.value);
  };

  return (
    <BoardForm>
      Enter a Board Name
      <CustomInput type="text" onChange={handleNameChange} />
      <Button type={'primary'} onClick={handleCreateBoard}>
        Submit
      </Button>
    </BoardForm>
  );
};

export default CreateBoardForm;

const BoardForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 400px;
  height: 100px;
`;
