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
  const [search, setSearch] = useState('');

  const unitsByLevelData = async (level) => {
    try {
      setIsLoading(true);
      const units = await getUnitsByLevel(level);
      setUnitsByLevel(units);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const changeLevelHandler = (level) => {
    setSelectedLevel(level);
    unitsByLevelData(level);
  };

  const handleInput = (e) => setSearch(e.target.value);

  useEffect(() => {
    unitsByLevelData(selectedLevel);
  }, [selectedLevel]);

  return (
    <div className={styles.materials}>
      <input
        className={styles.materialsSearch}
        type='text'
        placeholder='Enter here to find a lesson'
        value={search}
        onChange={handleInput}
      />
      <Levels selectedLevel={selectedLevel} onChangeLevel={changeLevelHandler} />
      {isLoading ? <Loader /> : <Units materials={unitsByLevel} />}
    </div>
  );
};

export default Materials;
