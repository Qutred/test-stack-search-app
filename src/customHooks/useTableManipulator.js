import { useState } from 'react';

const useTableManipulator = props => {
  const { page: curentPage = 0, pagesize = 5 } = props;
  const [page, setPage] = useState(curentPage);
  const [pageSize, setPageSize] = useState(pagesize);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageSize = event => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    handleChangePage,
    handleChangePageSize,
  };
};

export default useTableManipulator;
