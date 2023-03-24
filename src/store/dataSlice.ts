import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IBoard, ICard, BoardToColMapping, ColToCardMapping } from '../typings';

interface DataState {
  boards: IBoard[];
  boardsMapping: BoardToColMapping;
  columnsMapping: ColToCardMapping;
  cards: ICard[];
}

const initialState: DataState = {
  boards: undefined,
  boardsMapping: undefined,
  columnsMapping: undefined,
  cards: undefined,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload;
    },
    setBoardsMapping: (state, action: PayloadAction<BoardToColMapping>) => {
      state.boardsMapping = action.payload;
    },
    setColumnsMapping: (state, action: PayloadAction<ColToCardMapping>) => {
      state.columnsMapping = action.payload;
    },
    setCards: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload;
    },
  },
});

export const { setBoards, setBoardsMapping, setColumnsMapping, setCards } = dataSlice.actions;
export default dataSlice.reducer;
