import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Transaction.module.scss';
import Chip from '@mui/material/Chip';

const Transaction = ({ transaction }) => {
  const { transaction_id, end_date, amount, currency, status, dae } = transaction;

  const userData = JSON.parse(dae);

  // Format timestamp date
  const cutDate = end_date.substring(0, 10);
  const date = new Date(cutDate * 1000);
  const formattedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

  const amountWithCurrency = amount + ' ' + currency;
  const statusLabel = <Chip className={styles.statusLabel} label={status} color='success' />;

  const transactionData = [
    transaction_id,
    formattedDate,
    amountWithCurrency,
    userData.fullName,
    userData.userId,
    userData.teacher,
    statusLabel,
  ];

  return (
    <tr>
      {transactionData.map((item, index) => (
        <td key={index}>{item}</td>
      ))}
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
