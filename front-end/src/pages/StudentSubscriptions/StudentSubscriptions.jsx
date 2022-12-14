import Loader from 'components/common/Loader/Loader';
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from 'context/AppProvider';
import { deleteSubscription, getAllUserSubscriptions } from 'services/subscriptionService';

// styles
import styles from './StudentSubscriptions.module.scss';
import StudentTable from 'components/StudentSubscriptions/StudentTable/StudentTable';

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
      const subscriptions = await getAllUserSubscriptions(id);
      setSubscriptions(subscriptions);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteSubscriptionById = async (id) => {
    try {
      let subId = 0;
      subscriptions.forEach((subscription) => {
        if (subscription.teacherID === id) {
          subId = subscription._id;
        }
      });
      const remove = await deleteSubscription(subId);
      fetchSubscriptions(currentUser.roleId);
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
        <StudentTable
          subscriptions={subscriptions}
          deleteSubscriptionById={deleteSubscriptionById}
        />
      )}
    </div>
  );
};

export default StudentSubscriptions;
