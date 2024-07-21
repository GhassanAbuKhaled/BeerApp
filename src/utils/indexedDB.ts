import { openDB } from 'idb';

const dbName = 'reviewDataDB';
const storeName = 'reviewEntries';
const beerStoreName = 'beerTypes';

// Open database and upgrade if necessary
const openDatabase = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(beerStoreName)) {
        db.createObjectStore(beerStoreName, { keyPath: 'id' });
      }
    },
  });
};
/**
 * Saves beer types to IndexedDB.
 * @param beers BeersResponse The beer types to be saved.
 */
export const saveBeerTypesToIndexedDB = async (data: BeersResponse) => {
  const db = await openDatabase();
  const transaction = db.transaction(beerStoreName, 'readwrite');
  const store = transaction.objectStore(beerStoreName);

  await store.clear(); // Clear existing data

  await store.put({ id: 'beerTypes', beers: data.beers });
  await transaction.done;
};
/**
 * Retrieves all beer types from IndexedDB.
 * @returns Promise<BeersResponse> Promise resolving to an array of beer types.
 */
export const getBeerTypesFromIndexedDB = async (): Promise<BeersResponse> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(beerStoreName, 'readonly');
    const store = transaction.objectStore(beerStoreName);

    // Retrieve the object with id 'beerTypes'
    const result = await store.get('beerTypes');    

    if (result) {
      return { beers: result.beers };
    } else {
      return { beers: [] }; // Handle the case where the object is not found
    }
  } catch (error) {
    console.error('Failed to retrieve beer types from IndexedDB', error);
    throw error;
  }
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
