import React from 'react';
import { default as A } from '@mui/material/Avatar';

const Avatar = ({ src, alt, extraStyles }) => {
  return <A alt={alt} src={src} sx={{ margin: '0 auto', ...extraStyles }} />;
};

export default Avatar;
