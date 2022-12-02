import React, { useEffect, useState } from 'react';

import Levels from 'components/Levels/Levels';
import Units from 'components/Units/Units';

import { getLevels, getUnitsByLevel } from 'services/Questions';

import styles from './Questions.module.scss';

const Questions = () => {
  const [levels, setLevels] = useState([]);
  const [units, setUnits] = useState([]);

  const fetchLevels = async () => {
    const data = await getLevels();
    setLevels(data);
  };

  const fetchUnits = async (level) => {
    try {
      const data = await getUnitsByLevel(level);
      setUnits(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
    <>
      <h1 className={styles.title}>Questions</h1>
      <Levels list={levels} handleUnits={fetchUnits} />
      <Units list={units} />
    </>
  );
};

export default Questions;
