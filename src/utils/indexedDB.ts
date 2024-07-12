import { openDB } from 'idb';

const dbName = 'reviewDataDB';
const storeName = 'reviewEntries';

// Open database and upgrade if necessary
const openDatabase = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};
/**
 * Saves form data to IndexedDB.
 * @param formData ReviewData The data to be saved.
 */
export const saveFormData = async (formData: ReviewData): Promise<void> => {
  const db = await openDatabase();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  await store.add(formData);
  await transaction.done;
};

/**
 * Retrieves all saved form entries from IndexedDB.
 * @returns Promise<{ key: IDBValidKey, data: ReviewData }[]> Promise resolving to an array of form entries.
 */
export const getAllFormEntries = async (): Promise<{ key: IDBValidKey, data: ReviewData }[]> => {
  const db = await openDatabase();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  
  const formDataArray: { key: IDBValidKey, data: ReviewData }[] = [];
  let cursor = await store.openCursor();

  while (cursor) {
    formDataArray.push({ key: cursor.primaryKey, data: cursor.value });
    cursor = await cursor.continue();
  }
  return formDataArray;
};

/**
 * Deletes a specific form entry from IndexedDB.
 * @param key IDBValidKey The key of the entry to delete.
 */
export const deleteFormEntry = async (key: IDBValidKey): Promise<void> => {
  const db = await openDatabase();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  await store.delete(key);
  await transaction.done;
};
