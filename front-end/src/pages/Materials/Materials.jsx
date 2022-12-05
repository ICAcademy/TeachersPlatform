import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

//Services
import { getUnitsByLevel, getMaterialsByUnit } from 'services/MaterialsService/MaterialsService';

//Components
import Levels from 'components/Materials/Levels/Levels';
import Units from 'components/Materials/Units/Units';
import Loader from 'components/common/Loader/Loader';

//Styles
import styles from './Materials.module.scss';
import { Button } from '@mui/material';

const Materials = () => {
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [unitsByLevel, setUnitsByLevel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searchByUnit, setSearchByUnit] = useState([]);

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

  const MaterialsByUnit = async () => {
    try {
      setIsLoading(true);
      const data = await getMaterialsByUnit(search);
      setSearchByUnit(data);
      console.log(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const changeLevelHandler = (level) => {
    setSelectedLevel(level);
    unitsByLevelData(level);
  };

  const handleInput = (e) => setSearch(e.target.value);

  const debouncedHandleInput = useCallback(debounce(handleInput, 300), []);

  useEffect(() => {
    unitsByLevelData(selectedLevel);
  }, [selectedLevel]);

  return (
    <div className={styles.materials}>
      <input
        className={styles.materialsSearch}
        type='text'
        placeholder='Enter here to find a lesson'
        defaultValue={search}
        onChange={handleInput}
      />
      <Button className={styles.searchIcon} onClick={MaterialsByUnit}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
      <Levels selectedLevel={selectedLevel} onChangeLevel={changeLevelHandler} />
      {isLoading ? <Loader /> : <Units materials={unitsByLevel} />}
    </div>
  );
};

export default Materials;
