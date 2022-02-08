import Link from 'next/link';
import styled from '@emotion/styled';

const MyPageProfileList = styled.article`
  margin-left: 20px;
  & ul {
    list-style: none;
    padding-left: 20px;
  }
  & h1 {
    margin-bottom: 35px;
  }
`;

const MyPageProfileLi = styled.li`
  margin-bottom: 30px;
`;

const MyPageProfile: React.FC = () => {
  return (
    <MyPageProfileList>
      <h1>프로필</h1>
      <ul>
        <MyPageProfileLi>이메일</MyPageProfileLi>
        <MyPageProfileLi>
          <Link href={'/mypage/nickname'}>닉네임 변경하기</Link>
        </MyPageProfileLi>
        <MyPageProfileLi>
          <Link href={'/mypage/password'}>비밀번호 변경하기</Link>
        </MyPageProfileLi>
      </ul>
    </MyPageProfileList>
  );
};

export default MyPageProfile;
