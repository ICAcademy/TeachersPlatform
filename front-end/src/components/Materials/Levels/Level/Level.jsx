import React from 'react';
import PropTypes from 'prop-types';

//Styles
import styles from './Level.module.scss';
import { Button } from '@mui/material';

const Level = (props) => {
  const changeLevelHandler = (event) => {
    props.onChangeLevel(event.target.value);
  };
  return (
    <div className={styles.levelItem}>
      <Button
        variant={props.level === props.selectedLevel ? 'contained' : 'outlined'}
        size='small'
        value={props.level}
        onClick={changeLevelHandler}
      >
        {props.level}
      </Button>
    </div>
  );
};

Level.propTypes = {
  level: PropTypes.string,
  selectedLevel: PropTypes.string,
  onChangeLevel: PropTypes.func,
};
Level.defaultProps = {
  level: '',
  selectedLevel: 'beginner',
};

export default Level;
