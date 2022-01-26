import styled from '@emotion/styled';
import React from 'react';

const CommentTextDiv = styled.div`
  margin-bottom: 25px;
  font-size: 1rem;
`;

type CommentProps = {
  commentText: string;
};

const CommentTextComponent: React.FC<CommentProps> = ({ commentText }) => {
  return (
    <CommentTextDiv>
      <span>{commentText}</span>
    </CommentTextDiv>
  );
};

export default CommentTextComponent;
