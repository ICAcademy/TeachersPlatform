import { Button } from '@mui/material';
import Loader from 'components/common/Loader/Loader';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
} from 'services/subscriptionService';
import { getTeachers } from 'services/teachersService';
import { userService } from 'services/userService';

// styles
import styles from './StudentSubscriptions.module.scss';

const StudentSubscriptions = () => {
  const [user, setUser] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchUser = async () => {
    try {
      const user = await userService.getUser();
      setUser(user.data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchTeachers = async () => {
    try {
      setIsLoading(true);
      const teachers = await getTeachers();
      setTeachers(teachers);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const subscriptions = await getAllSubscriptions();
      setSubscriptions(subscriptions);
    } catch (e) {
      console.log(e);
    }
  };

  const subscription = async (teacher, student) => {
    try {
      const create = await createSubscription({ teacher, student });
      fetchSubscriptions();
      return create;
    } catch (e) {
      console.log('error', e);
    }
  };

  const checkSubscribe = (id) => {
    return subscriptions.some((subscription) => {
      return subscription.teacherID === id;
    });
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
      fetchSubscriptions();
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
        <div className={styles.teachersContainer}>
          {teachers.map((teacher) => {
            return (
              <div className={styles.teacherContainer} key={teacher._id}>
                <div className={styles.teacherInfo}>
                  <div className={styles.teacherNameContainer}>{teacher.fullName}</div>
                  <div className={styles.subscribeAndUnsubscribeContainer}>
                    {checkSubscribe(teacher._id) ? (
                      <Button
                        variant='contained'
                        size='small'
                        onClick={() => deleteSubscriptionById(teacher._id)}
                      >
                        Unsubscribe
                      </Button>
                    ) : (
                      <Button
                        variant='contained'
                        size='small'
                        onClick={() => subscription(teacher, user)}
                      >
                        Subscribe
                      </Button>
                    )}
                  </div>
                </div>
                <div className={styles.photoContainer}>
                  <img
                    className={styles.photo}
                    src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg'
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentSubscriptions;
