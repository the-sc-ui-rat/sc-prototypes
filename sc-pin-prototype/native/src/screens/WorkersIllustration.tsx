import React from 'react';
import Illustration from '../assets/Illustration.svg';

interface Props {
  size: number;
}

export function WorkersIllustration({ size }: Props) {
  return <Illustration width={size} height={size} />;
}
