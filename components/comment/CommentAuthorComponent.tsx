import React, { useState } from 'react';
import styled from '@emotion/styled';
import { getDateTime } from '@utils/function';
import ChantOpen from '@components/items/Chatopen';

const CommentAuthorDiv = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
`;

const CommentCompany = styled.span``;

const CommentNickname = styled.span`
  color: grey;
  font-size: 0.8rem;
`;

type authorProps = {
  nickname: string;
  job: string;
  date: string;
};

const CommentAuthorComponent: React.FC<authorProps> = ({
  date,
  nickname,
  job,
}) => {
  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle(false);
  };

  const openChat = () => {
    console.log('오픈 채팅!');
  };

  return (
    <>
      <CommentAuthorDiv>
        <div>{getDateTime(date)}</div>
        <div>
          <CommentNickname
            onClick={() => {
              setToggle(true);
            }}
          >
            {nickname}
          </CommentNickname>

          {`  `}

          <CommentCompany>{job}</CommentCompany>
        </div>
      </CommentAuthorDiv>
      {toggle && <ChantOpen onToggle={onToggle} openChat={openChat} />}
    </>
  );
};

export default CommentAuthorComponent;
