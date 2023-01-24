import React, { useContext, useEffect, useState } from 'react';

import Loader from 'components/common/Loader/Loader';
import NoSubscriptions from 'components/Dashboard/NoSubscriptions/NoSubscriptions';
import Todo from 'components/Dashboard/Todo/Todo';

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

  return isLoading ? (
    <Loader />
  ) : (
    subscriptions === 0 && (
      <>
        <NoSubscriptions />
        <Todo />
      </>
    )
  );
};

export default Dashboard;
