import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Spacer,
} from '@chakra-ui/react'

import ColorModeSwitcher from './ColorModeSwitcher'
import { Logo } from '../logo/Logo';
import { NavButton } from './NavButton';
import Login from './Login';
  
export default function Nav() {
  return (
    <div>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Stack direction="row" spacing={3}>
            <Logo h="4vmin" pointerEvents="none" />
            <Spacer />
            <NavButton path="/">Home</NavButton>
            <NavButton path="/learning">Learning</NavButton>
            <NavButton path="/games">Games</NavButton>
            <NavButton path="/code">Code</NavButton>
            <NavButton path="/about">About Me</NavButton>
          </Stack>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <ColorModeSwitcher justifySelf="flex-end" />
              <Login />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </div>
  )
}