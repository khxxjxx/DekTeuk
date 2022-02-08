import styled from '@emotion/styled';

type MyPagePost = {
  title: string;
  content: string;
};

const MyPagePostLi = styled.li``;

const MyPagePost: React.FC<MyPagePost> = ({ title, content }) => {
  return (
    <MyPagePostLi>
      <div>{title}</div>
      <div>{content}</div>
    </MyPagePostLi>
  );
};

export default MyPagePost;
