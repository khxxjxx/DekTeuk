import type { NextPage } from 'next';
import Head from 'next/head';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@emotion/styled';
import HomePost from '@components/HomePost';
import { getMyInfo } from '@utils/function';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/list/timeline');
  }, [router]);
  return <div></div>;
};
export default Home;
