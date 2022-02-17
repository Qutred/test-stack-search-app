import React from 'react';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

const SmallTitle = ({ children }) => {
  return (
    <Typography
      variant="body2"
      component="span"
      sx={{
        color: 'var(--color-black)',
        cursor: 'pointer',
        ':hover': {
          color: 'var(--color-orange)',
        },
      }}
    >
      {children}
    </Typography>
  );
};

export default SmallTitle;
