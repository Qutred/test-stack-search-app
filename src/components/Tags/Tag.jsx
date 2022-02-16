import React from 'react';
import Chip from '@mui/material/Chip';

const Tag = ({ children }) => {
  return <Chip label={children} />;
};

export default Tag;
