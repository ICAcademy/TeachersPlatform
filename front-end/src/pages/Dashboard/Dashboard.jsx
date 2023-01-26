import React, { useCallback, useContext, useEffect, useState } from 'react';

import Loader from 'components/common/Loader/Loader';
import NoSubscriptions from 'components/Dashboard/NoSubscriptions/NoSubscriptions';
import Todo from 'components/Dashboard/Todo/Todo';
import UpcomingLessons from 'components/Dashboard/UpcomingLessons/UpcomingLessons';

import { CurrentUserContext } from 'context/AppProvider';

import { getSubscriptionsCountByStatus } from 'services/subscriptionService';
import { socket } from 'services/socketService';

import { STUDENT_ROLE } from 'constants/userRoles';
import { APPROVED } from 'constants/subscriptionStatuses';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentUser: { roleId, role },
  } = useContext(CurrentUserContext);

  const fetchSubscriptionsCount = useCallback(
    async (id = roleId) => {
      try {
        setIsLoading(true);
        const response = await getSubscriptionsCountByStatus({ statusName: APPROVED, id });
        setSubscriptions(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [roleId],
  );

  useEffect(() => {
    role === STUDENT_ROLE && fetchSubscriptionsCount();
  }, [fetchSubscriptionsCount, role]);

  useEffect(() => {
    socket.on('subscription:updated', (id) => id === roleId && fetchSubscriptionsCount(roleId));
  }, [roleId, fetchSubscriptionsCount]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {role === STUDENT_ROLE && subscriptions === 0 && <NoSubscriptions />}
      {role === STUDENT_ROLE && <Todo />}
      <UpcomingLessons />
    </>
  );
};

export default Dashboard;
