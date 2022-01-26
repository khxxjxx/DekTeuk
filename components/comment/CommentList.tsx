import React from 'react';
import Comment from './CommentComponent';
import styled from '@emotion/styled';

const CommentListDiv = styled.div`
  width: 100%;
`;

const CommentList: React.FC = () => {
  const fakeData = {
    comments:
      '반갑습니다. 나는 이러이러한 질문이 있습니다 제발 정답을 알려주실분을 구하고 있습나니다ㅓ 정말 어려운 작업입니다 우리모두 힘을 합쳐!',
    likes: 200,
    author: '하얀천과굵은소금',
  };

  return (
    <CommentListDiv>
      <Comment
        comments={fakeData.comments}
        likes={fakeData.likes}
        author={fakeData.author}
      />
      <Comment
        comments={fakeData.comments}
        likes={fakeData.likes}
        author={fakeData.author}
      />
      <Comment
        comments={fakeData.comments}
        likes={fakeData.likes}
        author={fakeData.author}
      />
    </CommentListDiv>
  );
};

export default CommentList;
