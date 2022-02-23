import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@firebase/firebase';
import { PostData } from '@interface/comment';

export const postOwnerNotificationUpdate = async (
  postData: PostData,
  postUrl: string,
  content: string,
) => {
  const userRef = doc(db, 'user', postData.ownerId);
  try {
    await updateDoc(userRef, {
      hasNewNotification: true,
    });
    await addDoc(collection(db, 'notification'), {
      postId: postData.id,
      postUrl,
      postType: postData.type === 'topic' ? '토픽' : '라운지',
      userId: postData.ownerId,
      content,
      createdAt: Date.now().toString(),
      alertType: 'post',
      originContent: postData.title,
    });
  } catch (err) {
    console.log(err);
  }
  return;
};

export const commentOwnerNotificationUpdate = async (
  userId: string,
  postUrl: string,
  postData: PostData,
  content: string,
  originContent: string,
) => {
  const userRef = doc(db, 'user', userId);
  try {
    await updateDoc(userRef, {
      hasNewNotification: true,
    });
    await addDoc(collection(db, 'notification'), {
      postId: postData.id,
      postUrl,
      postType: postData.type === 'topic' ? '토픽' : '라운지',
      userId,
      content,
      createdAt: Date.now().toString(),
      alertType: 'comment',
      originContent,
    });
  } catch (err) {
    console.log(err);
  }
  return;
};

export const notificationCheck = async (userId: string) => {
  const userRef = doc(db, 'user', userId);
  await updateDoc(userRef, {
    hasNewNotification: false,
  });
};
