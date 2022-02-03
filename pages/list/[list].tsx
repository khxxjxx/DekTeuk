import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Header from '@layouts/Header';
import Footer from '@layouts/Footer';
import ListTitle from '@components/ListTitle';
import List from '@components/List';
import InputBox from '@components/InputBox';
import Pagination from '@components/Pagination';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getMyInfo } from '@utils/function';
import Layout from '@layouts/Layout';
const ListPage = () => {
  const router = useRouter();
  const { data: myInfo } = useQuery('user', getMyInfo);
  useEffect(() => {
    if (
      myInfo?.validRounges.findIndex(
        (v) => `/list/${v.url}` === router.asPath,
      ) === -1
    ) {
      router.push('/404');
    }
  }, []);
  return (
    <>
      <Layout>
        <div>{router.query.list}</div>
      </Layout>
    </>
  );
};
export default ListPage;
