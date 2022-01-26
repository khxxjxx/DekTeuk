import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@layouts/Layout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';
import useInputHook from '@hooks/useInputHook';
import HomePost from '@components/HomePost';
import Link from 'next/link';

const RenderCategoriesDivStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  border: 1px solid rgba(176, 176, 176, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 4px -4px #b0b0b0;
  margin-top: 1rem;
`;

const TextFieldCustom = styled(TextField)`
  & input {
    margin-right: 46px;
  }
  width: 100%;
`;
const ArrowButtonDivStyled = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  margin: 0 10px 0 -46px;
  padding: 0 10px 0 10px;
  z-index: 1;
`;
const SearceBarDivStyled = styled.div`
  display: flex;
  width: 100%;
`;

const RenderCategoriesLinkH3Styled = styled.h3`
  margin: 10px;
  cursor: pointer;
`;

const ArrowForwardIconStyled = styled(ArrowForwardIcon)`
  color: #b762c1;
`;
const Categories = [
  { title: '질문게시판' },
  { title: '자유게시판' },
  { title: '리액트게시판' },
  { title: '상사욕하기게시판' },
  { title: '익명게시판' },
  { title: '앨리스게시판' },
];
export interface category {
  title: string;
}
const RenderCategories = ({ categories }: { categories: Array<category> }) => {
  return (
    <RenderCategoriesDivStyled>
      {categories.map((category, i) => (
        <Link href={`/list/${category}`} key={category.title}>
          <RenderCategoriesLinkH3Styled>
            {category.title}
          </RenderCategoriesLinkH3Styled>
        </Link>
      ))}
    </RenderCategoriesDivStyled>
  );
};
const Home: NextPage = () => {
  const [searchInput, , onChangeSearchInput] = useInputHook('');
  const onSubmitSearchHandler = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    console.log(searchInput);
  };
  return (
    <div>
      <Head>
        <title>Devily</title>
        <meta name="description" content="Generate by elice Team 5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div style={{ padding: '20px' }}>
          <form onSubmit={onSubmitSearchHandler}>
            <SearceBarDivStyled>
              <TextFieldCustom
                id="outlined-basic"
                label="검색"
                variant="outlined"
                value={searchInput}
                onChange={onChangeSearchInput}
              />
              <ArrowButtonDivStyled onClick={onSubmitSearchHandler}>
                <ArrowForwardIconStyled />
              </ArrowButtonDivStyled>
            </SearceBarDivStyled>
          </form>
          <HomePost />
          <RenderCategories categories={Categories} />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
