import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import styled from '@emotion/styled';
import { LinearProgress } from '@mui/material';
import { Pagination } from 'swiper';
import { Swiper as TypesSwiper } from 'swiper/types';

import {
  SearchResult,
  StoreState,
  UserState,
  ValidRounge,
} from '@interface/StoreInterface';
import { TopicPost, RoungePost } from '@interface/CardInterface';
import { getHomePostsInfiniteFunction } from '@utils/function';
import Layout from '@layouts/Layout';
import { RoungeCard, TopicCard } from '@components/Card';
import NotFoundPage from '@pages/404';
import {
  getUser,
  setViewAction,
  resetViewAction,
  setScrollAction,
  initialViewAction,
  setSearchValueAction,
} from '@store/reducer';
import wrapper from '@store/configureStore';

import useDebounce from '@hooks/useDebounce';
import {
  DefaultListsAndTopics,
  HomeListUrlString,
} from '@interface/GetPostsInterface';
import Footer from '@layouts/Footer';
import { HeaderWrapperDivStyled } from '@layouts/Header';
import { SwiperStyled } from '@components/Headers/Home';
import VirtualizedList from '@components/list';
import { SwiperSlide, Swiper } from 'swiper/react';
const ListPage = () => {
  const router = useRouter();
  const refHeader = useRef();
  const refMain = useRef();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const {
    user: { user: myInfo },
  } = useSelector((state: StoreState) => state);
  useEffect(() => {
    if (
      (Array.isArray(router.query.list) || !router.query.list) &&
      myInfo.validRounges.length > 0
    ) {
      router.replace(`${location.pathname}?list=${myInfo.validRounges[0].url}`);
    }
  }, []);
  useEffect(() => {
    const currentListKey = Array.isArray(router.query.list)
      ? router.query.list[0]
      : router.query.list;
    if (currentListKey && myInfo.validRounges.length > 0) {
      const slideIndex = myInfo.validRounges.findIndex(
        (rounge) => rounge.url === currentListKey,
      );
      if (slideIndex !== -1) {
        setCurrentSlide(slideIndex);
      } else setCurrentSlide(0);
    }
  }, [router.query]);
  useEffect(() => {
    // @ts-ignore
    const headerSwiperRef: TypesSwiper = refHeader.current?.swiper;
    // @ts-ignore
    const mainSwiperRef: TypesSwiper = refMain.current?.swiper;
    console.log(headerSwiperRef.activeIndex);
    console.log(mainSwiperRef.activeIndex);
    if (headerSwiperRef.activeIndex !== currentSlide)
      headerSwiperRef.slideTo(currentSlide);
    if (mainSwiperRef.activeIndex !== currentSlide)
      mainSwiperRef.slideTo(currentSlide);
  }, [currentSlide]);
  // useEffect(() => {
  //   // if (inView && view[view.length - 1].nextPage !== -1) {
  //   //   // if (inView) {
  //   //   (async () => {
  //   //     console.log('inView');
  //   //     setIsLoading(true);
  //   //     const nextResults = await getHomePostsInfiniteFunction(
  //   //       router.asPath.split('/')[2] as HomeListUrlString,
  //   //       view[view.length - 1].nextPage,
  //   //       myInfo.validRounges.map((v) => v.url),
  //   //     );
  //   //     dispatch(setViewAction(nextResults));
  //   //     setIsLoading(false);
  //   //   })();
  //   // }
  // }, [inView]);

  const renderData: Array<any> = [];
  // if (
  //   myInfo?.validRounges.findIndex(
  //     (v: ValidRounge) => `/list/${v.url}` === router.asPath,
  //   ) === -1
  // ) {
  //   return <NotFoundPage />;
  // }

  // if (isLoading && view.length === 0) {
  //   return (
  //     <Layout>
  //       <LinearProgress />
  //     </Layout>
  //   );
  // }
  // if (
  //   myInfo?.validRounges.findIndex(
  //     (v: ValidRounge) => `/list/${v.url}` === router.asPath,
  //   ) === -1
  // ) {
  //   return <NotFoundPage />;
  // }
  return (
    <>
      <HeaderWrapperDivStyled>
        <div>
          <SwiperStyled
            slidesPerView={3}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
              clickable: false,
            }}
            initialSlide={currentSlide}
            onSlideChange={(e: TypesSwiper) => {
              e.slideTo(e.activeIndex);
              router.replace(
                `${location.pathname}?list=${
                  myInfo.validRounges.map((v) => v.url)[e.activeIndex]
                }`,
              );
            }}
            slideToClickedSlide
            modules={[Pagination]}
            // @ts-ignore
            ref={refHeader}
          >
            {myInfo.validRounges.map(({ title }) => (
              <SwiperSlide key={title}>
                <div className="slide-title">{title}</div>
              </SwiperSlide>
            ))}
          </SwiperStyled>
          <SwiperViewStyeld
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
              clickable: false,
            }}
            initialSlide={currentSlide}
            onSlideChange={(e: TypesSwiper) => {
              e.slideTo(e.activeIndex);
              router.replace(
                `${location.pathname}?list=${
                  myInfo.validRounges.map((v) => v.url)[e.activeIndex]
                }`,
              );
            }}
            slideToClickedSlide
            modules={[Pagination]}
            // @ts-ignore
            ref={refMain}
          >
            {myInfo?.validRounges?.length > 0 ? (
              myInfo.validRounges
                .map((v) => v.url)
                .map((url) => (
                  <SwiperSlide key={url}>
                    <VirtualizedList
                      urlKey={url}
                      validRounges={myInfo.validRounges.map((v_) => v_.url)}
                      myId={myInfo.id}
                    />
                  </SwiperSlide>
                ))
            ) : (
              <SwiperSlide>
                <VirtualizedList urlKey="topic" validRounges={['topic']} />
              </SwiperSlide>
            )}
          </SwiperViewStyeld>
        </div>
      </HeaderWrapperDivStyled>
      <Footer />
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async (ctx): Promise<any> => {
//       // store.dispatch(setSearchValueAction(''));
//       const validRoungesUrlArr: Array<HomeListUrlString> = store
//         .getState()
//         .user?.user?.validRounges?.map(
//           (v: { title: string; url: HomeListUrlString }) => v.url,
//         );
//       if(validRoungesUrlArr?.length>0 && !ctx.params?.list){

//       }
//       console.log('@@@111111111@@@');
//       console.log('@@@2@@@');
//       console.log(store.getState().user.user.validRounges);
//       console.log(ctx.params?.list);
//       console.log('@@@3@@@');
//       console.log('@@@4@@@');
//     },
// );

export default ListPage;

const TimelinePageWrapperDiv = styled.div``;
const TimelineResultsWrapperDiv = styled.div`
  width: 100%;
  padding-bottom: 68px;
`;
const SwiperViewStyeld = styled(Swiper)`
  height: 100%;
`;
