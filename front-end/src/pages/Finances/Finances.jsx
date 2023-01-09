import React, { useContext } from 'react';

//Components
import Pricing from 'components/Pricing/Pricing';
import Transactions from 'components/Transactions/Transactions';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Constants
import { ADMIN_ROLE } from 'constants/userRoles';

const Finances = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <React.Fragment>
      <Pricing />
      {currentUser.role === ADMIN_ROLE && <Transactions />}
    </React.Fragment>
  );
};

export default Finances;
