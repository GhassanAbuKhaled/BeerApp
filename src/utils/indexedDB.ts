// src/utils/indexedDB.ts

interface FormEntry {
    id: number;
    name: string;
    email: string;
    timestamp: number;
}

const dbName = 'reviewDataDB';
const storeName = 'reviewEntries';

// Open database and upgrade if necessary
const openDatabase = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject(request.error);
    };

    request.onsuccess = () => {
        resolve(request.result);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = request.result;
        if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        }
    };
    });
};

// Save form data to IndexedDB
export const saveFormData = async (formData: FormEntry): Promise<void> => {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    store.add(formData);
};

// Get all saved form entries from IndexedDB
export const getAllFormEntries = async (): Promise<FormEntry[]> => {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    return new Promise<FormEntry[]>((resolve, reject) => {
    request.onerror = () => {
        console.error('Error fetching form entries:', request.error);
        reject(request.error);
    };
    request.onsuccess = () => {
        resolve(request.result);
    };
    });
};

// Clear all form entries from IndexedDB
export const clearAllFormEntries = async (): Promise<void> => {
    const db = await openDatabase();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    store.clear();
};
