import styled from '@emotion/styled';
import { useState } from 'react';
import Header from '@layouts/Header';
import Footer from '@layouts/Footer';
import ListTitle from '@components/ListTitle';
import List from '@components/List';
import InputBox from '@components/InputBox';
import Pagination from '@components/Pagination';

const ListPage = () => {
  const [page, setPage] = useState<number>(1);

  return (
    <>
      <Header />
      <Main>
        <ListTitle />
        <List />
        <InputBox />
        <Pagination page={page} setPage={setPage} />
      </Main>
      <Footer />
    </>
  );
};

export default ListPage;

const Main = styled.div`
  width: 100vw;
  height: calc(100vh - 118px);
  background-color: #f9f9f9;
  padding: 42px;
  padding-top: 94px;
`;
