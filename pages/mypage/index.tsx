import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import MyPageComponent from '@components/mypage/MyPageComponent';
import Layout from '@layouts/Layout';
import Container from '@mui/material/Container';
import type { RootReducer } from '@store/reducer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import wrapper from '@store/configureStore';

const MyPage: NextPage = ({
  email,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(email);
  return (
    <>
      <Head>
        <title>마이페이지</title>
        <meta name="description" content="Generate by elice Team 5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Container>
          {email}
          <MyPageComponent />
        </Container>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const data = store.getState();
    console.log(data, '데이터 실행');

    if (data.user.user.nickname == '') {
      // todo: 초기값을 판단하는 근거가 이상함...
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }

    return {
      props: { email: data.user.user.email },
    };
  });

export default MyPage;
