import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const samplePosts = [
  {
    id: 'post의id1',
    title: '리액트가 너무 어려워요1',
    author: {
      id: 'author의id11',
      name: 'author의 이름',
    },
  },
  {
    id: 'post의id2',
    title: '리액트가 너무 어려워요2',
    author: {
      id: 'author의id22',
      name: 'author의 이름',
    },
  },
  {
    id: 'post의id3',
    title: '리액트가 너무 어려워요3',
    author: {
      id: 'author의id33',
      name: 'author의 이름',
    },
  },
  {
    id: 'post의id4',
    title: '자바스크립트가 너무 어려워요4',
    author: {
      id: 'author의id44',
      name: 'author의 이름',
    },
  },
  {
    id: 'post의id5',
    title: '자바스크립트가 너무 어려워요5',
    author: {
      id: 'author의id55',
      name: 'author의 이름',
    },
  },
  {
    id: 'post의id6',
    title: '자바스크립트가 너무 어려워요6',
    author: {
      id: 'author의id66입니다',
      name: 'author의 이름입니다',
    },
  },
  {
    id: 'post의id7',
    title: '자바스크립트가 너무 어려워요7',
    author: {
      id: 'author의id77입니다',
      name: 'author의 이름입니다',
    },
  },
  {
    id: 'post의id8',
    title: '자바스크립트가 너무 어려워요8',
    author: {
      id: 'author의id88입니다',
      name: 'author의 이름입니다',
    },
  },
  {
    id: 'post의id9',
    title: '자바스크립트가 너무 어려워요9',
    author: {
      id: 'author의id99입니다',
      name: 'author의 이름입니다',
    },
  },
  {
    id: 'post의id10',
    title: '자바스크립트가 너무 어려워요10',
    author: {
      id: 'author의id1010입니다',
      name: 'author의 이름입니다',
    },
  },
  {
    id: 'post의id10',
    title: '자바스크립트가 너무 어려워요10',
    author: {
      id: 'author의id1010입니다',
      name: 'author의 이름입니다',
    },
  },
  {
    id: 'post의id10',
    title: '자바스크립트가 너무 어려워요10',
    author: {
      id: 'author의id1010입니다',
      name: 'author의 이름입니다',
    },
  },
  {
    id: 'post의id10',
    title: '자바스크립트가 너무 어려워요10',
    author: {
      id: 'author의id1010입니다',
      name: 'author의 이름입니다',
    },
  },
  {
    id: 'post의id10',
    title: '자바스크립트가 너무 어려워요10',
    author: {
      id: 'author의id1010입니다',
      name: 'author의 이름입니다',
    },
  },
  {
    id: 'post의id10',
    title: '자바스크립트가 너무 어려워요10',
    author: {
      id: 'author의id1010입니다',
      name: 'author의 이름입니다',
    },
  },
  {
    id: 'post의id10',
    title: '자바스크립트가 너무 어려워요10',
    author: {
      id: 'author의id1010입니다',
      name: 'author의 이름입니다',
    },
  },
  {
    id: 'post의id10',
    title: '자바스크립트가 너무 어려워요10',
    author: {
      id: 'author의id1010입니다',
      name: 'author의 이름입니다',
    },
  },
];
const AvatarImageStyled = styled(Image)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;
const SinglePostLine = ({ item }: any) => {
  const router = useRouter();
  return (
    <div
      style={{
        width: '100%',
        borderRadius: '10px',
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        boxShadow: ' 0 4px 4px -4px #b0b0b0',
        cursor: 'pointer',
      }}
      onClick={() => {
        // router.push(`/post/${item.id}`);
        router.push(`/temp`);
        console.log(1234);
      }}
    >
      <div>
        {/* <Link href={`/post/${item.id}`}>{item.title}</Link> */}
        <Link href={`/temp`}>{item.title}</Link>
      </div>
      <div
        style={{
          marginLeft: 'auto',
          float: 'right',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link href={`/user/item.author.id`}>{item.author.name}</Link>
        <Link href={`/user/item.author.id`}>
          {item.author.avatar ? (
            <AvatarImageStyled src={item.author.avatar} />
          ) : (
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
              }}
            >
              {item.author.name[0]}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

const HomePost = () => {
  return (
    <div>
      {samplePosts.map((item, i) => (
        <div key={i}>
          <SinglePostLine item={item} />
        </div>
      ))}
    </div>
  );
};
export default HomePost;
