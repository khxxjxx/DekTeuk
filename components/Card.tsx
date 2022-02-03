import styled from '@emotion/styled';
import { getDateTime } from '@utils/function';
import Link from 'next/link';
import { ForwardedRef, forwardRef } from 'react';
import { TopicPost, RoungePost } from '../interface/CardInterface';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useInView } from 'react-intersection-observer';
const CardWrapper = styled.div`
  background-color: rgba(28, 28, 30, 1);
  height: 200px;
  border-radius: 10px;
  margin: 17px 8px 0 8px;
  padding: 12px 24px;
  cursor: pointer;
  display: grid;
`;
const OneDepthNestedLink = styled(Link)`
  z-index: 1;
`;
const TopicWrapperDivStyled = styled.div`
  display: flex;
  & div {
    font-size: 8px;
    font-weight: 500;
    margin-bottom: 4px;
    background-color: purple;
    border-radius: 10px;
    padding: 2px 6px 2px 6px;
  }
`;
const CardDividerStyled = styled.div`
  width: calc(100% + 48px);
  background-color: rgb(39, 39, 41);
  height: 0.5px;
  margin-left: -24px;
  margin-top: 8px;
  margin-bottom: 8px;
`;
const CardTitleStyled = styled.div`
  font-size: 1.5rem;
`;
const CardContentStyled = styled.div`
  font-size: 0.8rem;
  color: rgb(118, 118, 120);
`;
const CardAuthorJobSectorStyled = styled.div`
  font-size: 0.8rem;
`;
const CardAuthorJobSectorWrapperStyled = styled.div`
  display: flex;
  align-items: center;
`;
const CardMiddleDotStyled = styled.div`
  font-size: 0.8rem;
  color: rgb(148, 148, 150);
  padding: 0 0.2rem 0 0.2rem;
`;
const CardAuthorNickname = styled.div`
  font-size: 0.6rem;
  color: rgb(184, 191, 210);
`;
const CardBottomWrapperStyled = styled.div`
  display: flex;
`;
const CardStatWrapper = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
`;
const ThumbUpIconStyled = styled(ThumbUpIcon)`
  font-size: 1rem;
  margin-right: 0.5rem;
`;
const ModeCommentIconStyled = styled(ModeCommentIcon)`
  font-size: 1rem;
  margin-right: 0.5rem;
`;

export const RoungeCard = forwardRef(
  (
    {
      roungeCardData,
    }: {
      roungeCardData: RoungePost;
    },
    ref?: ForwardedRef<any>,
  ) => {
    const { ref: cardRef, inView } = useInView();
    // console.log(Object.keys(roungeCardData));
    if (inView) {
      console.log('isInView!!');
    }
    return (
      <Link href={`/rounge/posts/${roungeCardData.postId}`}>
        <CardWrapper ref={cardRef}>
          {inView && (
            <>
              <div ref={ref} />
              <CardTitleStyled>{roungeCardData.title}</CardTitleStyled>
              <CardContentStyled>{roungeCardData.content}</CardContentStyled>
              <br />
              <CardAuthorJobSectorWrapperStyled>
                <CardAuthorJobSectorStyled>
                  {roungeCardData.author.jobSector}
                </CardAuthorJobSectorStyled>
                <CardMiddleDotStyled>·</CardMiddleDotStyled>
                <CardAuthorNickname>
                  {roungeCardData.author.nickname}
                </CardAuthorNickname>
              </CardAuthorJobSectorWrapperStyled>
              <CardDividerStyled />
              <CardBottomWrapperStyled>
                <CardStatWrapper>
                  <ThumbUpIconStyled />
                  {roungeCardData.likeCount === 0
                    ? '좋아요'
                    : roungeCardData.likeCount}
                </CardStatWrapper>
                <CardStatWrapper>
                  <ModeCommentIconStyled />
                  {roungeCardData.commentsCount === 0
                    ? '댓글'
                    : roungeCardData.commentsCount}
                </CardStatWrapper>
                <div style={{ marginLeft: 'auto' }}>
                  {getDateTime(roungeCardData.createdAt)}
                </div>
              </CardBottomWrapperStyled>
            </>
          )}
        </CardWrapper>
      </Link>
    );
  },
);

export const TopicCard = forwardRef(
  (
    {
      topicCardData,
    }: {
      topicCardData: TopicPost;
    },
    ref?: any,
  ) => {
    const { ref: cardRef, inView } = useInView();

    // console.log(Object.keys(topicCardData));
    return (
      <Link href={`/topic/posts/${topicCardData.postId}`}>
        <CardWrapper ref={cardRef}>
          {inView && (
            <>
              <div ref={ref} />
              <OneDepthNestedLink href={`/topic/${topicCardData.topic}`}>
                <TopicWrapperDivStyled>
                  <div>{topicCardData.topic}</div>
                </TopicWrapperDivStyled>
              </OneDepthNestedLink>
              <CardTitleStyled>{topicCardData.title}</CardTitleStyled>
              <CardContentStyled>{topicCardData.content}</CardContentStyled>
              <br />
              <div style={{ fontSize: '0.8rem', color: 'rgb(78, 85, 101)' }}>
                토픽
              </div>
              <CardAuthorJobSectorWrapperStyled>
                <CardAuthorJobSectorStyled>
                  {topicCardData.author.jobSector}
                </CardAuthorJobSectorStyled>
                <CardMiddleDotStyled>·</CardMiddleDotStyled>
                <CardAuthorNickname>
                  {topicCardData.author.nickname}
                </CardAuthorNickname>
              </CardAuthorJobSectorWrapperStyled>
              <CardDividerStyled />
              <CardBottomWrapperStyled>
                <CardStatWrapper>
                  <ThumbUpIconStyled />
                  {topicCardData.likeCount === 0
                    ? '좋아요'
                    : topicCardData.likeCount}
                </CardStatWrapper>
                <CardStatWrapper>
                  <ModeCommentIconStyled />
                  {topicCardData.commentsCount === 0
                    ? '댓글'
                    : topicCardData.commentsCount}
                </CardStatWrapper>
                <div style={{ marginLeft: 'auto' }}>
                  {getDateTime(topicCardData.createdAt)}
                </div>
              </CardBottomWrapperStyled>
            </>
          )}
        </CardWrapper>
      </Link>
    );
  },
);
