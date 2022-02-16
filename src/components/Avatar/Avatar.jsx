import React from 'react';
import { default as A } from '@mui/material/Avatar';

const Avatar = ({ src, alt }) => {
  return <A alt={alt} src={src} />;
};

export default Avatar;
