import React, { useCallback, useContext, useEffect, useState } from 'react';

// components
import Banner from 'components/Dashboard/Banner/Banner';
import Loader from 'components/common/Loader/Loader';
import NoSubscriptions from 'components/Dashboard/NoSubscriptions/NoSubscriptions';
import Todo from 'components/Dashboard/Todo/Todo';
import UpcomingLessons from 'components/Dashboard/UpcomingLessons/UpcomingLessons';

import { CurrentUserContext } from 'context/AppProvider';

import { getSubscriptionByQueries } from 'services/subscriptionService';
import { socket } from 'services/socketService';

// constants
import { STUDENT_ROLE } from 'constants/userRoles';
import { APPROVED } from 'constants/subscriptionStatuses';

// styles
import styles from './Dashboard.module.scss';

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
        const response = await getSubscriptionByQueries({ statusName: APPROVED, id });
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
    <div>
      <Banner />
      <div className={styles.info}>
        {role === STUDENT_ROLE && subscriptions === 0 ? (
          <NoSubscriptions />
        ) : (
          <div className={styles.info}>
            <div className={styles.todoContainer}>
              <Todo />
            </div>
            <div className={styles.upcomingLessonsContainer}>
              <UpcomingLessons />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
