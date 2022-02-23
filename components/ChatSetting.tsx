import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const ChatSetting = ({
  onToggle,
  onExitChat,
}: {
  onToggle: () => void;
  onExitChat: () => void;
}) => {
  return (
    <Background>
      <ModalWrapper>
        <OptionButton>
          <div className="text">채팅방을 나가시겠습니까?</div>
          <Line />
          <div className="exit" onClick={onExitChat}>
            채팅방 나가기
          </div>
        </OptionButton>
        <CancelButton onClick={onToggle}>닫기</CancelButton>
      </ModalWrapper>
    </Background>
  );
};

export default ChatSetting;

const slideUp = keyframes`
from {
  opacity: 0;
  transform: translateY(50vh);
}
to {
  opacity: 1;
  transform: translateY(0);
}`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999;
  background: #000000bf;
  display: flex;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  animation: ${slideUp} 0.5s ease-out forwards;
  width: clamp(0px, 80%, 600px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  color: black;
  position: fixed;
  bottom: 0;

  & > div {
    width: clamp(0px, 80%, 600px);
    border-radius: 20px;
    background-color: ${({ theme }: any) => theme.whiteGray};
    margin-bottom: 20px;
    cursor: pointer;
  }

  @media (prefers-color-scheme: dark) {
    color: white;
    & > div {
      background-color: ${({ theme }: any) => theme.blackGray};
    }
  }
`;

const OptionButton = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .text {
    font-size: 12px;
    color: gray;
    height: 30px;
    line-height: 30px;
  }
  & .exit {
    color: red;
    height: 50px;
    line-height: 50px;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid #d1d1d1;
  width: 100%;

  @media (prefers-color-scheme: dark) {
    border-bottom: 1px solid #3f3f3f;
  }
`;

const CancelButton = styled.div`
  height: 50px;
  text-align: center;
  font-weight: bold;
  line-height: 50px;
`;
