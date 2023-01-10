import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

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
import Tabs from 'components/common/Tabs';
import Overview from 'components/Teacher/Overview';
import Courses from 'components/Teacher/Courses';
import Loader from 'components/common/Loader/Loader';
import { LoadingButton } from '@mui/lab';

// services
import {
  createSubscription,
  deleteSubscription,
  getStudentSubscription,
} from 'services/subscriptionService';

// context
import { CurrentUserContext } from 'context/AppProvider';

// Styles
import styles from './Teacher.module.scss';
import { teacher, certificate, favourite, reward, speechBubble } from 'constants/photo';

const Teacher = ({ fullName, activity, id, overview, courses }) => {
  const { pathname } = useLocation();
  const tabs = [
    { title: 'Overview', link: `/app/teachers/${id}/overview` },
    { title: 'Courses', link: `/app/teachers/${id}/courses` },
  ];
  const { currentUser } = useContext(CurrentUserContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isSubscripted, setIsSubscripted] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);

  const patchSubscription = async () => {
    try {
      setButtonLoader(true);
      const subscribe = await createSubscription(
        id,
        currentUser.roleId,
        currentUser.email,
        currentUser.fullName,
        fullName,
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
        return subscription.teacherID._id === id;
      });
      setIsSubscripted(subscripted);
    },
    [id],
  );

  const deleteSubscriptionOfStudent = async () => {
    try {
      setButtonLoader(true);
      const neededSubscription = subscriptions.find((subscription) => {
        return subscription.teacherID._id === id;
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
          <div className={styles.test}>
            <div className={styles.iconsWrap}>
              <FontAwesomeIcon icon={faFacebookF} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faLinkedinIn} />
            </div>
            <div className={styles.imageWrap}>
              <img src={teacher} alt='teacher' />
            </div>
            <div className={styles.share}>
              <FontAwesomeIcon icon={faShareNodes} />
              <span>Report This Author</span>
            </div>
          </div>
          <div className={styles.description}>
            <h1>{fullName}</h1>
            <span>{activity}</span>
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
              className={styles.subscribeBtn}
              loading={buttonLoader}
              variant='contained'
              onClick={deleteSubscriptionOfStudent}
            >
              unsubscribe
            </LoadingButton>
          ) : (
            <LoadingButton
              className={styles.subscribeBtn}
              loading={buttonLoader}
              variant='contained'
              onClick={patchSubscription}
            >
              subscribe
            </LoadingButton>
          )}
          <div className={styles.tabs}>
            <Tabs list={tabs} />
            {tabs?.find((tab) => tab.link === pathname)?.title === 'Overview' ? (
              <Overview biography={overview} />
            ) : (
              <Courses information={courses} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

Teacher.propTypes = {
  fullName: PropTypes.string,
  activity: PropTypes.string.isRequired,
  id: PropTypes.string,
  overview: PropTypes.string.isRequired,
  courses: PropTypes.string.isRequired,
};

Teacher.defaultProps = {
  fullName: '',
  id: '',
};

export default Teacher;
