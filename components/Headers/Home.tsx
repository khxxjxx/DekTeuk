import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as TypesSwiper } from 'swiper/types';
import 'swiper/css/pagination';
import 'swiper/css';
import { Pagination } from 'swiper';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
//@ts-ignore
import { UserState, ValidRounge, UserInfo } from '@interface';

const SwiperStyled = styled(Swiper)`
  background-color: rgba(28, 28, 30, 1);
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
    color: rgba(93, 93, 95, 0.9);
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
`;
const HeaderHome: React.FC = () => {
  // const { data: myInfo } = useQuery('user', getMyInfo, {
  //   refetchOnWindowFocus: false,
  // });
  const { user: myInfo }: UserInfo = useSelector<UserState>(
    (state) => state.user,
  );
  // console.log(myInfo);
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
export default HeaderHome;
