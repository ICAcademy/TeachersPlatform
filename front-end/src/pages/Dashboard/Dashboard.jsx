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

import { STUDENT_ROLE } from 'constants/userRoles';
import { APPROVED } from 'constants/subscriptionStatuses';

const Dashboard = () => {
  const { approvedSubscriptions } = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();

  console.log(approvedSubscriptions);

  const {
    currentUser: { role, roleId },
  } = useContext(CurrentUserContext);

  useEffect(() => {
    socket.on('update_subscription', () => {
      dispatch(approvedSubscriptionsCount({ statusName: APPROVED, id: roleId }));
    });
  }, [roleId, dispatch]);

  return (
    <>
      <Banner />
      {role === STUDENT_ROLE && !approvedSubscriptions && <NoSubscriptions />}
      {role === STUDENT_ROLE && <Todo />}
      <UpcomingLessons />
    </>
  );
};

export default Dashboard;
