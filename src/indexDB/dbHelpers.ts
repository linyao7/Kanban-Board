import { db, StoreName } from './initializeDB';

export const getAllBoards = async () => {
  try {
    return db['boardStore'].toArray();
  } catch (e) {
    console.error(e);
  }
};

export const getAllColumns = async () => {
  try {
    return db['columnStore'].toArray();
  } catch (e) {
    console.error(e);
  }
};

export const getAllCards = async () => {
  try {
    return db['cardStore'].toArray();
  } catch (e) {
    console.error(e);
  }
};

export const addItem = async (storeName: StoreName, item: any) => {
  try {
    return db[storeName].add(item);
  } catch (e) {
    console.error(e);
  }
};

export const delItem = async (storeName: StoreName, itemKey: any) => {
  try {
    return db[storeName].delete(itemKey);
  } catch (e) {
    console.error(e);
  }
};

export const getItems = async (storeName: StoreName, values: any[]) => {
  try {
    return db[storeName].bulkGet(values);
  } catch (e) {
    console.error(e);
  }
};

export const updateItem = async (storeName: StoreName, itemKey: any, item: any) => {
  try {
    db[storeName].put(item, itemKey);
  } catch (e) {
    console.error(e);
  }
};
