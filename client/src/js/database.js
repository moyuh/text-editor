import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

try {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const req = store.put({
    id: 1,
    value: content
  });
  const res = await req;
  console.log(`Data saved to jateDB ${res}`)
} catch (error) {
  console.log(error)
}
}
// gets all the content from the database
export const getDb = async () => {

try{
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const req = store.getAll();
  const res = await req;
  return res.content
} catch (error){
  console.log(error);
}
};

initdb();
