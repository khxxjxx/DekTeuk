import Link from 'next/link';
import styled from '@emotion/styled';
import { MyPageProfileComponent } from './MyPageProfileComponent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MyPageLogOut from './MyPageLogOut';

type MyPageProfileProps = {
  email: string;
  nickname: string;
};

const MyPageProfileLi = styled.div`
  margin-bottom: 50px;
  font-size: 1.2rem;
  width: 100%;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const MyPageProfile: React.FC<MyPageProfileProps> = ({ email, nickname }) => {
  return (
    <MyPageProfileComponent>
      <header>
        <AccountCircleIcon sx={{ fontSize: 80 }} color="action" />
        <div style={{ marginBottom: '5px' }}>
          <div id="nickname">{nickname}</div>
          <div id="email">{email}</div>
        </div>
      </header>
      <div>
        <Link href={'/mypage/nickname'} passHref>
          <MyPageProfileLi>
            <span>닉네임 변경하기</span>
            <ArrowForwardIosIcon color="disabled" />
          </MyPageProfileLi>
        </Link>
        {/* <Link href={'/mypage/password'} passHref>
          <MyPageProfileLi>
            <span>비밀번호 변경하기</span>
            <ArrowForwardIosIcon color="disabled" />
          </MyPageProfileLi>
        </Link> */}

        <Link href={'/mypage/mypost'} passHref>
          <MyPageProfileLi>
            <span>내가 작성한 게시물 보기</span>
            <ArrowForwardIosIcon color="disabled" />
          </MyPageProfileLi>
        </Link>

        <MyPageLogOut />
      </div>
    </MyPageProfileComponent>
  );
};

export default MyPageProfile;
