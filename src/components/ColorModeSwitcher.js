import React, { useState } from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <IconButton
      size="md"
      fontSize = {isHovered ? "2xl" : "1.5xl"}
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};

export default ColorModeSwitcher;
