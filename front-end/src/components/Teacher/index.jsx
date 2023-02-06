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
import {
  faLanguage,
  faGraduationCap,
  faSquarePhone,
  faComments,
  faSquareEnvelope,
} from '@fortawesome/free-solid-svg-icons';

// Components
import Loader from 'components/common/Loader/Loader';

// Constants
import { teacherPhoto, certificate, favourite, reward, speechBubble } from 'constants/photo';

// Services
import {
  createSubscription,
  deleteSubscription,
  getSubscriptionByQueries,
} from 'services/subscriptionService';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Styles
import styles from './Teacher.module.scss';

const Teacher = ({ teacher }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const teacherInformation =
    teacher.language && teacher.preferences && teacher.phone && teacher.biography;

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
      await fetchStudentSubscriptions(currentUser.role, currentUser.roleId);
      setButtonLoader(false);
      return subscribe;
    } catch (error) {
      return error;
    }
  };

  const fetchStudentSubscriptions = async (role, id) => {
    try {
      setIsLoader(true);
      const fetchedSubscriptions = await getSubscriptionByQueries({ role, id });
      setSubscriptions(fetchedSubscriptions);
    } catch (error) {
      return error;
    } finally {
      setIsLoader(false);
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
      return error;
    }
  };

  useEffect(() => {
    fetchStudentSubscriptions(currentUser.role, currentUser?.roleId);
  }, [currentUser]);

  useEffect(() => {
    teacherSubscription(subscriptions);
  }, [subscriptions, teacherSubscription]);

  const length = Object.keys(teacher).length;

  const getComponent = () => {
    if (isLoader) return <Loader />;
    if (length)
      return (
        <div className={styles.wrapper}>
          <div className={styles.contentWrap}>
            <div className={styles.imageWrap}>
              <img src={teacher.url ? teacher.url : teacherPhoto} alt='teacher' />
            </div>
          </div>
          <div className={styles.descriptionWrap}>
            <div className={styles.description}>
              <h1 className={styles.title}>{teacher.fullName}</h1>
              <span>{`${teacher.language || 'English'} teacher`}</span>
            </div>
          </div>
          <div className={styles.iconsAndEmailWrap}>
            <div className={styles.iconsWrap}>
              <FontAwesomeIcon icon={faFacebookF} />
              <FontAwesomeIcon icon={faTwitter} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faLinkedinIn} />
            </div>
            <div className={styles.shareWrap}>
              <FontAwesomeIcon icon={faSquareEnvelope} />
              <span>{teacher.email}</span>
            </div>
          </div>
          <div className={styles.infoWrap}>
            <div className={styles.info}>
              <img src={speechBubble} alt='speechBubble' />
              <span>533 Reviews</span>
            </div>
            <div className={styles.info}>
              <img src={favourite} alt='favourite' />
              <span>4.87 Rating</span>
            </div>
            <div className={styles.info}>
              <img src={reward} alt='reward' />
              <span>Top teacher</span>
            </div>
            <div className={styles.info}>
              <img src={certificate} alt='certificate' />
              <span>29 courses</span>
            </div>
          </div>
          <LoadingButton
            variant='contained'
            loading={buttonLoader}
            onClick={() => (isSubscripted ? deleteSubscriptionOfStudent() : patchSubscription())}
          >
            {isSubscripted ? 'unsubscribe' : 'subscribe'}
          </LoadingButton>
          {teacherInformation && (
            <>
              <div className={styles.teacherInfoWrap}>
                <div className={styles.blocksWrap}>
                  <div className={styles.block}>
                    <FontAwesomeIcon icon={faLanguage} />
                    <h2>Language</h2>
                    <p>{teacher.language}</p>
                  </div>
                  <div className={styles.block}>
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <h2>Students age</h2>
                    <p>{`${teacher.preferences} years old`}</p>
                  </div>
                  <div className={styles.block}>
                    <FontAwesomeIcon icon={faSquarePhone} />
                    <h2>Phone</h2>
                    <p>{teacher.phone}</p>
                  </div>
                </div>
              </div>
              <div className={`${styles.teacherInfoWrap} ${styles.margin}`}>
                <div className={styles.biographyBlock}>
                  <FontAwesomeIcon icon={faComments} />
                  <h2>Biography</h2>
                </div>
                <p className={styles.biography}>{teacher.biography}</p>
              </div>
            </>
          )}
        </div>
      );
  };

  return getComponent();
};

Teacher.propTypes = {
  teacher: PropTypes.shape({
    _id: PropTypes.string,
    url: PropTypes.string,
    phone: PropTypes.string,
    preferences: PropTypes.string,
    biography: PropTypes.string,
    language: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Teacher;
