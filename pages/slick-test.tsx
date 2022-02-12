import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
const SlideDiv = styled.div`
  border: 1px solid red;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const HeaderWrapperDivStyled = styled.div`
  position: fixed;
  z-index: 99;
  width: 100vw;
`;
export default function SlickTest() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <HeaderWrapperDivStyled>
        <HeaderHome />
      </HeaderWrapperDivStyled>

      <div style={{ width: '100%' }}>
        <Slider
          initialSlide={0}
          {...settings}
          arrows={false}
          onSwipe={(e) => {
            console.log(e);
          }}
          lazyLoad="ondemand"
        >
          <ListPage />
          <ListPage />
          <ListPage />
          <ListPage />
          <ListPage />
        </Slider>
      </div>
      <Footer />
    </>
  );
}
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { LinearProgress } from '@mui/material';

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
import Footer from '@layouts/Footer';

const ListPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [asPath, setAsPath] = useState<string>(router.asPath);
  const { user: myInfo }: UserState = useSelector(
    (state: StoreState) => state.user,
  );
  const { view }: { view: Array<SearchResult> } = useSelector(
    (state: StoreState) => state.view,
  );
  const { scrollY }: { scrollY: number } = useSelector(
    (state: StoreState) => state.scroll,
  );
  // console.log(myInfo);
  const paddingFunction = useDebounce({
    cb: () => window.scrollY !== 0 && dispatch(setScrollAction(window.scrollY)),
    ms: 100,
  });
  useEffect(() => {
    window.addEventListener('scroll', paddingFunction);
    return () => {
      window.removeEventListener('scroll', paddingFunction);
      // dispatch(resetViewAction());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   if (!myInfo) dispatch(getUser());
  // }, [myInfo, dispatch]);

  useEffect(() => {
    if (router.asPath !== asPath) {
      dispatch(resetViewAction()); // 뒤로가기로 온 게 아닐때 View를 Reset한다.
      dispatch(setScrollAction(0));
      router.events.on(
        'routeChangeComplete',
        () => window.scrollTo({ top: 0 }),
        // setTimeout(() => window.scrollTo({ top: 0 }), 0),
      );
    } else
      router.events.on(
        'routeChangeComplete',
        () => window.scrollTo({ top: scrollY }),
        // setTimeout(() => window.scrollTo({ top: scrollY }), 0),
      );

    setAsPath(router.asPath);
  }, [router.asPath]);
  // useEffect(() => {
  //   if (!myInfo) dispatch(getUser());
  // }, [myInfo, dispatch]);
  useEffect(() => {
    if (
      myInfo?.validRounges.findIndex(
        (v: ValidRounge) => `/list/${v.url}` === router.asPath,
      ) === -1
    ) {
      return;
    }
  }, [router, myInfo]);
  useEffect(() => {
    if (view.length === 0)
      (async () => {
        dispatch(
          setViewAction(await getHomePostsInfiniteFunction('timeline', 0)),
        );
      })();
  }, [view]);
  useEffect(() => {
    if (inView) {
      (async () => {
        setIsLoading(true);
        const nextResults = await getHomePostsInfiniteFunction(
          'timeline',
          view[view.length - 1].nextPage,
        );
        dispatch(setViewAction(nextResults));
        setIsLoading(false);
      })();
    }
  }, [inView]);

  const renderData = view.flatMap((value: any) => value.result) ?? [];
  if (isLoading && view.length === 0) {
    return <LinearProgress />;
  }
  return (
    <>
      <TimelinePageWrapperDiv>
        <TimelineResultsWrapperDiv>
          {(renderData as Array<TopicPost | RoungePost>)?.map((post, i) => {
            if (
              i >=
              (renderData as Array<TopicPost | RoungePost>).length - 10
            ) {
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
        </TimelineResultsWrapperDiv>
      </TimelinePageWrapperDiv>
    </>
  );
};

const TimelinePageWrapperDiv = styled.div``;
const TimelineResultsWrapperDiv = styled.div`
  width: 100%;
  padding-bottom: 68px;
`;
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as TypesSwiper } from 'swiper/types';
import 'swiper/css/pagination';
import 'swiper/css';
import { Pagination } from 'swiper';
import { RootReducer } from '@store/reducer';
const SwiperStyled = styled(Swiper)`
  background-color: ${({ theme }: any) =>
    theme.customTheme.defaultMode.headerMenuBackgroundColor};
  height: 60px;
  width: 100%;
  & .swiper-pagination-bullet {
    background-color: #fff;
    height: 6px;
    width: 6px;
  }
  & .swiper-pagination {
    height: 14px;
    z-index: 1;
  }
  & .swiper-slide {
    // color: rgba(93, 93, 95, 0.9); // swiper 양 옆 글자 색
    color: ${({ theme }: any) =>
      theme.customTheme.defaultMode.swiperSlideTextColor};
    text-align: center;
    font-size: 0.8rem;
    line-height: 1.6rem;
    z-index: 1080;
  }
  & .swiper-slide-active {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    line-height: 1.2rem;
    font-weight: bolder;
  }
  & .slide-title {
    margin-top: 16px;
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }: any) =>
      theme.customTheme.darkMode.headerMenuBackgroundColor};
    & .swiper-slide {
      color: ${({ theme }: any) =>
        theme.customTheme.darkMode.swiperSlideTextColor};
    }
    & .swiper-slide-active {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1rem;
      line-height: 1.2rem;
      font-weight: bolder;
    }
    & .slide-title {
      margin-top: 16px;
    }
  }
`;

const HeaderHome: React.FC = () => {
  const { user: myInfo } = useSelector((state: RootReducer) => state.user);
  const router = useRouter();
  const headerLinks: { url: string; title: string }[] = [];
  if (myInfo?.validRounges)
    headerLinks.push(
      ...myInfo?.validRounges.map((v: ValidRounge) => ({
        title: v.title,
        url: `/list/${v.url}`,
      })),
    );
  if (headerLinks.length === 0) {
    headerLinks.push(
      { title: '타임라인', url: 'timeline' },
      { title: '토픽', url: 'topic' },
    );
  }
  const initialSlide = headerLinks.findIndex(
    ({ url }) => url === router.asPath,
  );
  return (
    <SwiperStyled
      slidesPerView={3}
      spaceBetween={30}
      centeredSlides={true}
      pagination={{
        clickable: false,
      }}
      initialSlide={initialSlide}
      onSlideChange={(e: TypesSwiper) => {
        e.slideTo(e.activeIndex);
        router.push(headerLinks[e.activeIndex].url);
      }}
      slideToClickedSlide
      modules={[Pagination]}
    >
      {headerLinks.map(({ title }) => (
        <SwiperSlide key={title}>
          <div className="slide-title">{title}</div>
        </SwiperSlide>
      ))}
    </SwiperStyled>
  );
};
