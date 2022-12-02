import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './FirstLetterIcon.module.scss';

const FirstLetterIcon = (props) => {
  return <div className={styles.letterIcon}>{props.firstLetter}</div>;
};

//propTypes
FirstLetterIcon.propTypes = {
  firstLetter: PropTypes.string,
};
FirstLetterIcon.defaultProps = {
  firstLetter: '',
};

export default FirstLetterIcon;
