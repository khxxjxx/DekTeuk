import { FormEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'store/reducer';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { TopicPost, RoungePost } from '@interface/CardInterface';
import { UserState } from '@interface/StoreInterface';
import { RoungeCard, TopicCard } from '@components/Card';
import { ChildrenWrapperDivStyled } from '@layouts/Layout';
import Footer from '@layouts/Footer';
import { HeaderWrapperDivStyled } from '@layouts/Header';
import { getMyInfo, searchInfiniteFunction } from '@utils/function';

export interface SearchResult {
  result: Array<TopicPost | RoungePost>;
  nextPage: number;
}
const Search = ({ searchValue = '' }: { searchValue: string }) => {
  const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);
  useEffect(() => {
    (async () => {
      const results = await searchInfiniteFunction(searchValue, 0);
      // console.log(results);
      setSearchResults([results]);
    })();
  }, [searchValue]);
  // const {
  //   data: searchInfiniteResult,
  //   fetchNextPage,
  //   isFetching,
  //   remove: infiniteSearchQueryRemove,
  // } = useInfiniteQuery(
  //   ['infinite-search', searchValue],
  //   async ({ pageParam = 0 }) =>
  //     await searchInfiniteFunction(searchValue, pageParam),
  //   {
  //     getNextPageParam: ({ nextPage }) => nextPage,
  //     refetchOnWindowFocus: false,
  //   },
  // );
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      // fetchNextPage(); // inView 시 nextPage 불러옴
      (async () => {
        const nextResult = await searchInfiniteFunction(
          searchValue,
          searchResults[searchResults.length - 1].nextPage,
        );
        setSearchResults([...searchResults, nextResult]);
      })();
    }
  }, [inView, searchResults, searchValue]);
  // useEffect(() => {
  //   return () => infiniteSearchQueryRemove(); // unmount 시 query 삭제
  // }, []);

  // const renderData =
  //   searchInfiniteResult?.pages.flatMap((value: any) => value.result) ?? [];
  const renderData = searchResults.flatMap((value: any) => value.result) ?? [];
  // console.log(renderData[1]?.content);
  // console.log(renderData?.length);

  if (renderData.length > 0) {
    return (
      <SearchResultsWrapperDiv>
        {(renderData as Array<TopicPost | RoungePost>)?.map((post, i) => {
          if (i >= (renderData as Array<TopicPost | RoungePost>).length - 10) {
            return post.postType === 'topic' ? (
              <TopicCard topicCardData={post} key={post.postId} ref={ref} />
            ) : (
              <RoungeCard roungeCardData={post} key={post.postId} ref={ref} />
            );
          }
          return post.postType === 'topic' ? (
            <TopicCard topicCardData={post} key={post.postId} />
          ) : (
            <RoungeCard roungeCardData={post} key={post.postId} />
          );
        })}
      </SearchResultsWrapperDiv>
    );
  }
  return (
    <SearchPageWrapperDiv>최근에 검색한 내용이 없습니다.</SearchPageWrapperDiv>
  );
};
const WrappedSearch = () => {
  const router = useRouter();
  // const { data: myInfo } = useQuery('user', getMyInfo, {
  //   refetchOnWindowFocus: false,
  // });
  const [searchValue, setSearchValue] = useState('');
  const myInfo = useSelector((state: UserState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!myInfo) dispatch(getUser());
  }, [myInfo, dispatch]);
  console.log(myInfo);
  // const queryClient = useQueryClient();
  // const searchInfiniteQuery = useInfiniteQuery(
  //   ['infinite-search', searchValue],
  //   async ({ pageParam = 0 }) =>
  //     await searchInfiniteFunction(searchValue, pageParam),
  //   {
  //     getNextPageParam: ({ nextPage }) => nextPage,
  //     refetchOnWindowFocus: false,
  //   },
  // );
  const onSubmitSearchForm = async (e: FormEvent) => {
    e.preventDefault(); // form 액션으로 인한 refresh 방지
    const value = (
      e.currentTarget.querySelector(
        'input[name="search-value"]',
      ) as HTMLInputElement
    ).value; // form 내 input value
    if (!value) return; // value가 없을 시 return
    document
      .querySelector('#main-content')
      ?.scrollTo({ top: 0, behavior: 'smooth' }); // 새로 검색 시 상단스크롤
    // searchInfiniteQuery.remove();
    setSearchValue(value); // value값 변경
  };
  return (
    <>
      <HeaderWrapperDivStyled>
        <SearchWrapperStyled>
          <SearchFormStyled onSubmit={onSubmitSearchForm}>
            <SearchOutlinedIconStyled fontSize="medium" />
            <InputStyled
              name="search-value"
              type="text"
              placeholder="검색어, #태그로 검색"
            />
          </SearchFormStyled>
        </SearchWrapperStyled>
      </HeaderWrapperDivStyled>
      <AnimatePresence key={router.asPath} exitBeforeEnter>
        <ChildrenWrapperDivStyled
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
          }}
          id="main-content"
        >
          <Search searchValue={searchValue} />
        </ChildrenWrapperDivStyled>
      </AnimatePresence>
      <Footer />
    </>
  );
};
export default WrappedSearch;

const SearchPageWrapperDiv = styled.div`
  background-color: rgba(28, 28, 30, 1);
  color: rgb(81, 81, 83);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  height: 20vh;
  border-top: solid 1px rgb(59, 59, 61);
  border-bottom: solid 1px rgb(59, 59, 61);
`;
const SearchResultsWrapperDiv = styled.div`
  width: 100%;
  padding-bottom: 68px;
`;

const SearchWrapperStyled = styled.div`
  background-color: rgba(28, 28, 30, 1);
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: 2px solid rgb(17, 17, 19);
`;
const InputStyled = styled.input`
  background-color: rgb(39, 39, 41);
  border: 0;
  border-radius: 10px;
  height: 30px;
  color: rgb(149, 149, 151);
  padding: 1rem 0.8rem 1rem 0.8rem;
  width: 90vw;
  max-width: 600px;
  padding-left: 36px;
  transition: 0.3s;
`;

const SearchFormStyled = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const SearchOutlinedIconStyled = styled(SearchOutlinedIcon)`
  color: rgb(145, 145, 146);
  margin-right: -32px;
  z-index: 1;
`;
