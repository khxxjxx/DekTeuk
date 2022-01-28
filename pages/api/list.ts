import { app } from '@firebase/firebase';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';

const db = getFirestore(app);

export const getPost = async () => {
  try {
    const datas: Post[] = [];
    const query = await getDocs(collection(db, 'freeBoard'));
    query.forEach((doc) => {
      const { id, title, content, author, timestamp } = doc.data();
      datas.push({
        id,
        title,
        content,
        author,
        timestamp,
      });
    });
    return datas;
  } catch (e: any) {
    console.error(e.message);
  }
};

export const addPost = async (post: Post) => {
  try {
    await addDoc(collection(db, 'freeBoard'), post);
  } catch (e: any) {
    console.error(e.message);
  }
};
