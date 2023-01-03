import React, { useState, useEffect, useRef, useCallback } from 'react';

// Libraries for export table in different formats
import { CSVLink } from 'react-csv';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Components
import Transaction from './Transaction/Transaction';

// Styles
import styles from './Transactions.module.scss';

// Services
import { getAllTransactions } from 'services/transactionService';

const Transactions = () => {
  const [transactions, setTransactions] = useState('');

  const [page, setPage] = useState(1);

  const [pageCount, setPageCount] = useState(0);

  const tableRef = useRef(null);

  const getTransactions = useCallback(async () => {
    try {
      const transactions = await getAllTransactions(page);
      setTransactions(transactions);
      if (transactions) {
        setPageCount(transactions.pagination.pageCount);
      }
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  const handlePrev = () => {
    setPage((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  };

  const handleNext = () => {
    setPage((prev) => {
      console.log(prev);
      if (prev === pageCount) return prev;
      return prev + 1;
    });
  };

  const changePageHandle = (event) => {
    setPage(+event.target.textContent);
  };

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const exportPDF = () => {
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'portrait';

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = 'Transactions';
    const headers = [
      ['Transaction ID', 'Transaction Date', 'Amount', 'User', 'User ID', 'Teacher', 'Status'],
    ];

    const data = transactions.items.map((item) => {
      const userData = JSON.parse(item.dae);
      return [
        item.transaction_id,
        item.end_date,
        item.amount + item.currency,
        userData.fullName,
        userData.userId,
        userData.teacher,
        item.status,
      ];
    });

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('transactions.pdf');
  };

  const transactionsList =
    transactions &&
    transactions.items.length > 0 &&
    transactions.items.map((transaction) => (
      <Transaction key={transaction._id} transaction={transaction} />
    ));

  const noTransactions = transactions.length === 0 && (
    <tr className={styles.noTransactions}>
      <td colSpan='5'>There have been no transactions yet</td>
    </tr>
  );

  return (
    <div className={styles.transactionsTable}>
      <div className={styles.transactionsHeader}>
        <h4>Transactions List</h4>
        <p className={styles.subtitle}>Export Invoice List to Copy, CSV, Excel, PDF & Print</p>
      </div>
      <div className={styles.buttonGroup}>
        <CSVLink data={transactions && transactions.items} className={styles.buttonItem}>
          CSV
        </CSVLink>
        <DownloadTableExcel
          filename='transactions table'
          sheet='users'
          currentTableRef={tableRef.current}
        >
          <a className={styles.buttonItem}>Excel</a>
        </DownloadTableExcel>
        <a className={styles.buttonItem} onClick={exportPDF}>
          PDF
        </a>
      </div>
      <div className={styles.transactionsBody}>
        <table ref={tableRef}>
          <thead>
            <tr className={styles.headerRow}>
              <th>Trasaction ID</th>
              <th>Transaction Date</th>
              <th>Ammount</th>
              <th>User</th>
              <th>User ID</th>
              <th>Teacher</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionsList}
            {noTransactions}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <ul className={styles.paginationList}>
            <li className={page === 1 ? styles.disabled : ''} onClick={handlePrev}>
              Previous
            </li>
            {Array(pageCount)
              .fill()
              .map((_, index) => {
                return (
                  <li
                    key={index}
                    className={page == index + 1 ? styles.active : ''}
                    data-index={index + 1}
                    onClick={changePageHandle}
                  >
                    {index + 1}
                  </li>
                );
              })}
            <li className={page === pageCount ? styles.disabled : ''} onClick={handleNext}>
              Next
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
