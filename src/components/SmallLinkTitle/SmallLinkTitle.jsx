import React from 'react';
import Typography from '@mui/material/Typography';

const SmallLinkTitle = ({ children, href }) => {
  return (
    <Typography
      href={href}
      variant="body2"
      component="a"
      sx={{
        color: 'var(--color-black)',
        ':hover': {
          color: 'var(--color-orange)',
        },
      }}
    >
      {children}
    </Typography>
  );
};

export default SmallLinkTitle;
