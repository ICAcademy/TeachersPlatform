import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

//Services
import { getLevels } from 'services/MaterialsService/MaterialsService';

//Components
import Level from './Level/Level';

//Styles
import styles from './Levels.module.scss';

const Levels = (props) => {
  const [levels, setLevels] = useState([]);

  const levelsData = async () => {
    const levels = await getLevels();
    setLevels(levels);
  };

  useEffect(() => {
    levelsData();
  }, []);

  const changeLevelHandler = (level) => {
    props.onChangeLevel(level);
  };

  return (
    <div className={styles.levelsBar}>
      {levels.map((level) => (
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
};
Levels.propTypes = {
  onChangeLevel: PropTypes.func,
};

export default Levels;
