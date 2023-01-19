/* eslint-disable prettier/prettier */
import React, { useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// MUI library
import { LoadingButton } from '@mui/lab';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

// Components
import Loader from 'components/common/Loader/Loader';

// Constants
import { teacherPhoto, certificate, favourite, reward, speechBubble } from 'constants/photo';

// Services
import {
  createSubscription,
  deleteSubscription,
  getStudentSubscription,
} from 'services/subscriptionService';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Styles
import styles from './Teacher.module.scss';

const Teacher = ({ teacher }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const [isLoader, setIsLoader] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [isSubscripted, setIsSubscripted] = useState(false);

  const patchSubscription = async () => {
    try {
      setButtonLoader(true);
      const subscribe = await createSubscription(
        teacher._id,
        currentUser.roleId,
        currentUser.email,
        currentUser.fullName,
        teacher.fullName,
      );
      await fetchStudentSubscriptions(currentUser.roleId);
      setButtonLoader(false);
      return subscribe;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudentSubscriptions = async (userId) => {
    try {
      setIsLoader(true);
      const fetchedSubscriptions = await getStudentSubscription(userId);
      setSubscriptions(fetchedSubscriptions);
      setIsLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const teacherSubscription = useCallback(
    (fetchedSubscriptions) => {
      const subscripted = fetchedSubscriptions.find((subscription) => {
        return subscription.teacherID._id === teacher._id;
      });
      setIsSubscripted(subscripted);
    },
    [teacher._id],
  );

  const deleteSubscriptionOfStudent = async () => {
    try {
      setButtonLoader(true);
      const neededSubscription = subscriptions.find((subscription) => {
        return subscription.teacherID._id === teacher._id;
      });
      await deleteSubscription(neededSubscription._id);
      setIsSubscripted(false);
      setButtonLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudentSubscriptions(currentUser.roleId);
  }, [currentUser]);

  useEffect(() => {
    teacherSubscription(subscriptions);
  }, [subscriptions, teacherSubscription]);

  return (
    <div className={styles.wrapper}>
      {isLoader ? (
        <Loader />
      ) : (
        <>
          <div className={styles.contentWrap}>
            <div className={styles.iconsWrap}>
              <FontAwesomeIcon icon={faFacebookF} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faLinkedinIn} />
            </div>
            <div className={styles.imageWrap}>
              <img src={teacherPhoto} alt='teacher' />
            </div>
            <div className={styles.share}>
              <FontAwesomeIcon icon={faShareNodes} />
              <span>Report This Author</span>
            </div>
          </div>
          <div className={styles.description}>
            <h1>{teacher.fullName}</h1>
            <span>{`${teacher.language} teacher`}</span>
          </div>
          <div className={styles.additionalInfo}>
            <div className={styles.blockWrap}>
              <img src={speechBubble} alt='speechBubble' />
              <span>533 Reviews</span>
            </div>
            <div className={styles.blockWrap}>
              <img src={favourite} alt='favourite' />
              <span>4.87 Rating</span>
            </div>
            <div className={styles.blockWrap}>
              <img src={reward} alt='reward' />
              <span>Top teacher</span>
            </div>
            <div className={styles.blockWrap}>
              <img src={certificate} alt='certificate' />
              <span>29 courses</span>
            </div>
          </div>
          {isSubscripted ? (
            <LoadingButton
              loading={buttonLoader}
              variant='contained'
              onClick={deleteSubscriptionOfStudent}
            >
              unsubscribe
            </LoadingButton>
          ) : (
            <LoadingButton loading={buttonLoader} variant='contained' onClick={patchSubscription}>
              subscribe
            </LoadingButton>
          )}
          <div className={styles.teacherInfo}>
            <div>
              <div className={styles.test}>
                <h2>Languages:</h2>
                <p>{teacher.language}</p>
              </div>
              <div className={styles.test}>
                <h2>Age of students:</h2>
                <p>{teacher.preferences}</p>
              </div>
            </div>
            <h2>Biograpghy</h2>
            <p>{teacher.biography}</p>
            <div>
              <h2>Contacts</h2>
              <div>
                <div className={styles.test}>
                  <span>Phone</span>
                  <p>{teacher.phone}</p>
                </div>
                <div className={styles.test}>
                  <span>Email</span>
                  <p>{teacher.email}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Teacher.propTypes = {
  teacher: PropTypes.shape().isRequired,
};

export default Teacher;
