import Link from 'next/link';
import styled from '@emotion/styled';
import MyPagePost from './MyPagePost';

const MyPagePostListCom = styled.article`
  margin-left: 20px;
  & ul {
    list-style: none;
    padding-left: 20px;
  }
`;
const postings = [
  {
    title: '게시물 제목입니다. ',
    content: '게시물 내용 조금',
  },
  {
    title: '게시물 제목입니다. ',
    content: '게시물 내용 조금',
  },
  {
    title: '게시물 제목입니다. ',
    content: '게시물 내용 조금',
  },
  {
    title: '게시물 제목입니다. ',
    content: '게시물 내용 조금',
  },
  {
    title: '게시물 제목입니다. ',
    content: '게시물 내용 조금',
  },
];

const MyPagePostList: React.FC = () => {
  return (
    <MyPagePostListCom>
      <h1>내가 작성한 게시물</h1>
      <ul>
        {postings.map((post, idx) => {
          return (
            <MyPagePost key={idx} title={post.title} content={post.content} />
          );
        })}
      </ul>
      <Link href={'/mypage/posts'}>더보기</Link>
    </MyPagePostListCom>
  );
};

export default MyPagePostList;
