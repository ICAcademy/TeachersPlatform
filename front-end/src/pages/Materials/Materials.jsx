import React, { useState, useEffect } from 'react';

//Services
import { getLevels, getUnitsByLevel } from 'services/MaterialsService/MaterialsService';

//Components
import Levels from 'components/common/Levels/Levels';
import Units from 'components/Materials/Units/Units';
import Loader from 'components/common/Loader/Loader';

//Styles
import styles from './Materials.module.scss';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';

const Materials = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [unitsByLevel, setUnitsByLevel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLevels = async () => {
    try {
      const levels = await getLevels();
      setLevels(levels);
    } catch (error) {
      throw new Error(error.message);
    }
  };

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

  useEffect(() => {
    fetchLevels();
    unitsByLevelData(selectedLevel);
  }, [selectedLevel]);

  return (
    <div className={styles.materials}>
      <div className={styles.navigationRow}>
        <Levels list={levels} selectedLevel={selectedLevel} onChangeLevel={changeLevelHandler} />
        <Button href='/app/materials/edit/new' variant='contained' endIcon={<Add />}>
          Create material
        </Button>
      </div>
      {isLoading ? <Loader /> : <Units materials={unitsByLevel} />}
    </div>
  );
};

export default Materials;
