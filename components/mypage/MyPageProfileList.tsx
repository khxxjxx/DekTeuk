import styled from '@emotion/styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MyPageProfileLi = styled.div`
  margin-bottom: 30px;
  font-size: 1.2rem;
  width: 100%;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
`;

type MyPageProfileProps = {
  text: string;
};

const MyPageProfileList: React.FC<MyPageProfileProps> = ({ text }) => {
  return (
    <MyPageProfileLi>
      {text}
      <ArrowForwardIosIcon color="disabled" />
    </MyPageProfileLi>
  );
};

export default MyPageProfileList;
