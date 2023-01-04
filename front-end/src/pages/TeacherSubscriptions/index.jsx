import React, { useEffect, useState, useContext } from 'react';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Service
import { getTeachersSubscription, deleteSubscription } from 'services/subscriptionService';

// Components
import SubscriptionsTable from 'components/common/SubscriptionsTable';
import Loader from 'components/common/Loader/Loader';
import NoSubscriptions from 'components/common/NoSubscriptions';

// Styles
import styles from './TeacherSubscriptions.module.scss';

const TeacherSubscriptions = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubscriptions = async (teacherId) => {
    try {
      setIsLoading(true);
      const data = await getTeachersSubscription(teacherId);
      setSubscriptions(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteSubscriptionById = async (id) => {
    try {
      setIsLoading(true);
      const necessarySubscription = subscriptions.find((subscription) => {
        return subscription._id === id;
      });
      const remove = await deleteSubscription(necessarySubscription._id);
      await fetchSubscriptions(currentUser.roleId);
      setIsLoading(false);
      return remove;
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    <Loader />;
  }

  useEffect(() => {
    fetchSubscriptions(currentUser?.roleId);
  }, [currentUser]);

  return (
    <div className={styles.wrapper}>
      {subscriptions.length ? (
        <SubscriptionsTable
          subscriptions={subscriptions}
          role={currentUser?.role}
          deleteSubscriptionById={deleteSubscriptionById}
        />
      ) : (
        <NoSubscriptions subscribeTo='student' />
      )}
    </div>
  );
};

export default TeacherSubscriptions;
