import styled from '@emotion/styled';
import { UserState } from '@interface/StoreInterface';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { getMyInfo } from '@utils/function';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
const ChattingWrapperDivStyled = styled.div`
  background-color: rgba(28, 28, 30, 1);
  height: 60px;
  width: 100%;
`;
const ChattingTitleHeadWrapperDivStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
`;
const AddCommentOutlinedIconStyled = styled(AddCommentOutlinedIcon)`
  float: right;
  margin-top: calc(-2rem - 15px);
  margin-right: 15px;
  font-size: 2rem;
  cursor: pointer;
`;
const HeaderChatting: React.FC = () => {
  const myInfo = useSelector((state: UserState) => state.user);
  return (
    <>
      <ChattingWrapperDivStyled>
        <ChattingTitleHeadWrapperDivStyled>
          <div>대화</div>
        </ChattingTitleHeadWrapperDivStyled>
        <AddCommentOutlinedIconStyled />
      </ChattingWrapperDivStyled>
    </>
  );
};
export default HeaderChatting;
