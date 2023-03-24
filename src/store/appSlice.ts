import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  currentBoardId: number;
  allowColumnDrag: boolean;
  showArchived: boolean;
}

const initialState: AppState = {
  currentBoardId: undefined,
  allowColumnDrag: false,
  showArchived: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentBoardId: (state, action: PayloadAction<number>) => {
      state.currentBoardId = action.payload;
    },
    setAllowColumnDrag: (state, action: PayloadAction<boolean>) => {
      state.allowColumnDrag = action.payload;
    },
    setShowArchived: (state, action: PayloadAction<boolean>) => {
      state.showArchived = action.payload;
    },
  },
});

export const { setCurrentBoardId, setAllowColumnDrag, setShowArchived } = appSlice.actions;
export default appSlice.reducer;
