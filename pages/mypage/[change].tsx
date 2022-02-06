import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@layouts/Layout';

const ChangePage: NextPage = () => {
  const router = useRouter();

  const { change } = router.query;

  return (
    <>
      <Head>
        <title>{`${
          change == 'password' ? '비밀번호' : '닉네임'
        } 변경하기`}</title>
        <meta name="description" content="Generate by elice Team 5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>변경</div>
      </Layout>
    </>
  );
};

export default ChangePage;
