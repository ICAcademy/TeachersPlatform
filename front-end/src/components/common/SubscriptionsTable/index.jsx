/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

// Components
import SubscriptionItem from './SubscriptionItem/SubscriptionItem';

// Styles
import styles from './SubscriptionsTable.module.scss';

const SubscriptionsTable = ({ subscriptions, role, deleteSubscriptionById }) => {
  return (
    <div className={styles.subscriptionsTable}>
      {subscriptions.map((subscription) => (
        <SubscriptionItem
          key={subscription._id}
          role={role}
          subscription={subscription}
          onDelete={deleteSubscriptionById}
        ></SubscriptionItem>
      ))}
    </div>
  );
};

SubscriptionsTable.propTypes = {
  subscriptions: PropTypes.array,
  deleteSubscriptionById: PropTypes.func,
};

export default SubscriptionsTable;
