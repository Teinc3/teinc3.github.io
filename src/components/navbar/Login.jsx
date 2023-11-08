import React, { Component } from 'react';

import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center
} from '@chakra-ui/react'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginInfo: {
        isLoggedIn: false,
        username: '',
        password: '',
        email: '',
        avatar: ''
      }
    }
  }

  render() {
    const { loginInfo } = this.state;
    const avatar = loginInfo.isLoggedIn ? loginInfo.avatar : 'https://avatars.dicebear.com/api/male/username.svg';
    return (
      <Menu>
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}>
          <Avatar
            size={'sm'}
            src={avatar}
          />
        </MenuButton>
        <MenuList alignItems={'center'}>
          <br />
          <Center>
            <Avatar
              size={'2xl'}
              src={avatar}
            />
          </Center>
          <br />
          <Center>
            <p>{loginInfo.isLoggedIn ? loginInfo.username : "Guest"}</p>
          </Center>
          <br />
          <MenuDivider />
          <MenuItem>Inbox</MenuItem>
          <MenuItem>Following</MenuItem>
          <MenuItem>Account Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    );
  }
}

export default Login;