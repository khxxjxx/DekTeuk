import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db, auth, app, firebaseConfig } from '@firebase/firebase';
import { collection, doc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

export default function RoungeIndex() {
  const router = useRouter();
  const [asPath, setAsPath] = useState('');
  useEffect(() => {
    setAsPath(router.asPath);
  }, [router]);
  const [조건, set조건] = useState(false);
  const [state, setState] = useState('');
  useEffect(() => {
    console.log(state);
  }, [state]);
  const a = { a: '12345', b: '12345' };
  return (
    <div>
      <div>asPath:{asPath}</div>
      <br />
      <div>topic의 indexPage</div>
      <input disabled value={state} readOnly id="인풋" />
      <input type="checkbox" disabled readOnly checked />
      <input
        value={state}
        onChange={(e) => {
          set조건((prev) => !prev);
          setState(e.target.value);
        }}
      />
      <button
        onClick={async (): Promise<any> => {
          const uid = auth.currentUser?.uid;
          // console.log(auth.currentUser?.uid);
          if (uid) {
            try {
              const app = firebase.initializeApp(firebaseConfig);
              const db = firebase.firestore(app);
              // 문서의 존재여부 확인
              // 삭제
              // 다시 존재여부 확인
              // 없으면 success
              // 있으면 삭제실패
              // 혹시 모르니 전체 과정을 try-catch로 묶어서 에러 핸들링
              //
              db.collection('cities')
                .doc('DC')
                .delete()
                .then(() => {
                  console.log('Document successfully deleted!');
                })
                .catch((error) => {
                  console.error('Error removing document: ', error);
                });
              // const result = await db
              //   .collection('usaaaaaaaaaaer')
              //   .doc('안되는uId')
              //   .delete()
              //   .then(console.log);
              // console.log(result);
            } catch (error) {
              console.error(error);
            }
            // try {
            //   const result = await deleteDoc(doc(db, 'user', uid));
            //   console.log('#########################');
            //   console.log('#########################');
            //   console.log(result);
            //   console.log('#########################');
            //   console.log('#########################');
            // } catch (error) {
            //   console.log(error);
            // }
          }
        }}
      >
        123123123
      </button>
    </div>
  );
}
