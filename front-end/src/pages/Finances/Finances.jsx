import React, { useState, useEffect, useContext } from 'react';

//Components
import FinancesCard from 'components/Finances/FinancesCard/FinancesCard';
import Transactions from 'components/Transactions/Transactions';

// Context
import { CurrentUserContext } from 'context/AppProvider';

//Styles
import styles from './Finances.module.scss';

//Services
import { getAllPricing } from 'services/pricingService';

const Finances = () => {
  const [pricing, setPricing] = useState([]);
  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);

  const getPricing = async () => {
    try {
      const pricing = await getAllPricing();
      setPricing(pricing);
    } catch (error) {
      console.log(error);
    }
  };

  const userData = {
    userId: currentUser._id,
    fullName: currentUser.fullName,
  };

  useEffect(() => {
    getPricing();
  }, []);

  const pricingCards = isAuthenticated && currentUser.role === 'admin' && (
    <div className={styles.finances}>
      {pricing.map((item) => (
        <FinancesCard key={item._id} pricing={item} user={userData} />
      ))}
    </div>
  );

  return (
    <React.Fragment>
      {pricingCards}
      {isAuthenticated && currentUser.role === 'admin' && <Transactions />}
    </React.Fragment>
  );
};

export default Finances;
