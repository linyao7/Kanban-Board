import React, { useState } from 'react';
import styled from 'styled-components';
import { addItem } from '../indexDB/dbHelpers';
import InputField from './InputField';
import CustomSelect from './CustomSelect';
import { statuses, statusOptions, assigneeOptions, CreateCardMsg } from '../consts';
import { Switch, Button } from 'antd';
import { ICard } from '../typings';
import { CustomTextArea } from '../styles/commonSyles';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../utils/notify';

interface IProps {
  updateParentColumn: (cardId: any) => void;
  onSubmit: () => void;
}

const CreateCardForm = ({ updateParentColumn, onSubmit }: IProps) => {
  //name, descript, assignee, status, protected
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState();
  const [status, setStatus] = useState<ICard['status']>('To Do');
  const [isProtected, setIsProtected] = useState(false);

  // const notify = () => toast(CreateCardMsg);

  const handleCreateCard = async () => {
    //TODO do something to make author useful
    const mockAuthor = 'Mock Author';
    const cardToAdd: ICard = {
      name: name,
      description: description,
      assignee: assignee,
      status: status,
      protected: isProtected,
      author: mockAuthor,
      //for redux serialization, use Date(date) to reverse
      createdDate: new Date().toISOString(),
      archived: false,
    };
    const cardId = await addItem('cardStore', cardToAdd);
    updateParentColumn(cardId);

    console.log('before notify');
    notify(CreateCardMsg);
    onSubmit();
  };

  const handleFieldChange = (e: any, setValueFn: React.Dispatch<any>) => {
    setValueFn(e.target.value);
  };

  const handleSelectChange = (value: any, setSelectFn: React.Dispatch<any>) => {
    setSelectFn(value);
  };

  return (
    <CardForm>
      <FirstRow>
        <InputField
          label="Name"
          style={InputWidth}
          type="text"
          onChange={(e: any) => handleFieldChange(e, setName)}
        />
        <ProtectedSection>
          Protected
          <Switch size={'default'} onChange={() => setIsProtected(!isProtected)} />
        </ProtectedSection>
      </FirstRow>
      <DescriptionRow>
        Description
        <CustomTextArea rows={4} cols={50} onChange={(e) => handleFieldChange(e, setDescription)} />
      </DescriptionRow>
      <LastRow>
        <CustomSelect
          label={'Assignee'}
          size={'small'}
          placeholder={'Select a user'}
          onChange={(e: any) => handleSelectChange(e, setAssignee)}
          options={assigneeOptions}
          style={{ width: '150px' }}
        />
        <CustomSelect
          label={'Status'}
          size={'small'}
          defaultValue={statuses[0]}
          onChange={(e: any) => handleSelectChange(e, setStatus)}
          options={statusOptions}
          style={{ width: '150px' }}
        />
      </LastRow>
      <Button type={'primary'} onClick={handleCreateCard}>
        Submit
      </Button>
    </CardForm>
  );
};

export default CreateCardForm;

const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
`;

const FirstRow = styled.div`
  display: flex;
  gap: 40px;
`;

const ProtectedSection = styled.div`
  display: flex;
  gap: 12px;
`;

const DescriptionRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LastRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputWidth = { width: '150px' };
