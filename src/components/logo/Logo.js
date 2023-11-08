import React from 'react';
import { Image, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import logo from './logo.png';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  10% { transform: rotate(60deg); }
  90% { transform: rotate(300deg); }
  100% { transform: rotate(360deg); }
`;

export const Logo = props => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 10s ease-in-out`;

  return <Image animation={animation} src={logo} {...props} />;
};