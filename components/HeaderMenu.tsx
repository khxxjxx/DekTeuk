import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import LoginIcon from '@mui/icons-material/Login';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { category } from '@pages/index';
import Link from 'next/link';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArticleIcon from '@mui/icons-material/Article';
import styled from '@emotion/styled';

const ManageAccountsIconStyled = styled(ManageAccountsIcon)`
  color: rgba(255, 255, 255, 0.7);
`;
const LogoutIconStyled = styled(LogoutIcon)`
  color: rgba(255, 255, 255, 0.7);
`;
const LoginIconStyled = styled(LoginIcon)`
  color: rgba(255, 255, 255, 0.7);
`;
const GroupIconStyled = styled(GroupIcon)`
  color: rgba(255, 255, 255, 0.7);
`;
const QuestionAnswerIconStyled = styled(QuestionAnswerIcon)`
  color: rgba(255, 255, 255, 0.7);
`;
const ArticleIconStyled = styled(ArticleIcon)`
  color: rgba(255, 255, 255, 0.7);
`;

const ListItemTextStyled = styled(ListItemText)`
  color: rgba(255, 255, 255, 1);
`;
const DividerStyled = styled(Divider)`
  backgroundcolor: white;
`;

const LoggedInUDrawer = () => {
  return (
    <>
      <ListItem disablePadding>
        <Link href="/user/mypage" passHref={true}>
          <ListItemButton>
            <ListItemIcon>
              <ManageAccountsIconStyled />
            </ListItemIcon>
            <ListItemTextStyled primary="마이페이지" />
          </ListItemButton>
        </Link>
      </ListItem>
      <DividerStyled />
      <ListItem disablePadding>
        <Link href="/user/logout" passHref={true}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIconStyled />
            </ListItemIcon>
            <ListItemTextStyled primary="로그아웃" />
          </ListItemButton>
        </Link>
      </ListItem>
    </>
  );
};
const NotLoggedInUDrawer = () => {
  return (
    <>
      <ListItem disablePadding>
        <Link href="/user/login" passHref={true}>
          <ListItemButton>
            <ListItemIcon>
              <LoginIconStyled />
            </ListItemIcon>
            <ListItemTextStyled primary="로그인" />
          </ListItemButton>
        </Link>
      </ListItem>
      <DividerStyled />
      <ListItem disablePadding>
        <Link href="/user/signup" passHref={true}>
          <ListItemButton>
            <ListItemIcon>
              <GroupIconStyled />
            </ListItemIcon>
            <ListItemTextStyled primary="회원가입" />
          </ListItemButton>
        </Link>
      </ListItem>
    </>
  );
};
export default function HeaderMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#8946A6',
        backgroundColor: '#8946A6',
      }}
    >
      <List disablePadding>
        {isLoggedIn ? <LoggedInUDrawer /> : <NotLoggedInUDrawer />}
        <DrawerCategories
          categories={[{ title: '질문게시판' }, { title: '자유게시판' }]}
        />
      </List>
    </Box>
  );
}
const DrawerCategories = ({ categories }: { categories: Array<category> }) => {
  return (
    <>
      {categories.map((item, i) => (
        <div key={item.title}>
          <DividerStyled />
          <ListItem disablePadding>
            <Link href={`/list/${item.title}`} passHref={true}>
              <ListItemButton>
                <ListItemIcon>
                  {item.title === '질문게시판' && <QuestionAnswerIconStyled />}
                  {item.title === '자유게시판' && <ArticleIconStyled />}
                </ListItemIcon>
                <ListItemTextStyled primary={item.title} />
              </ListItemButton>
            </Link>
          </ListItem>
        </div>
      ))}
    </>
  );
};
