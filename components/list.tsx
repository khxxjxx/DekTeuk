import styled from '@emotion/styled';
import { RoungePost, TopicPost } from '@interface/CardInterface';
import { StoreState } from '@interface/StoreInterface';
import { useDispatch, useSelector } from 'react-redux';
import { RoungeCard, TopicCard } from '@components/Card';
import { useEffect, useRef } from 'react';
import { addViewWindowAction } from '@store/reducer';
import { HomeListUrlString } from '@interface/GetPostsInterface';
import { getHomePostsInfiniteFunction } from '@utils/function';
import { useInView } from 'react-intersection-observer';
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';
import { InfiniteLoader } from 'react-virtualized';

export default function VirtualizedList({
  urlKey,
  validRounges,
  myId,
}: {
  urlKey: HomeListUrlString;
  validRounges: Array<HomeListUrlString>;
  myId?: string;
}) {
  const dispatch = useDispatch();
  const { ref, inView } = useInView();
  const viewSwiperState = useSelector((state: StoreState) => state.viewSwiper);
  const currentViewWindow = viewSwiperState.find(
    (viewWindow) => viewWindow.key === urlKey,
  );
  useEffect(() => {
    if (!currentViewWindow || currentViewWindow.data.length === 0) {
      (async () => {
        console.log('initial');
        const addData = await getHomePostsInfiniteFunction(
          urlKey,
          0,
          validRounges,
        );
        dispatch(addViewWindowAction({ key: urlKey, addData }));
      })();
    }
  }, []);
  const cache = useRef(
    new CellMeasurerCache({ fixedWidth: true, defaultHeight: 100 }),
  );
  let renderData: Array<TopicPost | RoungePost> = [];
  if (currentViewWindow?.data && currentViewWindow.data.length > 0) {
    renderData = currentViewWindow.data.flatMap((v) => v.result);
  }
  return (
    <>
      {/* <div style={{ height: 'calc(100vh - 120px)' }}>Show</div> */}
      {/* 
        List
        AutoSizer
        CellMeasurer
        CellMeasurerCache
     */}
      {/* <AutoSizer>
        {({ width, height }) => (
          <InfiniteLoader
            isRowLoaded={({ index }) => {
              return index < renderData.length;
            }}
            loadMoreRows={async (props) => {
              console.log(props);
            }}
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                height={height}
                width={width}
                rowCount={renderData.length}
                rowHeight={217}
                rowRenderer={({ key, index, style, parent }) => (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    <div style={style}>
                      {renderData.map((post, i) => {
                        let isLiked = false;
                        if (myId) {
                          // @ts-ignore
                          if (post.pressPerson.indexOf(myId) !== -1)
                            isLiked = true;
                        }
                        if (
                          i ===
                          (renderData as Array<TopicPost | RoungePost>).length -
                            20
                        ) {
                          return post.postType === 'topic' ? (
                            <TopicCard
                              topicCardData={post}
                              key={post.postId}
                              ref={ref}
                              isLiked={isLiked}
                            />
                          ) : (
                            <RoungeCard
                              roungeCardData={post}
                              key={post.postId}
                              ref={ref}
                              isLiked={isLiked}
                            />
                          );
                        }
                        return post.postType === 'topic' ? (
                          <TopicCard
                            topicCardData={post}
                            key={post.postId}
                            isLiked={isLiked}
                          />
                        ) : (
                          <RoungeCard
                            roungeCardData={post}
                            key={post.postId}
                            isLiked={isLiked}
                          />
                        );
                      })}
                    </div>
                  </CellMeasurer>
                )}
              />
            )}
            {/* <List
                width={width}
                height={height}
                rowHeight={cache.current.rowHeight}
                deferredMeasurementCache={cache.current}
                rowCount={renderData.length}
                rowRenderer={({ key, index, style, parent }) => (
                  <CellMeasurer
                    key={key}
                    cache={cache.current}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    <div style={style}>
                      {renderData.map((post, i) => {
                        let isLiked = false;
                        if (myId) {
                          // @ts-ignore
                          if (post.pressPerson.indexOf(myId) !== -1)
                            isLiked = true;
                        }
                        if (
                          i ===
                          (renderData as Array<TopicPost | RoungePost>).length -
                            20
                        ) {
                          return post.postType === 'topic' ? (
                            <TopicCard
                              topicCardData={post}
                              key={post.postId}
                              ref={ref}
                              isLiked={isLiked}
                            />
                          ) : (
                            <RoungeCard
                              roungeCardData={post}
                              key={post.postId}
                              ref={ref}
                              isLiked={isLiked}
                            />
                          );
                        }
                        return post.postType === 'topic' ? (
                          <TopicCard
                            topicCardData={post}
                            key={post.postId}
                            isLiked={isLiked}
                          />
                        ) : (
                          <RoungeCard
                            roungeCardData={post}
                            key={post.postId}
                            isLiked={isLiked}
                          />
                        );
                      })}
                    </div>
                  </CellMeasurer>
                )}
              /> 
          </InfiniteLoader>
        )}
                    </AutoSizer>  */}
      <TimelinePageWrapperDiv>
        <TimelineResultsWrapperDiv>
          {renderData.map((post, i) => {
            let isLiked = false;
            if (myId) {
              // @ts-ignore
              if (post.pressPerson.indexOf(myId) !== -1) isLiked = true;
            }
            if (
              i ===
              (renderData as Array<TopicPost | RoungePost>).length - 20
            ) {
              return post.postType === 'topic' ? (
                <TopicCard
                  topicCardData={post}
                  key={post.postId}
                  ref={ref}
                  isLiked={isLiked}
                />
              ) : (
                <RoungeCard
                  roungeCardData={post}
                  key={post.postId}
                  ref={ref}
                  isLiked={isLiked}
                />
              );
            }
            return post.postType === 'topic' ? (
              <TopicCard
                topicCardData={post}
                key={post.postId}
                isLiked={isLiked}
              />
            ) : (
              <RoungeCard
                roungeCardData={post}
                key={post.postId}
                isLiked={isLiked}
              />
            );
          })}
        </TimelineResultsWrapperDiv>
      </TimelinePageWrapperDiv>
    </>
  );
}
const TimelinePageWrapperDiv = styled.div``;
const TimelineResultsWrapperDiv = styled.div`
  width: 100%;
  padding-bottom: 68px;
`;
