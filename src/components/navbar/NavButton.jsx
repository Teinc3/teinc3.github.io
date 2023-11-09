import React from 'react';
import { Box, Button, useColorModeValue } from '@chakra-ui/react';
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
      position="relative"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
        '& > span': {
          w: "100%",
          left: "0",
          transition: "all 0.5s",
        },
      }}
      onClick={handleClick}
    >
      {children}
      <Box
        as="span"
        position="absolute"
        bottom="0"
        left="50%"
        w="0"
        h="2px"
        bg="currentcolor"
        transition="all 0.5s"
      />
    </Button>
  )
});