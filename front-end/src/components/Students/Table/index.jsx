import React, { useEffect, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Service
import { getTeachersSubscription, deleteSubscription } from 'services/subscriptionService';

// Components
import NoStudents from '../NoStudents';
import ChangeLevel from 'components/ChangeLevel/ChangeLevel';

// Images
import teacher from 'assets/images/teacher1.jpg';

// Styles
import styles from './Table.module.scss';
import { Menu, MenuItem } from '@mui/material';

const Table = () => {
  const {
    currentUser: { roleId },
  } = useContext(CurrentUserContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemIdx, setSelectedItemIdx] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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

  useEffect(() => {
    fetchSubscriptions(roleId);
  }, [roleId]);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemIdx(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIsClose = useCallback(() => setIsOpen(false), []);

  const updateSubscriptions = (subscription) => {
    const updatedList = subscriptions.map((item) => {
      return item.studentID._id === subscription._id ? { ...item, studentID: subscription } : item;
    });
    setSubscriptions(updatedList);
  };

  const handleClickDeleteSubscriptions = (id) => {
    async () => {
      handleDeleteSubscription(id);
      await fetchSubscriptions(roleId);
    };
  };

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
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((item) => {
              return (
                <tr key={item?.studentID._id}>
                  <td>
                    <img src={teacher} alt='teacher' />
                  </td>
                  <td>{item?.studentID.fullName}</td>
                  <td>{item?.studentID.email}</td>
                  <td>{item?.studentID.dateOfBirth || '-'}</td>
                  <td>{item?.studentID.level || '-'}</td>
                  <td>
                    <button
                      className={styles.settingsBtn}
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(event) => handleClick(event, item.studentID._id)}
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                    <Menu
                      id='basic-menu'
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleClickDeleteSubscriptions(item._id)}>
                        Delete subscription
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      >
                        Change Level
                      </MenuItem>
                      <ChangeLevel
                        isOpen={isOpen}
                        handleIsClose={handleIsClose}
                        selectedIdx={selectedItemIdx}
                        updateHandler={updateSubscriptions}
                      />
                    </Menu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <NoStudents />
      )}
    </div>
  );
};

Table.propTypes = {
  isOpen: PropTypes.bool,
  handleIsClose: PropTypes.func,
};

export default Table;
