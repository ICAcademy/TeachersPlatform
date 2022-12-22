import Loader from 'components/common/Loader/Loader';
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from 'context/AppProvider';
import { deleteSubscription, getStudentSubscription } from 'services/subscriptionService';

// styles
import styles from './StudentSubscriptions.module.scss';
import TeacherTable from 'components/StudentSubscriptions/TeacherTable/TeacherTable';

const StudentSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    fetchSubscriptions(currentUser.roleId);
  }, [currentUser]);

  const fetchSubscriptions = async (id) => {
    try {
      setIsLoading(true);
      const subscriptions = await getStudentSubscription(id);
      setSubscriptions(subscriptions);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
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
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <TeacherTable
          subscriptions={subscriptions}
          deleteSubscriptionById={deleteSubscriptionById}
        />
      )}
    </div>
  );
};

export default StudentSubscriptions;
