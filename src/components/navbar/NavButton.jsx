import { Button, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const NavButton = props => {
  const { path, children } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Button
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      onClick={handleClick}>
      {children}
    </Button>
  )
}