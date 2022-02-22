import React, { useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Loader from '../../components/Loader/Loader';
import Alert from '@mui/material/Alert';
import QuestionTable from '../../components/QuestionTable/QuestionTable';
import { Container, Typography } from '@mui/material';
import useTableManipulator from '../../customHooks/useTableManipulator';
import {
  fetchDataByTag,
  fetchUserQuestions,
} from '../../store/slices/searchBySlice';
import { useDispatch } from 'react-redux';
import { fastViewTypes } from '../../pages/Results/Results';

const FastView = props => {
  const {
    isOpen,
    onClose,
    viewType,
    searchName,
    loading,
    data,
    anchor,
    onFastViewOpen,
    dataForDispatch,
  } = props;

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    handleChangePage,
    handleChangePageSize,
  } = useTableManipulator({ page: 0, pagesize: 5 });

  const dispatch = useDispatch();

  /* if page or pageSize change */
  useEffect(() => {
    if (!isOpen) return;
    if (viewType === fastViewTypes.author) {
      dispatch(
        fetchUserQuestions({ ...dataForDispatch, page, pagesize: pageSize })
      );
    } else if (viewType === fastViewTypes.tag) {
      dispatch(
        fetchDataByTag({
          ...dataForDispatch,
          page,
          pagesize: pageSize,
        })
      );
    }
  }, [dispatch, page, pageSize, dataForDispatch, viewType, isOpen]);

  return (
    <Drawer anchor={anchor} open={isOpen} onClose={onClose}>
      <Container sx={{ paddingTop: '15px' }}>
        <Typography variant="h5" component="p" sx={{ mb: 2 }}>
          Search by {viewType}: {searchName}
        </Typography>
        {loading.status === 'loading' ? (
          <Loader extraStyles={{ margin: '50px auto' }} />
        ) : loading.status === 'rejected' ? (
          <Alert severity="error">{loading.error}</Alert>
        ) : data.length === 0 ? (
          'No data'
        ) : (
          <QuestionTable
            data={data}
            extraStyles={{ maxHeight: '60vh' }}
            onFastViewOpen={onFastViewOpen}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleChangePage={handleChangePage}
            handleChangePageSize={handleChangePageSize}
          />
        )}
      </Container>
    </Drawer>
  );
};

export default FastView;
