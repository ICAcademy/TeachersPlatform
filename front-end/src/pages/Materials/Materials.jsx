import React, { useState, useEffect } from 'react';

//Services
import {
  getLevels,
  getUnitsByLevel,
  getMaterialsByUnit,
} from 'services/MaterialsService/MaterialsService';

//Components
import Levels from 'components/common/Levels/Levels';
import Units from 'components/Materials/Units/Units';
import Loader from 'components/common/Loader/Loader';

//Styles
import styles from './Materials.module.scss';
import { TextField } from '@mui/material';

const Materials = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [unitsByLevel, setUnitsByLevel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchByUnit, setSearchByUnit] = useState('');

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

  const MaterialsByUnit = async (searchByUnit) => {
    try {
      setIsLoading(true);
      const data = await getMaterialsByUnit(searchByUnit);
      setUnitsByLevel(data);
      if (unitsByLevel) {
        await data?.map((item) => {
          setSelectedLevel(item?.level);
        });
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const changeLevelHandler = (level) => {
    setSelectedLevel(level);
    unitsByLevelData(level);
  };

  const handleInput = (e) => {
    setSearchByUnit(e.target.value);
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  useEffect(() => {
    if (!searchByUnit) {
      unitsByLevelData(selectedLevel);
    }
  }, [selectedLevel, searchByUnit]);

  useEffect(() => {
    if (searchByUnit.length > 3) {
      const timer = setTimeout(() => {
        MaterialsByUnit(searchByUnit);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchByUnit]);

  return (
    <div className={styles.materials}>
      <TextField
        className={styles.materialsSearch}
        variant='outlined'
        size='small'
        label='Enter here to find a lesson'
        defaultValue={searchByUnit}
        onChange={handleInput}
      />
      <Levels list={levels} selectedLevel={selectedLevel} onChangeLevel={changeLevelHandler} />
      {isLoading ? <Loader /> : <Units materials={unitsByLevel} />}
    </div>
  );
};

export default Materials;
