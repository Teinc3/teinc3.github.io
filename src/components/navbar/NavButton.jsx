import React from 'react';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const NavButton = React.forwardRef((props, ref) => {
  const { path, children } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Button
      ref={ref}
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
        // Possibly start an animation here and remove the bg change
      }}
      onClick={handleClick}>
      {children}
    </Button>
  )
});