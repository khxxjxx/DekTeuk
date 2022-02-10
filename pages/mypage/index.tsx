import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import MyPageProfile from '@components/mypage/MyPageProfile';
import MyPagePostList from '@components/mypage/MyPagePostList';
import Layout from '@layouts/Layout';
import Container from '@mui/material/Container';
import wrapper from '@store/configureStore';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const MorePage = styled.div`
  & a {
    opacity: 0.3;
    margin: 20px auto 90px auto;
    display: block;
    text-align: center;
  }
`;

const MyPage: NextPage = ({
  email,
  userId,
  nickname,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(email, userId, nickname, 'sss');
  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title>마이페이지</title>
        <meta name="description" content="Generate by elice Team 5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Container>
          <MyPageProfile></MyPageProfile>
          <MyPagePostList userId={userId}></MyPagePostList>
          <MorePage>
            <Link href={'/mypage/posts'}>더보기</Link>
          </MorePage>
        </Container>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const data = store.getState();
    console.log(data, '마이페이지 데이터');
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
      props: {
        email: data.user.user.email,
        userId: data.user.user.id,
        nickname: data.user.user.nickname,
      },
    };
  });

export default MyPage;
