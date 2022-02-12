import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@layouts/Layout';
import { getTopics } from '@utils/function';
import { TestTopicCard } from '@components/Card';
import { TopicPost } from '@interface/CardInterface';
import { useInView } from 'react-intersection-observer';
import { useSelector, useDispatch } from 'react-redux';
import { setDataAction } from '@store/reducer';
// import { SearchResult, StoreState } from '@interface/StoreInterface';
// import useDebounce from '@hooks/useDebounce';
// import {
//   getUser,
//   setViewAction,
//   resetViewAction,
//   setScrollAction,
//   initialViewAction,
//   setSearchValueAction,
// } from '@store/reducer';
import wrapper from '@store/configureStore';

export default function TopicPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const topicType = router.query.topic as string;
  const [posts, setPost] = useState<Array<TopicPost>>([]);
  const { ref, inView } = useInView();
  const [firstFetch, setFirstFetch] = useState<boolean>(true);

  const [stopFetch, setStopFetch] = useState<boolean>(false); // 파이어베이스 연동시 사용

  const [end, setEnd] = useState<any>(0); // 파이어베이스 연동시 사용

  const dispatch = useDispatch();
  // const [asPath, setAsPath] = useState<string>(router.asPath);
  // const { view }: { view: Array<SearchResult> } = useSelector(
  //   (state: StoreState) => state.view,
  // );
  // const { scrollY }: { scrollY: number } = useSelector(
  //   (state: StoreState) => state.scroll,
  // );
  // // console.log(myInfo);
  // const paddingFunction = useDebounce({
  //   cb: () => window.scrollY !== 0 && dispatch(setScrollAction(window.scrollY)),
  //   ms: 100,
  // });
  // useEffect(() => {
  //   window.addEventListener('scroll', paddingFunction);
  //   return () => {
  //     window.removeEventListener('scroll', paddingFunction);
  //     // dispatch(resetViewAction());
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // // useEffect(() => {
  // //   if (!myInfo) dispatch(getUser());
  // // }, [myInfo, dispatch]);

  // useEffect(() => {
  //   if (router.asPath !== asPath) {
  //     dispatch(resetViewAction()); // 뒤로가기로 온 게 아닐때 View를 Reset한다.
  //     dispatch(setScrollAction(0));
  //     router.events.on(
  //       'routeChangeComplete',
  //       () => window.scrollTo({ top: 0 }),
  //       // setTimeout(() => window.scrollTo({ top: 0 }), 0),
  //     );
  //   } else
  //     router.events.on(
  //       'routeChangeComplete',
  //       () => window.scrollTo({ top: scrollY }),
  //       // setTimeout(() => window.scrollTo({ top: scrollY }), 0),
  //     );

  //   setAsPath(router.asPath);
  // }, [router.asPath]);
  // const data = useSelector((state) => state) as any;
  // console.log(data, '리듀서에 담긴 데이터');
  useEffect(() => {
    console.log(data);

    setFirstFetch(false);
    // if (data.length) {
    //   console.log('data.data');
    //   setPost(data);
    // } else {
    console.log('리듀서 불러오기 실패');
    const firstPosts = getTopics(topicType, 'test');
    setPost(firstPosts);
    // }
  }, []);

  useEffect(() => {
    if (inView === true && firstFetch === false && stopFetch === false) {
      const nestPosts = getTopics(topicType, 'test');
      setPost([...posts, ...nestPosts]);
    }
  }, [inView]);

  useEffect(() => {
    dispatch(setDataAction(posts));
  }, [posts]);

  return (
    <Layout>
      {posts.length &&
        posts.map((post, idx) => (
          <>
            {idx == posts.length - 2 ? (
              <TestTopicCard topicCardData={post} key={post.postId} ref={ref} />
            ) : (
              <TestTopicCard topicCardData={post} key={post.postId} />
            )}
          </>
        ))}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const data = store.getState();
    console.log(data, '확인 데이터');

    return {
      props: { data },
    };
  });
