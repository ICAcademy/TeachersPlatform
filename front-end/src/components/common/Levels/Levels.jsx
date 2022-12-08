import React from 'react';
import PropTypes from 'prop-types';

//Components
import Level from './Level/Level';

//Styles
import styles from './Levels.module.scss';

const Levels = (props) => {
  const changeLevelHandler = (level) => {
    props.onChangeLevel(level);
  };

  return (
    <div className={styles.levelsBar}>
      {props.list?.map((level) => (
        <Level
          key={level}
          selectedLevel={props.selectedLevel}
          level={level}
          onChangeLevel={changeLevelHandler}
        />
      ))}
    </div>
  );
};

//propTypes
Levels.propTypes = {
  selectedLevel: PropTypes.string,
  onChangeLevel: PropTypes.func,
  list: PropTypes.array,
};

export default Levels;
