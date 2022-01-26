import React from 'react';
import styled from '@emotion/styled';
import LikeComponent from './CommentLikeComponent';
import CommentTextComponent from './CommentTextComponent';
import CommentAuthorComponent from './CommentAuthorComponent';

type CommentProps = {
  comments: string;
  likes: number;
  author: string;
};

const CommentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #8946a6;
  margin-bottom: 20px;
`;

const Comment: React.FC<CommentProps> = ({ comments, likes, author }) => {
  return (
    <>
      <CommentDiv>
        <LikeComponent likes={likes} />
        <CommentTextComponent commentText={comments}></CommentTextComponent>
        <CommentAuthorComponent author={author}></CommentAuthorComponent>
      </CommentDiv>
    </>
  );
};

export default Comment;
