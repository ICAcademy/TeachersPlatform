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
  console.log('user', user);
  console.log('teachers', teachers);
  console.log('subscriptions', subscriptions);

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
      fetchSubscriptions();
      return await createSubscription({ teacher, student });
    } catch (e) {
      console.log('error', e);
    }
  };

  const checkSubscribe = (name) => {
    return subscriptions.some((subscription) => {
      return subscription.teacherFullName === name;
    });
  };

  const deleteSubscriptionById = async (id) => {
    try {
      fetchSubscriptions();
      return await deleteSubscription(id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.teachersContainer}>
          {teachers.map((teacher) => {
            return (
              <div className={styles.teacherContainer} key={teacher._id}>
                <div>{teacher.fullName}</div>
                {checkSubscribe(teacher.fullName) ? (
                  <Button>Unsubscribe</Button>
                ) : (
                  <Button onClick={() => subscription(teacher, user)}>Subscribe</Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentSubscriptions;
