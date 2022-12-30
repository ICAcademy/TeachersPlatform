import React, { useState, useEffect, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

//Components
import Transaction from './Transaction/Transaction';

//Styles
import styles from './Transactions.module.scss';

//Services
import { getAllTransactions } from 'services/transactionService';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const tableRef = useRef(null);

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

  const exportPDF = () => {
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'portrait';

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = 'Transactions';
    const headers = [['Transaction ID', 'Transaction Date', 'Amount', 'User', 'User ID', 'Status']];

    const data = transactions.map((item) => [
      item.transaction_id,
      item.end_date,
      item.amount + item.currency,
      item.description,
      item.status,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('report.pdf');
  };

  const transactionsList =
    transactions.length > 0 &&
    transactions.map((transaction) => (
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
        <CSVLink data={transactions} className={styles.buttonItem}>
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionsList}
            {noTransactions}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
