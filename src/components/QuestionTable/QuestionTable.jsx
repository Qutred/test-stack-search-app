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
import SmallTitle from '../SmallTitle/SmallTitle';
import TablePagination from '@mui/material/TablePagination';
import Avatar from '../Avatar/Avatar';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const tableHeadStyles = {
  backgroundColor: 'var(--color-orange)',
  color: 'var(--color-white)',
};

const FadeIn = keyframes`
  0% {
    opacity:0;
  }
  50% {
    opacity:0.5;
  }
  100% {
    opacity:1;
  }
`;

const StyledTable = styled.div`
  animation: ${FadeIn} 500ms ease forwards;
`;

const QuestionTable = props => {
  const {
    page,
    pageSize,
    handleChangePage,
    handleChangePageSize,
    data,
    onFastViewOpen,
    extraStyles = {},
    sortBlock,
  } = props;

  console.log(sortBlock);
  return (
    <StyledTable>
      {sortBlock && sortBlock}
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
            {data.items.length &&
              data.items.map(info => (
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
                    <SmallLinkTitle href={info.link}>
                      {info.title}
                    </SmallLinkTitle>
                  </TableCell>
                  <TableCell align="left">{info.answer_count}</TableCell>
                  <TableCell align="left">
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
                    >
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
        count={Math.floor(data.total / pageSize)}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangePageSize}
      />
    </StyledTable>
  );
};

export default QuestionTable;
