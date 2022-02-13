import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '@firebase/firebase';

export interface ChatDefault {
  nickname: string;
  id: string;
  jobSector: string;
}

export const createChatRoom = async (
  myInfo: ChatDefault,
  counterInfo: ChatDefault,
) => {
  const { id } = await addDoc(collection(db, 'chat'), {
    users: [
      { nickname: myInfo.nickname, id: myInfo.id, job: myInfo.jobSector },
      {
        nickname: counterInfo.nickname,
        id: counterInfo.id,
        job: counterInfo.jobSector,
      },
    ],
    updatedAt: '',
    lastChat: '',
    lastVisited: {
      [myInfo.id]: Timestamp.now(),
      [counterInfo.id]: Timestamp.now(),
    },
    userIds: [myInfo.id, counterInfo.id],
  });

  return id;
};
