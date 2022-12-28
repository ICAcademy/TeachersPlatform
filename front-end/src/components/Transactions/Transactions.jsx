import React, { useState, useEffect } from 'react';

//Components
import Transaction from './Transaction/Transaction';

//Styles
import styles from './Transactions.module.scss';

//Services
import { getAllTransactions } from 'services/transactionService';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async () => {
    try {
      const transactions = await getAllTransactions();
      setTransactions(transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  console.log(transactions);

  return (
    <div className={styles.transactionsTable}>
      <div className={styles.transactionsHeader}>
        <h4>Transactions List</h4>
        <p className={styles.subtitle}>Export Invoice List to Copy, CSV, Excel, PDF & Print</p>
      </div>
      <div className={styles.transactionsBody}>
        <table>
          <thead>
            <tr className={styles.headerRow}>
              <th>Trasaction ID</th>
              <th>Transaction Date</th>
              <th>Ammount</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
            {transactions.map((transaction) => (
              <Transaction key={transaction._id} transaction={transaction} />
            ))}
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
