import React from 'react';
import styled from '@emotion/styled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CommentAuthorDiv = styled.div`
  margin-bottom: 25px;
  align-self: flex-end;
  display: flex;
  & svg {
    margin-right: 10px;
  }
`;

type authorProps = {
  author: string;
};

const CommentAuthorComponent: React.FC<authorProps> = ({ author }) => {
  return (
    <CommentAuthorDiv>
      <AccountCircleIcon />
      <span>{author}</span>
    </CommentAuthorDiv>
  );
};

export default CommentAuthorComponent;
