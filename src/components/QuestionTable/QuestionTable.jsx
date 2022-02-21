import React, { useState } from 'react';
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
import SmallTitle from '../SmallTitle/SmallTitle';
import TablePagination from '@mui/material/TablePagination';
import Avatar from '../Avatar/Avatar';

const tableHeadStyles = {
  backgroundColor: 'var(--color-orange)',
  color: 'var(--color-white)',
};

const QuestionTable = props => {
  const { data, onFastViewOpen, extraStyles = {} } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getPortion = () => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} sx={extraStyles}>
        <Table aria-label="simple question table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeadStyles} align="center">
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
            {getPortion().map(info => (
              <TableRow
                key={info.question_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  align="center"
                  onClick={() =>
                    onFastViewOpen({
                      type: 'author',
                      userId: info.owner.user_id,
                      userName: info.owner.display_name,
                    })
                  }
                >
                  <Avatar
                    src={info.owner.profile_image}
                    alt={info.owner.display_name}
                    extraStyles={{ marginBottom: '5px' }}
                  />
                  <SmallTitle>{info.owner.display_name}</SmallTitle>
                </TableCell>
                <TableCell align="left">
                  <SmallLinkTitle href={info.link}>{info.title}</SmallLinkTitle>
                </TableCell>
                <TableCell align="left">{info.answer_count}</TableCell>
                <TableCell align="left">
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {info.tags.map(tag => {
                      return (
                        <Tag
                          key={tag}
                          onTagClick={() =>
                            onFastViewOpen({ type: 'tag', tag })
                          }
                        >
                          {tag}
                        </Tag>
                      );
                    })}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
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
