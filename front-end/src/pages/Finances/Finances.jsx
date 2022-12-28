import React from 'react';

//Components
import FinancesCard from './FinancesCard/FinancesCard';
import Transactions from 'components/Transactions/Transactions';

//Styles
import styles from './Finances.module.scss';

const Finances = () => {
  return (
    <React.Fragment>
      <div className={styles.finances}>
        <FinancesCard />
      </div>
      <Transactions />
    </React.Fragment>
  );
};

export default Finances;
