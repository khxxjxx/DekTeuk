import Footer from '@layouts/Footer';
import Header from '@layouts/Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
