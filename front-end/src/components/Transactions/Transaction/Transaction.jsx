import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Transaction.module.scss';
import Chip from '@mui/material/Chip';

const Transaction = ({ transaction }) => {
  const { transaction_id, end_date, amount, currency, description, status, dae } = transaction;

  const userData = JSON.parse(dae);

  return (
    <tr>
      <td>{transaction_id}</td>
      <td>{end_date}</td>
      <td>{amount + ' ' + currency}</td>
      <td>{userData.fullName}</td>
      <td>{userData.userId}</td>
      <td>
        <Chip className={styles.statusLabel} label={status} color='success' />
      </td>
    </tr>
  );
};

//propTypes
Transaction.propTypes = {
  transaction: PropTypes.object,
};
Transaction.defaultProps = {
  transaction: {},
};

export default Transaction;
