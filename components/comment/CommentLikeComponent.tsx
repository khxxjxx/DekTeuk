import styled from '@emotion/styled';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import React from 'react';

const LikeDiv = styled.div`
  margin-bottom: 15px;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

type LikeProps = {
  likes: number;
};

const LikeComponent: React.FC<LikeProps> = ({ likes }) => {
  return (
    <LikeDiv>
      <ThumbUpOffAltIcon />
      <span>{likes}</span>
    </LikeDiv>
  );
};

export default LikeComponent;
