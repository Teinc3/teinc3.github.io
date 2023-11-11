import React, { useState, useEffect, useRef } from 'react';

import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Spacer,
} from '@chakra-ui/react'

import Measure from 'react-measure';

import ColorModeSwitcher from './ColorModeSwitcher'
import { Logo } from '../logo/Logo';
import { NavButton } from './NavButton';

import ExtraNavButtonHolder from './ExtraNavButtonHolder';

const buttons = [
  { name: 'Home', path: '/' },
  { name: 'Learning', path: '/learning' },
  { name: 'Games', path: '/games' },
  { name: 'Code', path: '/code' },
  { name: 'Daily Agenda', path: '/agenda' },
  { name: 'About Me', path: '/about' },
];
  
const Navbar = () => {

  const [visibleButtons, setVisibleButtons] = useState(buttons.length);
  const [buttonWidths, setButtonWidths] = useState([]);
  const barRef = useRef(null);
  const rightRef = useRef(null);
  const spacerRef = useRef(null);

  useEffect(() => {
    const calculateVisibleButtons = () => {
      const navbarWidth = barRef.current.offsetWidth;
      let totalWidth = 0;
      let maxVisibleButtons = 0;
      let sX, eX;
      for (let width of buttonWidths) {
        sX = (spacerRef.current?.getBoundingClientRect().right ?? 0);
        eX = (rightRef.current?.getBoundingClientRect().left ?? navbarWidth);
        if (sX + totalWidth + 2 * width > eX) {
          break;
        }
        totalWidth += width;
        maxVisibleButtons++;
      }
      setVisibleButtons(maxVisibleButtons);
    };

    calculateVisibleButtons();
    window.addEventListener('resize', calculateVisibleButtons);

    return () => {
      window.removeEventListener('resize', calculateVisibleButtons);
    }
  }, [buttonWidths]);

  return (
    <div>
      <Box ref={barRef} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Stack direction="row" spacing={3} align="center">
            <Logo h={(barRef.current?.offsetHeight ?? 0) * 0.75 + "px"} pointerEvents="none" useanimation="true" />
            <Spacer ref={spacerRef} />
            {buttons.filter((_, i) => i < visibleButtons).map(button => (
              <Measure
                key={button.path}
                bounds
                onResize={(contentRect) => {
                  setButtonWidths(prevWidths => {
                    const newWidths = [...prevWidths];
                    newWidths[buttons.indexOf(button)] = contentRect.bounds.width;
                    return newWidths;
                  });
                }}
              >
                {({ measureRef }) => (
                  <div ref={measureRef}>
                    <NavButton key={button.path} path={button.path}>{button.name}</NavButton>
                  </div>
                )}
              </Measure>
            ))}
            {visibleButtons < buttons.length && (
              <ExtraNavButtonHolder>
                {buttons.slice(visibleButtons).map(button => (
                    <div key={button.path}>
                      <NavButton path={button.path}>{button.name}</NavButton>
                    </div>
                ))}
              </ExtraNavButtonHolder>
            )}
          </Stack>
          <Flex ref={rightRef} alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <ColorModeSwitcher justifySelf="flex-end" />
              {/*Search*/}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </div>
  )
}

export default Navbar;