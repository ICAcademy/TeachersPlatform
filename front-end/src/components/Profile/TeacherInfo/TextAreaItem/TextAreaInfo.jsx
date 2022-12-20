import React from 'react';
import PropTypes from 'prop-types';

// components
import TextareaAutosize from '@mui/base/TextareaAutosize';

// styles
import styles from './TextAreaInfo.module.scss';

const TextAreaInfo = ({ value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <span className={styles.header}>Biography</span>
      </div>
      <TextareaAutosize className={styles.input} value={value} onChange={handleChange} />
    </div>
  );
};

TextAreaInfo.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};

export default TextAreaInfo;
