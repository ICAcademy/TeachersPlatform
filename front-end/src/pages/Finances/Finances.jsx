import React, { useContext } from 'react';

//Components
import Pricing from 'components/Pricing/Pricing';
import Transactions from 'components/Transactions/Transactions';

// Context
import { CurrentUserContext } from 'context/AppProvider';

const Finances = () => {
  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);

  return (
    <React.Fragment>
      <Pricing />
      {isAuthenticated && currentUser.role === 'admin' && <Transactions />}
    </React.Fragment>
  );
};

export default Finances;
