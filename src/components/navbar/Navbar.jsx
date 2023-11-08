import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    Center,
    Spacer,
} from '@chakra-ui/react'

import ColorModeSwitcher from '../ColorModeSwitcher'
import { Logo } from '../logo/Logo';

const NavLink = props => {
  const { children } = props

  return (
    <Button
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}>
      {children}
    </Button>
  )
}
  
export default function Nav() {
  return (
    <div>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Stack direction="row" spacing={3}>
            <Logo h="4vmin" pointerEvents="none" />
            <Spacer />
            <NavLink to="/">Home</NavLink>
            <NavLink to="/academics">Academics</NavLink>
            <NavLink to="/code">Code</NavLink>
            <NavLink to="/miscellaneous">Miscellaneous</NavLink>
            <NavLink to="/about">About Me</NavLink>
          </Stack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <ColorModeSwitcher justifySelf="flex-end" />

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </div>
  )
}