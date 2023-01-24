import React, { useContext, useEffect, useState } from 'react';

// components
import Banner from 'components/Dashboard/Banner/Banner';

// styles
import styles from './Dashboard.module.scss';

import NoSubscriptions from 'components/NoSubscriptions/NoSubscriptions';
import Loader from 'components/common/Loader/Loader';

import { CurrentUserContext } from 'context/AppProvider';

import { getSubscriptionsCountByStatus } from 'services/subscriptionService';
import { socket } from 'services/socketService';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentUser: { roleId },
  } = useContext(CurrentUserContext);

  const fetchSubscriptionsCount = async (id) => {
    try {
      setIsLoading(true);
      const response = await getSubscriptionsCountByStatus({ statusName: 'approved', id });
      setSubscriptions(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubscriptionsCount(roleId);
    socket.on('subscription:updated', (id) => id === roleId && fetchSubscriptionsCount(roleId));
  }, [roleId]);

  return (
    <div>
      <div className={styles.content}>
        <Banner />
      </div>
      <div>{isLoading ? <Loader /> : subscriptions === 0 && <NoSubscriptions />}</div>
    </div>
  );
};

export default Dashboard;
