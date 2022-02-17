import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tag from '../Tags/Tag';
import Box from '@mui/material/Box';
import SmallLinkTitle from '../SmallLinkTitle/SmallLinkTitle';
import TablePagination from '@mui/material/TablePagination';

const tableHeadStyles = {
  backgroundColor: 'var(--color-orange)',
  color: 'var(--color-white)',
};

const QuestionTable = props => {
  const { data, handleChangeRowsPerPage, handleChangePage, page, rowsPerPage } =
    props;

  const getSliceData = () => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple question table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeadStyles} align="left">
                Author
              </TableCell>
              <TableCell sx={tableHeadStyles} align="left">
                Topic
              </TableCell>
              <TableCell sx={tableHeadStyles} align="left">
                Answer amount
              </TableCell>
              <TableCell sx={tableHeadStyles} align="left">
                Tags
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getSliceData().map(info => (
              <TableRow
                key={info.question_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  <SmallLinkTitle href={info.owner.link}>
                    {info.owner.display_name}
                  </SmallLinkTitle>
                </TableCell>
                <TableCell align="left">
                  <SmallLinkTitle href={info.link}>{info.title}</SmallLinkTitle>
                </TableCell>
                <TableCell align="left">{info.answer_count}</TableCell>
                <TableCell align="left">
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {info.tags.map(tag => {
                      return <Tag key={tag}>{tag}</Tag>;
                    })}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default QuestionTable;
