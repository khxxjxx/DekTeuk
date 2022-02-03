import styled from '@emotion/styled';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Link from 'next/link';

const FooterDiv = styled.footer`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 1rem 0.4rem 1rem 0.4rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  bottom: 0;
  position: fixed;
  background-color: rgb(34, 34, 36);
`;
const Footer = () => {
  return (
    <FooterDiv>
      <Link href="/">
        <div>
          <HomeOutlinedIcon
            fontSize="medium"
            style={{ color: 'rgb(145,145,146)' }}
          />
        </div>
      </Link>
      <div>
        <Link href="/search">
          <SearchOutlinedIcon
            fontSize="medium"
            style={{ color: 'rgb(145,145,146)' }}
          />
        </Link>
      </div>
      <Link href="/chatting">
        <div>
          <ForumOutlinedIcon
            fontSize="medium"
            style={{ color: 'rgb(145,145,146)' }}
          />
        </div>
      </Link>
      <div>
        <NotificationsNoneOutlinedIcon
          fontSize="medium"
          style={{ color: 'rgb(145,145,146)' }}
        />
      </div>
      <div>
        <MoreHorizOutlinedIcon
          fontSize="medium"
          style={{ color: 'rgb(145,145,146)' }}
        />
      </div>
      <div>
        <BorderColorOutlinedIcon
          fontSize="medium"
          style={{
            backgroundColor: 'rgb(201,65,63)',
            borderRadius: '50%',
            padding: '1px',
            color: 'rgba(247,227,227,1)',
          }}
        />
      </div>
    </FooterDiv>
  );
};

export default Footer;
