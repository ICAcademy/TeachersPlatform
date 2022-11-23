import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@mui/material';

// styles
import styles from './Header.module.scss';

const Header = ({ level, setLevel, unit, setUnit, topic, setTopic }) => {
  const handleChangeInput = (setFunc, event) => {
    setFunc(event.target.value);
  };

  return (
    <div className={styles.header}>
      <div>
        <Input value={level} onChange={(event) => handleChangeInput(setLevel, event)} />
      </div>
      <div>
        <Input value={unit} onChange={(event) => handleChangeInput(setUnit, event)} />
      </div>
      <div>
        <Input value={topic} onChange={(event) => handleChangeInput(setTopic, event)} />
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  level: PropTypes.string,
  setLevel: PropTypes.func,
  unit: PropTypes.string,
  setUnit: PropTypes.func,
  topic: PropTypes.string,
  setTopic: PropTypes.func,
};
