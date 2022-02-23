import styled from '@emotion/styled';

const MyPageheader = styled.div`
  height: 60px;
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  line-height: 1.2rem;
  font-weight: bold;
  background-color: ${({ theme }: any) => theme.mainColorViolet};
  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }: any) => theme.mainColorBlack};
    ${({ theme }: any) => `border-top: 2px solid ${theme.blackGray};`};
  }
`;

type PageHeaderProps = {
  title: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return <MyPageheader>{title}</MyPageheader>;
};

export default PageHeader;
