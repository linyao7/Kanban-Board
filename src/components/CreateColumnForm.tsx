import React, { useState } from 'react';
import styled from 'styled-components';
import { addItem } from '../indexDB/dbHelpers';
import { Button } from 'antd';
import { CustomInput } from '../styles/commonSyles';
import { notify } from '../utils/notify';
import { CreateColumnMsg } from '../consts';

interface IProps {
  updateParentBoard: (columnId: any) => void;
  onSubmit: () => void;
}

const CreateColumnForm = ({ updateParentBoard, onSubmit }: IProps) => {
  const [columnName, setColumnName] = useState(undefined);

  const handleCreateColumn = async () => {
    const columnId = await addItem('columnStore', { name: columnName, cardIds: [] });
    updateParentBoard(columnId);

    notify(CreateColumnMsg);
    onSubmit();
  };

  const handleNameChange = (e: any) => {
    setColumnName(e.target.value);
  };

  return (
    <ColumnForm>
      Enter a Column Name
      <CustomInput type="text" onChange={handleNameChange} />
      <Button type={'primary'} onClick={handleCreateColumn}>
        Submit
      </Button>
    </ColumnForm>
  );
};

export default CreateColumnForm;

const ColumnForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 400px;
  height: 100px;
`;
