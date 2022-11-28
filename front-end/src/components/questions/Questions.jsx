import React, { useEffect, useState } from 'react';

import { getLevels, getUnitsByLevel } from 'services/questions';
import Levels from 'components/Levels/Levels';
import Units from 'components/Units/Units';

import styles from './Questions.module.scss';

const Questions = () => {
  const [levels, setLevels] = useState([]);
  const [units, setUnits] = useState([]);

  const fetchLevels = async () => {
    const data = await getLevels();
    setLevels(data);
  };

  const fetchUnits = async (level) => {
    const data = await getUnitsByLevel(level);
    setUnits(data);
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
