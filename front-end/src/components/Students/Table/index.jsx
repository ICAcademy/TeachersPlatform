/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { approvedActions } from 'store/approve-student-slice';
import { useSelector } from 'react-redux';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBellSlash } from '@fortawesome/free-solid-svg-icons';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Service
import { getTeachersSubscription, deleteSubscription } from 'services/subscriptionService';

// Components
import NoStudents from '../NoStudents';

// Images
import teacher from 'assets/images/teacher1.jpg';

// Styles
import styles from './Table.module.scss';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Table = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [subscriptions, setSubscriptions] = useState([]);

  const approved = useSelector((state) => state.approveStudent.approved);

  const dispatchFunction = useDispatch();

  const fetchSubscriptions = async (teacherId) => {
    try {
      const data = await getTeachersSubscription(teacherId);
      setSubscriptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSubscription = async (subscriptionId) => {
    try {
      await deleteSubscription(subscriptionId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproved = () => {
    dispatchFunction(approvedActions.approve(approved));
  };

  useEffect(() => {
    fetchSubscriptions(currentUser.roleId);
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
              <th>Date of birth</th>
              <th>Level</th>
              <th>Status</th>
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
                <td>{item?.studentID.dateOfBirth || '-'}</td>
                <td>{item?.studentID.level || '-'}</td>
                <td>
                  <IconButton
                    aria-label='approve'
                    color={approved ? 'success' : ''}
                    onClick={handleApproved}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton aria-label='reject'>
                    <CancelIcon />
                  </IconButton>
                </td>
                <td>
                  <button
                    className={styles.settingsBtn}
                    onClick={async () => {
                      handleDeleteSubscription(item._id);
                      await fetchSubscriptions('63a07859b66cae3e282cb573');
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
