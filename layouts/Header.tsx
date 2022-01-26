import BasicList from '@components/HeaderMenu';
import styled from '@emotion/styled';
import { MenuOutlined } from '@mui/icons-material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState } from 'react';
import Link from 'next/link';
const Menu = styled.ul`
  background: #8946a6;
  display: flex;
  align-items: center;
  line-height: 50px;
  box-shadow: none;
  outline: none;
  text-align: left;
  list-style: none;
  font-size: 14px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  font-feature-settings: 'tnum', 'tnum';
  margin-bottom: 0;
  padding-left: 0;
  outline: none;
  color: rgba(255, 255, 255, 0.65);
  justify-content: space-between;
`;
export const MenuItem = styled.li`
  color: rgba(255, 255, 255, 0.8);
  display: inline-block;
  vertical-align: bottom;
  position: relative;
  transition: border-color 0.3s, background 0.3s;
  cursor: pointer;
  padding: 0 20px;
  border-bottom: 2px solid #8946a6;
  &:hover {
    top: 0;
    border-bottom: 2px solid #1890ff;
    color: #fff;
  }
  & > a {
    color: rgba(255, 255, 255, 0.65);
    &:hover {
      top: 0;
      color: #fff;
    }
  }
`;
const UserMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 13px 4px 13px 4px;
`;

const Header: React.FC = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const onClickDrawerButton = () => {
    setVisibleDrawer(true);
  };

  return (
    <>
      <SwipeableDrawer
        anchor="top"
        open={visibleDrawer}
        onClose={() => setVisibleDrawer(false)}
        onOpen={() => {
          setVisibleDrawer(true);
        }}
      >
        <BasicList isLoggedIn={false} />
      </SwipeableDrawer>

      <Menu>
        <Link href="/">
          <MenuItem>Devily</MenuItem>
        </Link>
        <MenuItem>
          <UserMenuWrapper
            onClick={() => {
              setVisibleDrawer(true);
            }}
          >
            <MenuOutlined />
          </UserMenuWrapper>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
