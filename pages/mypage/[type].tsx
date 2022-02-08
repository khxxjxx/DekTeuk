import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import Layout from '@layouts/Layout';

const ChangePage: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{data.type} 변경하기</title>
        <meta name="description" content="Generate by elice Team 5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>변경</div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { type } = context.query;

  if (type !== 'password' && type !== 'nickname' && type !== 'posts') {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const data = { type: type };
  return {
    props: { data },
  };
};

export default ChangePage;
