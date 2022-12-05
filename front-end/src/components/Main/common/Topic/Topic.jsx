import React from 'react';
import PropTypes from 'prop-types';

// styles
import styles from './Topic.module.scss';

const Topic = ({ topic }) => {
  return <span className={styles.topic}>{topic}</span>;
};

Topic.propTypes = {
  topic: PropTypes.string,
};

export default Topic;
