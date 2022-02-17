import React from 'react';
import Chip from '@mui/material/Chip';

const Tag = ({ children, onTagClick }) => {
  return <Chip label={children} onClick={onTagClick} />;
};

export default Tag;
