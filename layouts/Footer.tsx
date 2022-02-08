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
  // background-color: rgb(34, 34, 36);
  background-color: #8946a6;
`;
const HomeOutlinedIconStyled = styled(HomeOutlinedIcon)`
  // color: rgb(145, 145, 146);
  color: #fff;
`;
const SearchOutlinedIconStyled = styled(SearchOutlinedIcon)`
  // color: rgb(145, 145, 146);
  color: #fff;
`;

const ForumOutlinedIconStyled = styled(ForumOutlinedIcon)`
  // color: rgb(145, 145, 146);
  color: #fff;
`;
const NotificationsNoneOutlinedIconStyled = styled(
  NotificationsNoneOutlinedIcon,
)`
  // color: rgb(145, 145, 146);
  color: #fff;
`;
const MoreHorizOutlinedIconStyled = styled(MoreHorizOutlinedIcon)`
  // color: rgb(145, 145, 146);
  color: #fff;
`;
const BorderColorOutlinedIconStyled = styled(BorderColorOutlinedIcon)`
  // color: rgba(247,227,227,1);
  background-color: #9165e2;

  border-radius: 50%;
  padding: 1px;
  // color: #fff;
  // color: #000;
  color: rgb(28, 28, 30);
`;
const Footer = () => {
  return (
    <FooterDiv>
      <Link href="/">
        <div>
          <HomeOutlinedIconStyled fontSize="medium" />
        </div>
      </Link>
      <div>
        <Link href="/search">
          <SearchOutlinedIconStyled fontSize="medium" />
        </Link>
      </div>
      <Link href="/chatting">
        <div>
          <ForumOutlinedIconStyled fontSize="medium" />
        </div>
      </Link>
      <div>
        <NotificationsNoneOutlinedIconStyled fontSize="medium" />
      </div>
      <div>
        <MoreHorizOutlinedIconStyled fontSize="medium" />
      </div>
      <div>
        <BorderColorOutlinedIconStyled fontSize="medium" />
      </div>
    </FooterDiv>
  );
};

export default Footer;
