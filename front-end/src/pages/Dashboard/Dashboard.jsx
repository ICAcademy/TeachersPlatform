import React, { useContext, useEffect } from 'react';

// components
import Banner from 'components/Dashboard/Banner/Banner';
import Loader from 'components/common/Loader/Loader';
import NoSubscriptions from 'components/Dashboard/NoSubscriptions/NoSubscriptions';
import Todo from 'components/Dashboard/Todo/Todo';
import UpcomingLessons from 'components/Dashboard/UpcomingLessons/UpcomingLessons';

import { CurrentUserContext } from 'context/AppProvider';
import { ApprovedSubscriptionsContext } from 'context/ApprovedSubscriptionsProvider';

import { socket } from 'services/socketService';

// constants
import { STUDENT_ROLE } from 'constants/userRoles';
import { APPROVED } from 'constants/subscriptionStatuses';

// styles
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { subscriptionsCount, fetchSubscriptionsCount, isLoading } = useContext(
    ApprovedSubscriptionsContext,
  );

  const {
    currentUser: { roleId, role },
  } = useContext(CurrentUserContext);

  useEffect(() => {
    role === STUDENT_ROLE && fetchSubscriptionsCount(roleId);
  }, [fetchSubscriptionsCount, role, roleId]);

  useEffect(() => {
    socket.on('subscription:updated', (subscription) => {
      if (subscription.studentID === roleId) {
        if (
          (subscription.status === APPROVED && subscriptionsCount === 0) ||
          (subscription.status !== APPROVED && subscriptionsCount === 1)
        ) {
          fetchSubscriptionsCount(roleId);
        }
      }
    });

    return () => socket.off('subscription:updated');
  }, [roleId, fetchSubscriptionsCount, subscriptionsCount]);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Banner />
      <div className={styles.info}>
        {role === STUDENT_ROLE && subscriptionsCount === 0 ? (
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
