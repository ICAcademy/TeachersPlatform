import React, { useState, useEffect } from 'react';

//Services
import { getUnitsByLevel } from 'services/MaterialsService/MaterialsService';

//Components
import Levels from 'components/Materials/Levels/Levels';
import Units from 'components/Materials/Units/Units';
import Loader from 'components/common/Loader/Loader';

//Styles
import styles from './Materials.module.scss';

const Materials = () => {
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [unitsByLevel, setUnitsByLevel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const unitsByLevelData = async (level) => {
    setIsLoading(true);
    const units = await getUnitsByLevel(level);
    setUnitsByLevel(units);
    setIsLoading(false);
  };

  const changeLevelHandler = (level) => {
    setSelectedLevel(level);
    unitsByLevelData(level);
  };

  useEffect(() => {
    unitsByLevelData(selectedLevel);
  }, [selectedLevel]);

  return (
    <div className={styles.materials}>
      <Levels selectedLevel={selectedLevel} onChangeLevel={changeLevelHandler} />
      {isLoading ? <Loader /> : <Units materials={unitsByLevel} />}
    </div>
  );
};

export default Materials;
