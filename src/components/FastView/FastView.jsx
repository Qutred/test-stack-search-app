import React from 'react';
import Drawer from '@mui/material/Drawer';
import Loader from '../../components/Loader/Loader';
import QuestionTable from '../../components/QuestionTable/QuestionTable';
import { Container, Typography } from '@mui/material';

const FastView = props => {
  const {
    isOpen,
    onClose,
    viewType,
    searchName,
    loading,
    data,
    onAuthorClick,
    onTagClick,
    anchor,
  } = props;

  return (
    <Drawer anchor={anchor} open={isOpen} onClose={onClose}>
      <Container sx={{ paddingTop: '15px' }}>
        <Typography variant="h5" component="p" sx={{ mb: 2 }}>
          Search by {viewType}: {searchName}
        </Typography>
        {loading.status === 'loading' ? (
          <Loader />
        ) : data.length === 0 ? (
          'No data'
        ) : (
          <QuestionTable
            data={data}
            onAuthorClick={onAuthorClick}
            onTagClick={onTagClick}
            extraStyles={{ maxHeight: '60vh' }}
          />
        )}
      </Container>
    </Drawer>
  );
};

export default FastView;
