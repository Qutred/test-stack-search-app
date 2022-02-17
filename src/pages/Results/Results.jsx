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
import Drawer from '@mui/material/Drawer';
import { fetchUserQuestions } from '../../store/slices/userQuestionsSlice';
import {
  useUserQuestions,
  useUserQuestionsLoading,
} from '../../store/slices/userQuestionsSlice';
import {
  useTagData,
  useTagDataLoading,
  fetchDataByTag,
} from '../../store/slices/tagDataSlice';
import FastView from '../../components/FastView/FastView';

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

  const userQuestions = useSelector(useUserQuestions);
  const userQuestionsLoading = useSelector(useUserQuestionsLoading);

  const tagData = useSelector(useTagData);
  const tagDataLoading = useSelector(useTagDataLoading);

  const dispatch = useDispatch();

  /* close fast view handler */
  const closeFastView = () => {
    setFastView(prevState => ({ ...prevState, isOpen: false }));
  };

  /* on author cell click handler */
  const onAuthorClick = ({ userId, userName }) => {
    dispatch(fetchUserQuestions({ userId, userName }));
    setFastView(prevState => ({
      ...prevState,
      isOpen: true,
      viewType: fastViewTypes.author,
      searchName: userName,
    }));
  };

  /* on tag cell click handler */
  const onTagClick = tagName => {
    console.log(tagName);
    dispatch(fetchDataByTag(tagName));

    setFastView(prevState => ({
      ...prevState,
      isOpen: true,
      viewType: fastViewTypes.tag,
      searchName: tagName,
    }));
  };

  /* get actual fast view data  */
  const getFastViewData = () => {
    if (fastView.viewType === fastViewTypes.author) {
      return [userQuestions, userQuestionsLoading];
    } else if (fastView.viewType === fastViewTypes.tag) {
      return [tagData, tagDataLoading];
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

  /*  Get active data for fast view */
  let fastViewData, fastViewLoading;

  if (fastView.viewType !== null) {
    [fastViewData, fastViewLoading] = getFastViewData();
  }

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
            onAuthorClick={onAuthorClick}
            onTagClick={onTagClick}
          />
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
          loading={fastViewLoading}
          data={fastViewData}
          onAuthorClick={onAuthorClick}
          onTagClick={onTagClick}
        ></FastView>
      )}
    </>
  );
};

export default Results;
