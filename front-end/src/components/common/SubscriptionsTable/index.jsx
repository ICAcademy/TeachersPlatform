/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// MUI library
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

// Assets
import avatar from 'assets/images/avatar.jpeg';

// Components
import TablePaginationActions from 'components/common/SubscriptionsTable/TablePaginationActions';

// Styles
import styles from './SubscriptionsTable.module.scss';

const SubscriptionsTable = ({ subscriptions, role, deleteSubscriptionById }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subscriptions.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={styles.container}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead
          sx={{
            '& th': {
              color: 'white',
              backgroundColor: '#a968a3',
              fontSize: 16,
              fontWeight: 500,
            },
          }}
        >
          <TableRow>
            <TableCell sx={{ maxWidth: 65 }} align='center'>
              Avatar
            </TableCell>
            <TableCell align='center'>Full Name</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>Day of birth</TableCell>
            <TableCell align='center'>Level</TableCell>
            <TableCell align='center'>Following</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? subscriptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : subscriptions
          ).map((subscription) => (
            <TableRow
              key={subscription._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                <div className={styles.avatarContainer}>
                  <img className={styles.img} src={avatar} />
                </div>
              </TableCell>
              <TableCell align='center'>
                {role === 'student'
                  ? subscription.teacherID.fullName
                  : subscription.studentID.fullName}
              </TableCell>
              <TableCell align='center'>
                {role === 'student' ? subscription.teacherID.email : subscription.studentID.email}
              </TableCell>
              <TableCell align='center'>
                {role === 'student'
                  ? subscription.teacherID.dateOfBirth
                  : subscription.studentID.dateOfBirth}
              </TableCell>
              <TableCell align='center'>
                {role === 'student'
                  ? subscription.teacherID.level || '-'
                  : subscription.studentID.level || '-'}
              </TableCell>
              <TableCell justify='center' align='center'>
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => deleteSubscriptionById(subscription._id)}
                >
                  Unsubscribe
                </Button>
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
              count={subscriptions.length}
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
  );
};

SubscriptionsTable.propTypes = {
  subscriptions: PropTypes.array,
  deleteSubscriptionById: PropTypes.func,
};

export default SubscriptionsTable;
