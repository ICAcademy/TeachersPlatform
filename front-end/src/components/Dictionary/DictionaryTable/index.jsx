/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// MUI library
import {
  Paper,
  Table,
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
import TablePaginationActions from 'components/Dictionary/DictionaryTable/TablePaginationActions';

// Styles
import styles from './DictionaryTable.module.scss';

const sx = {
  paper: { width: '560px', overflow: 'hidden', my: 2.5 },
  tableContainer: { width: '560px' },
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

const DictionaryTable = ({ dictionary, isLoading, deleteWordById, updateDictionary }) => {
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

  const tableHeaderCells = ['Word', 'Translation', 'Settings'];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : dictionary.length ? (
        <Paper sx={sx.paper}>
          <TableContainer sx={sx.tableContainer}>
            <Table className={styles.root} stickyHeader aria-label='sticky table'>
              <TableHead sx={sx.tableHead}>
                <TableRow>
                  {tableHeaderCells?.map((item, i) => (
                    <TableCell key={i} align='center'>
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
                  <TableRow key={item?._id}>
                    <TableCell align='center'>{item?.word}</TableCell>
                    <TableCell align='center'>{item?.translation}</TableCell>
                    <TableCell align='center'>
                      <div className={styles.btnWrap}>
                        <EditModal
                          dictionary={item}
                          isLoading={isLoading}
                          updateDictionary={updateDictionary}
                        />
                        <IconButton aria-label='delete' onClick={() => deleteWordById(item?._id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
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
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <NoWords />
      )}
    </>
  );
};

DictionaryTable.propTypes = {
  isLoading: PropTypes.bool,
  dictionary: PropTypes.array.isRequired,
  updateDictionary: PropTypes.func.isRequired,
  deleteWordById: PropTypes.func.isRequired,
};

DictionaryTable.defaultProps = {
  isLoading: false,
};

export default DictionaryTable;
