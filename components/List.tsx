import { useRouter } from 'next/router';
import Link from 'next/link';

import styled from '@emotion/styled';

const dummyList = [
  {
    id: 0,
    title: '타스가 어려웡',
    author: '김희진',
    profile:
      'https://www.urbanbrush.net/web/wp-content/uploads/edd/2018/12/urbanbrush-20181213142535248709.png',
  },
  {
    id: 1,
    title: '타스가 넘나리 어려웡',
    author: '김희진',
    profile:
      'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/03/urbanbrush-20190304071823893331.png',
  },
  {
    id: 2,
    title: '리액트 다 까먹었다!!!!',
    author: '김김희진',
    profile:
      'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/03/urbanbrush-20190304071823893331.png',
  },
  {
    id: 3,
    title: '하나도 기억이 안난다!!',
    author: 'Jin',
    profile:
      'https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/03/urbanbrush-20190304071823893331.png',
  },
];

const List = () => {
  const router = useRouter();

  return (
    <ListsStyle>
      {dummyList.map((list) => (
        <ListStyle key={list.id}>
          <Link href={`/post/${list.id}`} passHref>
            <Title>{list.title}</Title>
          </Link>
          <Profile>
            <ProfileImg src={list.profile} />
            <ProfileName>{list.author}</ProfileName>
          </Profile>
        </ListStyle>
      ))}
    </ListsStyle>
  );
};

export default List;

const ListsStyle = styled.div`
  padding: 40px 0;
  height: 85%;
`;

const ListStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  box-shadow: 0px 1px 2px 0 #e3e3e3;
  background: #ffffff;
  border-radius: 4px;
  margin: 10px 0;
  font-size: 10px;
  padding: 0 10px;
`;

const Title = styled.div`
  width: 100%;
  height: 100%;
  line-height: 30px;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid #e3e3e3;
  height: 100%;
  width: 100px;
`;

const ProfileImg = styled.div<ImageProps>`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: url(${(props) => props.src}) center center;
  background-size: contain;
  margin-left: 10px;
`;

const ProfileName = styled.div`
  margin: 0 auto;
`;
