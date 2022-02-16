import React, { useEffect } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import styled from '@emotion/styled';
import QuestionItem from '../../components/QuestionItem/QuestionItem';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from './../../store/slices/searchSlice';
import { useSearchResults } from './../../store/slices/searchSlice';
import CircularProgress from '@mui/material/CircularProgress';

const ResultsContainerStyled = styled.div`
  max-width: 800px;
  margin: 50px auto 0 auto;
`;

const Results = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  const dispatch = useDispatch();
  const searchResults = useSelector(useSearchResults);

  useEffect(() => {
    if (searchParams.has('q')) {
      let searchQuery = searchParams.get('q');
      dispatch(fetchQuestions(searchQuery));
    }
  }, []);

  return (
    <>
      <SearchForm />
      <ResultsContainerStyled>
        {searchResults.map(searchResult => {
          const {
            title,
            answer_count,
            tags,
            link,
            owner: { profile_image, display_name, link: authorLink },
          } = searchResult;
          return (
            <QuestionItem
              key={searchResult.question_id}
              title={title}
              answerCount={answer_count}
              tags={tags}
              authorImg={profile_image}
              authorName={display_name}
              authorLink={authorLink}
              link={link}
            />
          );
        })}
      </ResultsContainerStyled>
    </>
  );
};

export default Results;
