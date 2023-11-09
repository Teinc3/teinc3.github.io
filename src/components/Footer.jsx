import {
  Box,
  chakra,
  Container,
  Stack,
  VStack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaDiscord, FaReddit, FaYoutube, FaTwitter, FaGithub } from 'react-icons/fa'

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <VStack spacing={0} textAlign={"center"}>
          <Text>Powered by React and Chakra-UI</Text>
          <Text>All rights reserved © 2023 Teinc3.</Text>
        </VStack>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Reddit'} href={'https://www.reddit.com/user/teinc3'}>
            <FaReddit />
          </SocialButton>
          <SocialButton label={'X'} href={'https://twitter.com/teinc3'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'https://www.youtube.com/channel/UCcNmaqoL_6s9GGPAEomV7Qw'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Discord'} href={'https://discord.gg/ZByUfCg'}>
            <FaDiscord />
          </SocialButton>
          <SocialButton label={'Github'} href={'https://github.com/Teinc3'}>
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}
