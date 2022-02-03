import type { NextPage } from 'next';
import Head from 'next/head';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';
import HomePost from '@components/HomePost';
import { useQuery } from 'react-query';
import { getMyInfo } from '@utils/function';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export interface category {
  title: string;
}
const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/list/timeline');
  }, []);
  const { data: myInfo } = useQuery('user', getMyInfo);
  // console.log('IndexPage Home Component console.log myInfo', myInfo);
  return <div></div>;
};
export default Home;
