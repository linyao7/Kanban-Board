import { RootState } from '.';

//app selectors
export const selectCurrentBoardId = (state: RootState) => state.app.currentBoardId;
export const selectAllowColumnDrag = (state: RootState) => state.app.allowColumnDrag;
export const selectShowArchived = (state: RootState) => state.app.showArchived;

//data selectors
export const selectBoards = (state: RootState) => state.data.boards;
export const selectBoardsMapping = (state: RootState) => state.data.boardsMapping;
export const selectColumnsMapping = (state: RootState) => state.data.columnsMapping;
export const selectCards = (state: RootState) => state.data.cards;
