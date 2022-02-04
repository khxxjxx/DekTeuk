import styled from '@emotion/styled';
import Footer from '@layouts/Footer';
import Header from '@layouts/Header';
const ChildrenWrapperDivStyled = styled.div`
  padding-top: 52px;
  min-height: calc(100vh - 144px);
`;
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <ChildrenWrapperDivStyled>{children}</ChildrenWrapperDivStyled>
      <Footer />
    </>
  );
};
export default Layout;
