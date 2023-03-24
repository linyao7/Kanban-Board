import { useDispatch } from 'react-redux';
import { getAllBoards, getAllColumns, getAllCards, getItems } from '../indexDB/dbHelpers';
import { setBoards, setBoardsMapping, setCards, setColumnsMapping } from '../store/dataSlice';
import { IBoard, IColumn, ICard, BoardToColMapping, ColToCardMapping } from '../typings';
import { useLiveQuery } from 'dexie-react-hooks';

const useFetchData = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    const boards = await getBoards();
    dispatch(setBoards(boards));
    getBoardsMapping(boards);

    const columns = await getColumns();
    getColumnsMapping(columns);

    const cards = await getCards();
    dispatch(setCards(cards));
  };

  const getBoards = async () => {
    return getAllBoards() as Promise<IBoard[]>;
  };

  const getColumns = async () => {
    return getAllColumns() as Promise<IColumn[]>;
  };

  const getCards = async () => {
    return getAllCards() as Promise<ICard[]>;
  };

  const getBoardsMapping = async (boards: IBoard[]) => {
    const boardsMapping: BoardToColMapping = {};
    for (const board of boards) {
      const columns = (await getItems('columnStore', board.columnIds)) as IColumn[];
      boardsMapping[board.boardId] = columns.filter((column) => column !== undefined);
    }
    dispatch(setBoardsMapping(boardsMapping));
  };

  //TODO refactor this to reuse logic from above
  const getColumnsMapping = async (columns: IColumn[]) => {
    const columnsMapping: ColToCardMapping = {};
    for (const column of columns) {
      const cards = (await getItems('cardStore', column.cardIds)) as ICard[];
      columnsMapping[column.columnId] = cards.filter((card) => card !== undefined);
    }
    dispatch(setColumnsMapping(columnsMapping));
  };

  //populate data on app start
  useLiveQuery(() => fetchData());
  //   useEffect(() => {
  //     fetchData();
  //   }, []);
};

export default useFetchData;
