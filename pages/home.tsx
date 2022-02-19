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
    // console.log(headerSwiperRef.activeIndex);
    if (headerSwiperRef?.activeIndex !== currentSlide)
      headerSwiperRef?.slideTo(currentSlide, 800);
    if (mainSwiperRef?.activeIndex !== currentSlide)
      mainSwiperRef?.slideTo(currentSlide, 800);
  }, [currentSlide]);

  const currentListKey = Array.isArray(router.query.list)
    ? router.query.list[0]
    : router.query.list;
  if (
    currentListKey &&
    myInfo.validRounges.length > 0 &&
    myInfo.validRounges
      .map((v) => v.url)
      .indexOf(currentListKey as HomeListUrlString) === -1
  ) {
    return <NotFoundPage />;
  }

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
      </HeaderWrapperDivStyled>
      <ChildrenWrapperDivStyled>
        <SwiperViewStyeld
          slidesPerView={1}
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
          // @ts-ignore
          ref={refMain}
        >
          {myInfo?.validRounges?.length > 0 &&
            myInfo.validRounges
              .map((v) => v.url)
              .map((url) => {
                return (
                  <SwiperSlide key={url}>
                    <TimelineResultsWrapperDiv>
                      <VirtualizedList
                        urlKey={url}
                        validRounges={myInfo.validRounges.map((v_) => v_.url)}
                        myId={myInfo.id}
                      />
                    </TimelineResultsWrapperDiv>
                  </SwiperSlide>
                );
              })}
        </SwiperViewStyeld>
      </ChildrenWrapperDivStyled>
      <Footer />
    </>
  );
};

export default ListPage;
export const ChildrenWrapperDivStyled = styled.div`
  // padding-top: 60px;
  height: 100vh;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
`;
const TimelineResultsWrapperDiv = styled.div`
  // width: 100%;
  // padding-bottom: 68px;
  // height: 100%;
  margin-top: 60px;
`;
const TimelinePageWrapperDiv = styled.div`
  // overflow-y: scroll;
  // overflow: hidden;
  // height: 100%;
  // position: static;
  // display: block;
`;
const SwiperViewStyeld = styled(Swiper)`
  // height: calc(100vh - 120px);
  // height: 100%;
  // height: 100vh;
`;
