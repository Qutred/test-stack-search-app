import React, { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import { fetchQuestions } from './../../store/slices/searchSlice';
import { useSearchResults } from './../../store/slices/searchSlice';
import EmptySearchResults from '../../components/EmptySearchResults/EmptySearchResults';
import { useSearchLoading } from '../../store/slices/searchSlice';
import Loader from '../../components/Loader/Loader';
import QuestionTable from '../../components/QuestionTable/QuestionTable';
import FastView from '../../components/FastView/FastView';
import {
  fetchDataByTag,
  fetchUserQuestions,
  useSearchByData,
  useSearchByLoading,
} from '../../store/slices/searchBySlice';
import useTableManipulator from '../../customHooks/useTableManipulator';
import TableSort from '../../components/TableSort/TableSort';

const ResultsContainerStyled = styled.div`
  margin: 50px auto 0 auto;
`;

export const fastViewTypes = { tag: 'tag', author: 'author' };

const Results = () => {
  const searchResults = useSelector(useSearchResults);
  const searchLoading = useSelector(useSearchLoading);
  const [fastView, setFastView] = useState({
    isOpen: false,
    viewType: null,
    searchName: '',
    dataForDispatch: {},
  });

  let [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');

  const searchByData = useSelector(useSearchByData);
  const searchByLoading = useSelector(useSearchByLoading);

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    handleChangePage,
    handleChangePageSize,
  } = useTableManipulator({ page: 0, pagesize: 5 });

  const [activeSortType, setActiveSortType] = useState('relevance');

  const dispatch = useDispatch();

  const onChangeSortType = type => {
    setActiveSortType(type);
  };

  /* close fast view handler */
  const closeFastView = () => {
    setFastView(prevState => ({ ...prevState, isOpen: false }));
  };

  const onFastViewOpen = props => {
    const { type } = props;
    if (type === fastViewTypes.author) {
      const { userId, userName } = props;
      setFastView(prevState => ({
        ...prevState,
        isOpen: true,
        viewType: fastViewTypes.author,
        searchName: userName,
        dataForDispatch: { userId },
      }));
    } else if (type === fastViewTypes.tag) {
      const { tag } = props;
      setFastView(prevState => ({
        ...prevState,
        isOpen: true,
        viewType: fastViewTypes.tag,
        searchName: tag,
        dataForDispatch: { tag },
      }));
    }
  };

  /* update search param if search field changed */
  const handleSearch = searchQuery => {
    setPage(0);
    setSearchParams({ q: searchQuery });
  };

  /* if query string has search param 's' get data */
  useEffect(() => {
    if (searchQuery) {
      dispatch(
        fetchQuestions({
          intitle: searchQuery,
          page,
          pagesize: pageSize,
          sort: activeSortType,
        })
      );
    }
  }, [dispatch, searchQuery, page, pageSize, activeSortType]);

  return (
    <>
      <SearchForm handleSearch={handleSearch} />
      <ResultsContainerStyled>
        {searchLoading.status === 'loading' ? (
          <Loader />
        ) : searchLoading.status === 'rejected' ? (
          <Alert severity="error">{searchLoading.error}</Alert>
        ) : searchResults.items.length === 0 ? (
          <EmptySearchResults searchQuery={searchQuery} />
        ) : (
          <QuestionTable
            data={searchResults}
            onFastViewOpen={onFastViewOpen}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            handleChangePage={handleChangePage}
            handleChangePageSize={handleChangePageSize}
            sortBlock={
              <TableSort
                activeSortType={activeSortType}
                onChangeSortType={onChangeSortType}
                sortTypes={[
                  {
                    type: 'relevance',
                    name: 'Relevance',
                  },
                  {
                    type: 'activity',
                    name: 'Activity',
                  },
                  {
                    type: 'votes',
                    name: 'Votes',
                  },
                ]}
              />
            }
          />
        )}
      </ResultsContainerStyled>
      {
        <FastView
          anchor={'bottom'}
          open={fastView.isOpen}
          onClose={closeFastView}
          isOpen={fastView.isOpen}
          viewType={fastView.viewType}
          searchName={fastView.searchName}
          dataForDispatch={fastView.dataForDispatch}
          loading={searchByLoading}
          data={searchByData}
          onFastViewOpen={onFastViewOpen}
        ></FastView>
      }
    </>
  );
};

export default Results;
