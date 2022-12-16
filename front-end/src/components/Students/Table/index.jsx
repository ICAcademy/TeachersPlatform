/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useEffect, useState, useContext } from 'react';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBellSlash } from '@fortawesome/free-solid-svg-icons';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Service
import { subscriptionService } from 'services/subscriptionService';

// Components
import NoStudents from '../NoStudents';

// Images
import teacher from 'assets/images/teacher1.jpg';

// Styles
import styles from './Table.module.scss';

const Table = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [subscriptions, setSubscriptions] = useState([]);

  const fetchSubscriptions = async (teacherId) => {
    try {
      const data = await subscriptionService.getTeachersSubscription(teacherId);
      setSubscriptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubscription = async (subscriptionId) => {
    try {
      await subscriptionService.deleteSubscription(subscriptionId);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(subscriptions);

  useEffect(() => {
    fetchSubscriptions('639c4299f0293017e7253dc1');
  }, [currentUser]);

  return (
    <div className={styles.wrapper}>
      {subscriptions.length ? (
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Full name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Level</th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((item) => (
              <tr key={item?.studentID._id}>
                <td>
                  <img src={teacher} alt='teacher' />
                </td>
                <td>{item?.studentID.fullName}</td>
                <td>{item?.studentID.email}</td>
                <td>{item?.studentID.age || '-'}</td>
                <td>{item?.studentID.level || '-'}</td>
                <td>
                  <button
                    className={styles.settingsBtn}
                    onClick={async () => {
                      deleteSubscription(item._id);
                      await fetchSubscriptions('639c4299f0293017e7253dc1');
                    }}
                  >
                    <FontAwesomeIcon icon={faBellSlash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoStudents />
      )}
    </div>
  );
};

export default Table;
