import React from 'react';
import { useNavigate } from 'react-router';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './TopicsBody.module.scss';

const TopicsBody = ({ topics }) => {
  const navigate = useNavigate();

  const topicsList = topics.map((item, i) => (
    <div className={styles.topic} key={item._id}>
      <div className={styles.topic__index}>{i + 1}</div>
      <p className={styles.topic__title}>{item.topic}</p>
      <FontAwesomeIcon icon={faArrowRight} />
    </div>
  ));

  return (
    <>
      <div className={styles.section__head}>
        <h3>Topics</h3>
        <div className={styles.section__backBtn} onClick={() => navigate(-1)}>
          Back to units
        </div>
      </div>
      <div className={styles.section__body}>{topicsList}</div>
    </>
  );
};

TopicsBody.propTypes = {
  topics: PropTypes.array,
};

TopicsBody.defaultProps = {
  topics: [],
};

export default TopicsBody;
