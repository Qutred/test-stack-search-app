import React, { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import styled from '@emotion/styled';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

const ResultsContainerStyled = styled.div`
  margin: 50px auto 0 auto;
`;

const fastViewTypes = { tag: 'tag', author: 'author' };

const Results = () => {
  const searchResults = useSelector(useSearchResults);
  const searchLoading = useSelector(useSearchLoading);
  const [fastView, setFastView] = useState({
    isOpen: false,
    viewType: null,
    searchName: '',
  });

  let [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');

  const searchByData = useSelector(useSearchByData);
  const searchByLoading = useSelector(useSearchByLoading);

  const dispatch = useDispatch();

  /* close fast view handler */
  const closeFastView = () => {
    setFastView(prevState => ({ ...prevState, isOpen: false }));
  };

  /* on author cell click handler */
  const onAuthorClick = ({ userId, userName }) => {
    dispatch(fetchUserQuestions({ userId }));
    setFastView(prevState => ({
      ...prevState,
      isOpen: true,
      viewType: fastViewTypes.author,
      searchName: userName,
    }));
  };

  /* on tag cell click handler */
  const onTagClick = tagName => {
    dispatch(fetchDataByTag(tagName));

    setFastView(prevState => ({
      ...prevState,
      isOpen: true,
      viewType: fastViewTypes.tag,
      searchName: tagName,
    }));
  };

  const onFastViewOpen = props => {
    console.log(props);
    const { type } = props;
    if (type === fastViewTypes.author) {
      const { userId, userName } = props;
      dispatch(fetchUserQuestions({ userId }));
      setFastView(prevState => ({
        ...prevState,
        isOpen: true,
        viewType: fastViewTypes.author,
        searchName: userName,
      }));
    } else if (type === fastViewTypes.tag) {
      const { tag } = props;
      dispatch(fetchDataByTag(tag));
      setFastView(prevState => ({
        ...prevState,
        isOpen: true,
        viewType: fastViewTypes.tag,
        searchName: tag,
      }));
    }
  };

  /* update search param if search field changed */
  const handleSearch = searchQuery => {
    setSearchParams({ q: searchQuery });
  };

  /* if query string has search param 's' get data */
  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchQuestions(searchQuery));
    }
  }, [dispatch, searchQuery]);

  return (
    <>
      <SearchForm handleSearch={handleSearch} />
      <ResultsContainerStyled>
        {searchLoading.status === 'loading' ? (
          <Loader />
        ) : searchResults.length === 0 ? (
          <EmptySearchResults searchQuery={searchQuery} />
        ) : (
          <QuestionTable data={searchResults} onFastViewOpen={onFastViewOpen} />
        )}
      </ResultsContainerStyled>
      {fastView.viewType !== null && (
        <FastView
          anchor={'bottom'}
          open={fastView.isOpen}
          onClose={closeFastView}
          isOpen={fastView.isOpen}
          viewType={fastView.viewType}
          searchName={fastView.searchName}
          loading={searchByLoading}
          data={searchByData}
          onAuthorClick={onAuthorClick}
          onTagClick={onTagClick}
          onFastViewOpen={onFastViewOpen}
        ></FastView>
      )}
    </>
  );
};

export default Results;
