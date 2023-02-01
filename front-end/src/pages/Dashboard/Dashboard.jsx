import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Banner from 'components/Dashboard/Banner/Banner';
import NoSubscriptions from 'components/Dashboard/NoSubscriptions/NoSubscriptions';
import Todo from 'components/Dashboard/Todo/Todo';
import UpcomingLessons from 'components/Dashboard/UpcomingLessons/UpcomingLessons';

import { CurrentUserContext } from 'context/AppProvider';

import { socket } from 'services/socketService';
import { approvedSubscriptionsCount } from 'store/subscriptions-slice';

// constants
import { STUDENT_ROLE } from 'constants/userRoles';
import { APPROVED } from 'constants/subscriptionStatuses';

// styles
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { approvedSubscriptions } = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();

  const {
    currentUser: { role, roleId },
  } = useContext(CurrentUserContext);

  useEffect(() => {
    socket.on('update_subscription', () => {
      dispatch(approvedSubscriptionsCount({ statusName: APPROVED, id: roleId }));
    });
  }, [roleId, dispatch]);

  return (
    <div className={styles.content}>
      <Banner />
      <div className={styles.info}>
        <div className={styles.todoContainer}>
          <Todo />
        </div>
        {role === STUDENT_ROLE && approvedSubscriptions === 0 ? (
          <NoSubscriptions />
        ) : (
          <div className={styles.upcomingLessonsContainer}>
            <UpcomingLessons />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
