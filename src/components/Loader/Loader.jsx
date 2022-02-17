import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = ({ extraStyles }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress sx={{ color: 'var(--color-orange)', ...extraStyles }} />
    </Box>
  );
};

export default Loader;
