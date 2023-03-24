import type { SelectProps } from 'antd';

export const statuses = ['To Do', 'In Progress', 'Done'];
const users = ['Jonathan', 'Alan', 'Vanessa', 'Mavis'];

//options data structure for antd <Select />
export const statusOptions: SelectProps['options'] = statuses.map((status) => {
  return { label: status, value: status };
});
export const assigneeOptions: SelectProps['options'] = users.map((user) => {
  return { label: user, value: user };
});

export const CreateBoardMsg = 'Successfully added a board!';
export const CreateColumnMsg = 'Successfully added a column!';
export const CreateCardMsg = 'Successfully added a card!';
export const DelNonEmptyColumn =
  'You cannot delete a column with cards. Please try deleting all cards first.';
