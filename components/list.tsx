import React from 'react';
import styled from '@emotion/styled';
import { RoungePost, TopicPost } from '@interface/CardInterface';
import { StoreState } from '@interface/StoreInterface';
import { useDispatch, useSelector } from 'react-redux';
import { RoungeCard, TopicCard } from '@components/CardForHome';
import { CSSProperties, useEffect, useRef } from 'react';
import {
  addViewDataAction,
  addViewWindowAction,
  initialViewSwiperScrollAction,
  setScrollAction,
  setViewSwiperScrollAction,
} from '@store/reducer';
import { HomeListUrlString } from '@interface/GetPostsInterface';
import { getHomePostsInfiniteFunction } from '@utils/function';
import { useInView } from 'react-intersection-observer';
import { FixedSizeList as List, ListOnScrollProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

function VirtualizedList({
  urlKey,
  validRounges,
  myId,
}: {
  urlKey: HomeListUrlString;
  validRounges: Array<HomeListUrlString>;
  myId?: string;
}) {
  const dispatch = useDispatch();
  const viewSwiperState = useSelector((state: StoreState) => state.viewSwiper);
  const viewSwiperScroll = useSelector(
    (state: StoreState) => state.viewSwiperScroll,
  );
  const currentViewWindow = viewSwiperState.find(
    (viewWindow) => viewWindow.key === urlKey,
  )?.data;
  const currentViewScroll =
    viewSwiperScroll.find((v) => v.key === urlKey)?.scroll || 0;
  const handleScroll = (scrollData: ListOnScrollProps) => {
    // console.log(scrollData);
    dispatch(
      setViewSwiperScrollAction({
        key: urlKey,
        scroll: scrollData.scrollOffset,
      }),
    );
  };
  useEffect(() => {
    if (!currentViewWindow || currentViewWindow.length === 0) {
      (async () => {
        console.log('initial');
        const addData = await getHomePostsInfiniteFunction(
          urlKey,
          0,
          validRounges,
        );
        // console.log(addData);
        dispatch(addViewWindowAction({ key: urlKey, addData }));
        dispatch(initialViewSwiperScrollAction({ key: urlKey }));
      })();
    }
  }, []);
  // const cache = useRef(
  //   new CellMeasurerCache({ fixedWidth: true, defaultHeight: 100 }),
  // );
  let renderData: Array<TopicPost | RoungePost> = [];
  let currentLength: number = -1;

  if (currentViewWindow && currentViewWindow.length > 0) {
    renderData = currentViewWindow.flatMap((v) => v.result);
    currentLength = renderData.length;
  }
  // console.log(renderData, currentLength);

  console.log(renderData.length);
  return (
    <TimelinePageWrapperDiv>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={(i) => i < renderData.length}
            itemCount={Infinity}
            loadMoreItems={async (props) => {
              if (currentViewWindow) {
                const { nextPage } =
                  currentViewWindow[currentViewWindow.length - 1];
                const addData = await getHomePostsInfiniteFunction(
                  urlKey,
                  nextPage,
                  validRounges,
                );
                dispatch(addViewDataAction({ key: urlKey, addData }));
              }
            }}
          >
            {({ onItemsRendered, ref }) => {
              // console.log(onItemsRendered);
              return (
                <List
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  height={height}
                  width={width}
                  itemSize={217}
                  itemCount={currentLength}
                  onScroll={handleScroll}
                  initialScrollOffset={currentViewScroll}
                  overscanCount={4}
                >
                  {({ index, style }) => {
                    // console.log(index);
                    return (
                      <Row index={index} style={style} posts={renderData} />
                    );
                  }}
                </List>
              );
            }}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </TimelinePageWrapperDiv>
  );
}
const Row = ({
  index,
  style,
  posts,
  myId,
}: {
  index: number;
  style: CSSProperties;
  posts: Array<TopicPost | RoungePost>;
  myId?: string;
}) => {
  if (posts.length === 0 || !posts[index]) return null;
  const postData = posts[index];
  let isLiked = false;
  if (myId) {
    // @ts-ignore
    if (postData.pressPerson.indexOf(myId) !== -1) isLiked = true;
  }
  return postData.postType === 'topic' ? (
    <div style={style}>
      <TopicCard
        topicCardData={postData}
        key={postData.postId}
        isLiked={isLiked}
      />
    </div>
  ) : (
    <div style={style}>
      <RoungeCard
        roungeCardData={postData}
        key={postData.postId}
        isLiked={isLiked}
      />
    </div>
  );
};
export default React.memo(VirtualizedList);
const TimelinePageWrapperDiv = styled.div`
  height: calc(100vh - 120px);
  // height: 500px;
  margin-top: 60px;
  // height: 100%;
`;
const TimelineResultsWrapperDiv = styled.div`
  height: 100%;
`;
// {
//   /* <TimelineResultsWrapperDiv>
//   {renderData.map((post, i) => {
//     let isLiked = false;
//     if (myId) {
//       // @ts-ignore
//       if (post.pressPerson.indexOf(myId) !== -1) isLiked = true;
//     }
//     if (i === (renderData as Array<TopicPost | RoungePost>).length - 20) {
//       return post.postType === 'topic' ? (
//         <TopicCard
//           topicCardData={post}
//           key={post.postId}
//           isLiked={isLiked}
//         />
//       ) : (
//         <RoungeCard
//           roungeCardData={post}
//           key={post.postId}
//           isLiked={isLiked}
//         />
//       );
//     }
//     return post.postType === 'topic' ? (
//       <TopicCard
//         topicCardData={post}
//         key={post.postId}
//         isLiked={isLiked}
//       />
//     ) : (
//       <RoungeCard
//         roungeCardData={post}
//         key={post.postId}
//         isLiked={isLiked}
//       />
//     );
//   })}
// </TimelineResultsWrapperDiv> */
// }
