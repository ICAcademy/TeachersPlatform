/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileWink } from '@fortawesome/free-solid-svg-icons';

// Images
import students from 'assets/images/students.svg';

// Styles
import styles from './NoSubscriptions.module.scss';

const NoSubscriptions = ({ subscribeTo }) => (
  <div className={styles.wrapper}>
    <img src={students} />
    <h1>
      <i>
        You don&apos;t have a {subscribeTo} subscriptions
        <FontAwesomeIcon icon={faFaceSmileWink} />
      </i>
    </h1>
  </div>
);

NoSubscriptions.propTypes = {
  subscribeTo: PropTypes.string.isRequired,
};

export default NoSubscriptions;
