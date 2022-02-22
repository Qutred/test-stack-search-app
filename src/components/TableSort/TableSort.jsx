import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const BtnCustomStyles = {
  color: 'var(--color-orange)',
  borderColor: 'var(--color-orange)',
  ':hover': {
    borderColor: 'var(--color-orange)',
    color: 'var(--color-black)',
  },
  '&.active': {
    color: 'var(--color-black)',
  },
};

const BtnGroupStyles = {
  marginBottom: '15px',
  display: 'flex',
  justifyContent: 'flex-end',
};

const TableSort = props => {
  const { sortTypes, activeSortType = '', onChangeSortType } = props;
  return (
    <ButtonGroup
      sx={BtnGroupStyles}
      variant="outlined"
      aria-label="outlined button group"
    >
      {sortTypes.map(sortType => (
        <Button
          className={activeSortType === sortType.type ? 'active' : ''}
          key={sortType.type}
          sx={BtnCustomStyles}
          onClick={() => onChangeSortType(sortType.type)}
        >
          {sortType.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TableSort;
