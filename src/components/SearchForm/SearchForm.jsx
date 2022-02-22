import React, { forwardRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSearchParams, useLocation } from 'react-router-dom';

const StyledForm = styled.div(props => {
  return {
    padding: '30px 20px',
    maxWidth: '600px',
    margin: '0 auto',
    background: 'var(--color-white)',
    borderRadius: '2px',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
    ...props.extraStyles,
  };
});

const StyledTitle = styled.h1`
  color: var(--color-orange);
  text-align: center;
  margin-bottom: 15px;
  font-size: var(--fs-32);
  > span {
    font-weight: 700;
    color: var(--color-black);
  }
`;

const FieldsWrapper = styled.div`
  display: flex;
  > div {
    flex-grow: 1;
  }
  .MuiFormHelperText-root {
    position: absolute;
    top: 100%;
  }
`;

const SearchButtonStyles = {
  background: 'var(--color-orange)',
  borderRadius: '12px',
  borderTopLeftRadius: '0',
  borderBottomLeftRadius: '0',
  ':hover': {
    background: 'var(--color-black)',
  },
};

const TextFieldStyles = {
  '.MuiInputBase-root': {
    borderRadius: '12px',
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
  },
  '.Mui-focused > fieldset': {
    borderColor: 'var(--color-orange) !important',
  },
};

const SearchForm = forwardRef((props, ref) => {
  const { handleSearch = () => {} } = props;

  let [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState({
    value: searchParams.get('q') || '',
    error: false,
    errorMessage: '',
  });
  let location = useLocation();

  const onSearchClick = e => {
    e.preventDefault();

    if (!searchInput.value.length) {
      setSearchInput(prevState => {
        return {
          ...prevState,
          error: true,
          errorMessage: 'The field cannot be empty.',
        };
      });
    } else {
      handleSearch(searchInput.value);
    }
  };

  const handleInputChange = e => {
    setSearchInput(prevState => {
      return {
        ...prevState,
        value: e.target.value,
        error: false,
        errorMessage: '',
      };
    });
  };

  useEffect(() => {
    if (searchParams.has('q')) {
      setSearchInput(prevState => ({
        ...prevState,
        value: searchParams.get('q'),
      }));
    }
  }, [location, searchParams]);

  return (
    <StyledForm>
      <StyledTitle>
        Stack <span>Search</span>
      </StyledTitle>
      <FieldsWrapper>
        <TextField
          size="small"
          id="search-input"
          variant="outlined"
          sx={TextFieldStyles}
          value={searchInput.value}
          onChange={handleInputChange}
          error={searchInput.error}
          helperText={searchInput.error && searchInput.errorMessage}
        />
        <Button
          onClick={onSearchClick}
          size="small"
          variant="contained"
          sx={SearchButtonStyles}
        >
          Search
        </Button>
      </FieldsWrapper>
    </StyledForm>
  );
});

export default SearchForm;
