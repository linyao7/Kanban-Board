export interface IBoard {
  boardId?: number;
  name: string;
  columnIds: number[];
}

export interface IColumn {
  columnId?: number;
  name: string;
  cardIds: number[];
}

export interface ICard {
  cardId?: number;
  name: string;
  author: string;
  description: string | undefined;
  assignee: string; //need to use Users [] in future
  createdDate: string;
  status: 'To Do' | 'In Progress' | 'Done';
  protected: boolean;
  archived: boolean; //always initialize to false
}

// eg {1: [{col1, col2, col5}]} means boardId 1 contains columns 1,2,5
export interface BoardToColMapping {
  [key: number]: IColumn[];
}

export interface ColToCardMapping {
  [key: number]: ICard[];
}
