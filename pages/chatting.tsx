import styled from '@emotion/styled';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@layouts/Layout';
const ChattingPageWrapperDiv = styled.div`
  background-color: rgba(28, 28, 30, 1);
  color: rgb(81, 81, 83);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  width: 100%;
  border-top: solid 1px rgb(59, 59, 61);
  border-bottom: solid 1px rgb(59, 59, 61);
  margin-bottom: 60px;
`;
const ChattingHeaderMenuWrapperDivStyled = styled.div`
  width: 100%;
  height: 42px;
  border-bottom: solid 1px rgb(59, 59, 61);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  text-align: center;
  & .my-chatting {
    cursor: pointer;
  }
  & .public-chatting {
    cursor: pointer;
  }
  ${({ property }) =>
    property === 'my'
      ? '& .my-chatting{color:#fff}'
      : '& .public-chatting{color:#fff}'}
`;
const DividerStyled = styled.div`
  width: 100%;
  border-radius: 10px;
  margin-top: -1px;
  margin-right: auto;
  display: flex;
  & div.divider-center {
    height: 2px;
    background-color: #fff;
    width: 50%;
  }
  & div.divider-start {
    transition: 0.5s;
    width: ${({ property }) => (property === 'public' ? '50%' : 0)};
  }
  & div.divider-end {
    transition: 0.5s;
    width: ${({ property }) => (property === 'public' ? 0 : '50%')};
  }
`;
const Chatting = () => {
  const [chatMode, setChatMode] = useState('my');
  return (
    <Layout>
      <ChattingPageWrapperDiv>
        <ChattingHeaderMenuWrapperDivStyled property={chatMode}>
          <div
            className={`my-chatting ${chatMode}`}
            onClick={() => {
              setChatMode('my');
            }}
          >
            MY
          </div>
          <div
            className={`public-chatting ${chatMode}`}
            onClick={() => {
              setChatMode('public');
            }}
          >
            퍼블릭
          </div>
        </ChattingHeaderMenuWrapperDivStyled>
        <DividerStyled property={chatMode}>
          <div className="divider-start" />
          <div className="divider-center" />
          <div className="divider-end" />
        </DividerStyled>
        {chatMode === 'my' && (
          <div>
            <MoodBadIcon fontSize="large" />
            대화 내역이 없습니다.
          </div>
        )}
        {chatMode === 'public' && (
          <div>
            {new Array(100).fill(0).map((v, i) => (
              <div key={i}>채팅1</div>
            ))}
          </div>
        )}
      </ChattingPageWrapperDiv>
    </Layout>
  );
};
export default Chatting;
