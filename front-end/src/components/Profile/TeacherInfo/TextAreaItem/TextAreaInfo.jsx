import React from 'react';
import PropTypes from 'prop-types';

// components
import TextareaAutosize from '@mui/base/TextareaAutosize';

// styles
import styles from './TextAreaInfo.module.scss';

const TextAreaInfo = ({ header, value, setValue, error }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const style = {
    maxWidth: '100%',
    minWidth: '100%',
    padding: '15px 10px',
    fontWeight: 400,
    fontSize: '15px',
    fontFamily: 'Arial, sans-serif',
    resize: 'vertical',
    overflow: 'auto',
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <span className={styles.header}>{header}</span>
      </div>
      <TextareaAutosize style={style} minRows={4} value={value} onChange={handleChange} />
      {error && header === 'Biography' && value.length < 10 && (
        <div className={styles.errorContainer}>
          Empty Field! Number of letters must be more than 10.
        </div>
      )}
    </div>
  );
};

TextAreaInfo.propTypes = {
  header: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  error: PropTypes.bool,
};

export default TextAreaInfo;
