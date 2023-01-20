/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// MUI library
import {
  Paper,
  Table as TableComponent,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TableFooter,
  TablePagination,
} from '@mui/material';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Components
import NoWords from 'components/Dictionary/NoWords';
import Loader from 'components/common/Loader/Loader';
import EditModal from 'components/Dictionary/EditModal';
import TablePaginationActions from 'components/Dictionary/Table/TablePaginationActions';

// Constants
const TABLE_HEADER_CELLS = ['Word', 'Translation', 'Settings'];

// Styles
import styles from './Table.module.scss';

const sx = {
  paper: {
    width: '560px',
    overflow: 'hidden',
    mb: 2.5,
    ['@media (max-width: 768px)']: { width: '100%' },
  },
  tableContainer: {
    width: '560px',
    ['@media (max-width: 768px)']: { width: '100%' },
  },
  tableHead: {
    '& th': {
      color: '#fff',
      backgroundColor: '#b464a6',
      fontSize: '17px',
      fontWeight: 500,
      height: '65px',
      fontFamily: 'Poppins-Regular, sans-serif',
    },
  },
  tableBody: {
    '& tr': {
      height: '55px',
      backgroundColor: '#fff',
    },
  },
};

const Table = ({ dictionary, isLoading, deleteWordById, updateDictionary, isTeacher }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dictionary?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const text = isTeacher
    ? 'Choose the student to add a word!'
    : 'You do not have any words... but you can create it above!';

  const getComponent = () => {
    if (isLoading) return <Loader />;
    if (dictionary.length === 0) return <NoWords text={text} />;
    return (
      <Paper sx={sx.paper}>
        <TableContainer sx={sx.tableContainer}>
          <TableComponent className={styles.root} stickyHeader aria-label='sticky table'>
            <TableHead sx={sx.tableHead}>
              <TableRow>
                {TABLE_HEADER_CELLS.map((item) => (
                  <TableCell key={item} align='center'>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={sx.tableBody}>
              {(rowsPerPage > 0
                ? dictionary.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : dictionary
              ).map((item) => (
                <TableRow key={item._id}>
                  <TableCell align='center'>{item?.word}</TableCell>
                  <TableCell align='center'>{item?.translation}</TableCell>
                  <TableCell align='center'>
                    <div className={styles.btnWrap}>
                      <EditModal
                        dictionary={item}
                        isLoading={isLoading}
                        updateDictionary={updateDictionary}
                      />
                      <IconButton aria-label='delete' onClick={() => deleteWordById(item._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 ? (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              ) : null}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={4}
                  count={dictionary?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </TableComponent>
        </TableContainer>
      </Paper>
    );
  };

  return getComponent();
};

Table.propTypes = {
  isLoading: PropTypes.bool,
  isTeacher: PropTypes.bool,
  dictionary: PropTypes.array.isRequired,
  deleteWordById: PropTypes.func.isRequired,
  updateDictionary: PropTypes.func.isRequired,
};

Table.defaultProps = {
  isLoading: false,
  isTeacher: false,
};

export default Table;
