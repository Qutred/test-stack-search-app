import React from 'react';
import Typography from '@mui/material/Typography';

const UserName = ({ children }) => {
  return (
    <Typography variant="body2" component="p">
      {children}
    </Typography>
  );
};

export default UserName;
