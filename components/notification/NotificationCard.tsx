import styled from '@emotion/styled';
import NotificationInfo from './NotificationInfo';
import NotificationContent from './NotificationContent';
import NotificationOriginContent from './NotificationOriginContent';
import NotificationTime from './NotificationTime';

type NotificationCardProps = {
  type: string;
  time: string;
  originContent: string;
  content: string;
  postType: string;
};

const NotificationCardWrapper = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 15px;
  background-color: ${({ theme }: any) =>
    theme.customTheme.defaultMode.cardWrapperBackgroundColor};
`;
const NotificationMainContent = styled.div``;

const NotificationCard: React.FC<NotificationCardProps> = ({
  type,
  time,
  originContent,
  content,
  postType,
}) => {
  return (
    <NotificationCardWrapper>
      <NotificationMainContent>
        <NotificationInfo type={type} />
        <NotificationContent content={content} />
        <NotificationOriginContent
          originContent={originContent}
          postType={postType}
        />
      </NotificationMainContent>
      <NotificationTime time={time} />
    </NotificationCardWrapper>
  );
};

export default NotificationCard;
