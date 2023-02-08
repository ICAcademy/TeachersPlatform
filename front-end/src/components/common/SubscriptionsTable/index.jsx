/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import SubscriptionItem from './SubscriptionItem/SubscriptionItem';

// Styles
import styles from './SubscriptionsTable.module.scss';
import { getLevels } from 'services/MaterialsService/MaterialsService';

const SubscriptionsTable = ({ subscriptions, role, deleteSubscriptionById }) => {
  const [levels, setLevels] = useState([]);

  const fetchLevels = async () => {
    try {
      const levels = await getLevels();
      setLevels(levels);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
    <div className={styles.subscriptionsTable}>
      {subscriptions.map((subscription) => (
        <SubscriptionItem
          key={subscription._id}
          role={role}
          subscription={subscription}
          onDelete={deleteSubscriptionById}
          levels={levels}
        />
      ))}
    </div>
  );
};

SubscriptionsTable.propTypes = {
  subscriptions: PropTypes.array,
  deleteSubscriptionById: PropTypes.func,
};

export default SubscriptionsTable;
