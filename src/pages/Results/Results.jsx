import React, { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import styled from '@emotion/styled';
import QuestionItem from '../../components/QuestionItem/QuestionItem';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from './../../store/slices/searchSlice';
import { useSearchResults } from './../../store/slices/searchSlice';
import EmptySearchResults from '../../components/EmptySearchResults/EmptySearchResults';
import { useSearchLoading } from '../../store/slices/searchSlice';
import Loader from '../../components/Loader/Loader';
import QuestionTable from '../../components/QuestionTable/QuestionTable';

const ResultsContainerStyled = styled.div`
  margin: 50px auto 0 auto;
`;

const Results = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchQuery = searchParams.get('q');
  const searchResults = useSelector(useSearchResults);
  const searchLoading = useSelector(useSearchLoading);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchQuestions(searchQuery));
    }
  }, [dispatch, searchQuery]);

  const handleSearch = searchQuery => {
    setSearchParams({ q: searchQuery });
  };

  return (
    <>
      <SearchForm handleSearch={handleSearch} />
      <ResultsContainerStyled>
        {searchLoading.status === 'loading' ? (
          <Loader />
        ) : searchResults.length === 0 ? (
          <EmptySearchResults searchQuery={searchQuery} />
        ) : (
          <QuestionTable
            data={searchResults}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPage={rowsPerPage}
            page={page}
          />
        )}
      </ResultsContainerStyled>
    </>
  );
};

export default Results;
