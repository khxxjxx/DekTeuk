import Link from 'next/link';
import styled from '@emotion/styled';
import { MyPageProfileComponent } from './MyPageProfileComponent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MyPageProfileList from './MyPageProfileList';

type MyPageProfileProps = {
  email: string;
  nickname: string;
};

// todo: 마이페이지 리다자인

const MyPageProfile: React.FC<MyPageProfileProps> = ({ email, nickname }) => {
  return (
    <MyPageProfileComponent>
      <header>
        <AccountCircleIcon sx={{ fontSize: 80 }} />
        <div>
          <div id="nickname">{nickname}</div>
          <div id="email">{email}</div>
        </div>
      </header>
      <div>
        <Link href={'/mypage/nickname'}>
          <MyPageProfileList text="닉네임 변경하기" />
        </Link>

        <Link href={'/mypage/password'}>
          <MyPageProfileList text="비밀번호 변경하기" />
        </Link>

        <Link href={'/mypage/posts'}>
          <MyPageProfileList text="내가 작성한 게시물 보기" />
        </Link>
      </div>
    </MyPageProfileComponent>
  );
};

export default MyPageProfile;
