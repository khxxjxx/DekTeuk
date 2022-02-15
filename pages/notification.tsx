import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import wrapper from '@store/configureStore';
import { useEffect, useState } from 'react';
import Layout from '@layouts/Layout';
import { Container } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import NotificationCard from '@components/notification/NotificationCard';
import { notificationCheck } from '@utils/notificationUpdate';
import { useSelector } from 'react-redux';
import { RootReducer } from '@store/reducer';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '@firebase/firebase';
import { getDateTime } from '@utils/function';

const Notification: NextPage = ({
  userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const userInfo = useSelector((state: RootReducer) => state.user.user);
  const [notifications, setNotifications] = useState([]);
  const getNotification = async () => {
    const q = query(
      collection(db, 'notification'),
      where('userId', '==', `${userId}`),
      orderBy('createdAt', 'desc'),
      limit(10),
    );
    const snapshots = await getDocs(q);
    const dataArr: any = [];
    snapshots.forEach((snapshot) => {
      dataArr.push(snapshot.data());
    });

    setNotifications(dataArr);
  };

  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
    notificationCheck(userId);
  }, [userInfo]);

  return (
    <>
      <Head>
        <title>알림페이지</title>
        <meta name="description" content="Generate by elice Team 5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Container>
          <div style={{ marginTop: '30px' }}>
            <NotificationCard
              type={'comment'}
              time={'방금전'}
              originContent={'이것이 넷플릭스 오리지널?'}
              content={'디즈니플러스 진짜 개노잼'}
              postType={'토픽'}
            />
            {notifications.length != 0 &&
              notifications.map((v: any, i) => (
                <NotificationCard
                  key={i}
                  type={v.alertType}
                  time={getDateTime(v.createdAt)}
                  originContent={v.orginContent}
                  content={v.content}
                  postType={v.postType}
                />
              ))}
          </div>
        </Container>
      </Layout>
    </>
  );
};
export default Notification;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const data = store.getState();

    if (data.user.user.nickname == '') {
      return {
        redirect: {
          destination: '/user/login',
          permanent: false,
        },
      };
    }

    return {
      props: { userId: data.user.user.id },
    };
  });
