import Dexie, { Table } from 'dexie';
import { IBoard, IColumn, ICard } from '../typings';

export type StoreName = 'boardStore' | 'columnStore' | 'cardStore';

export class MyAppDatabase extends Dexie {
  boardStore!: Table<IBoard>;
  columnStore!: Table<IColumn>;
  cardStore!: Table<ICard>;

  constructor() {
    super('MyAppDatabase');

    this.version(1).stores({
      boardStore: '++boardId, name, columnIds',
      columnStore: '++columnId, name, cardIds',
      cardStore:
        '++cardId, name, author, description, comments, assignee, createdDate, status, protected',
    });
  }
}

export const db = new MyAppDatabase();
