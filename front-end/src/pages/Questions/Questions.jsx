import React, { useEffect, useState } from 'react';

import Loader from 'components/common/Loader/Loader';
import Levels from 'components/common/Levels/Levels';
import Units from 'components/Questions/Units/Units';

import { getLevels, getUnitsByLevel } from 'services/questions';

import styles from './Questions.module.scss';

const baseUrl = 'questions';

const Questions = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLevels = async () => {
    try {
      const levels = await getLevels();
      setLevels(levels);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUnits = async (level) => {
    try {
      setIsLoading(true);
      const units = await getUnitsByLevel(level);
      setUnits(units);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const levelHandler = (level) => {
    setSelectedLevel(level);
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  useEffect(() => {
    fetchUnits(selectedLevel);
  }, [selectedLevel]);

  return (
    <div className={styles.materials}>
      <Levels list={levels} selectedLevel={selectedLevel} onChangeLevel={levelHandler} />
      {isLoading ? <Loader /> : <Units units={units} baseUrl={baseUrl} />}
    </div>
  );
};

export default Questions;
