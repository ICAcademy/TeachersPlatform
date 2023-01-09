import React, { useEffect, useState } from 'react';

import Loader from 'components/common/Loader/Loader';
import Levels from 'components/common/Levels/Levels';
import Units from 'components/questions/Units/Units';

import { getLevels } from 'services/questionService';
import { TextField } from '@mui/material';

// styles
import styles from './Questions.module.scss';
import useFetchUnits from 'hooks/useFetchUnits';

const baseUrl = 'questions';

const Questions = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [searchUnitName, setSearchUnitName] = useState('');
  const [searchUnit, setSearchUnit] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const fetchLevels = async () => {
    try {
      const levels = await getLevels();
      setLevels(levels);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const levelHandler = (level) => {
    setSelectedLevel(level);
    setIsEdit(false);
    setSelectedLevel(level);
    setSearchUnitName('');
  };

  const handleCangeSearchUnit = (event) => {
    setSearchUnitName(event.target.value);
    if (event.target.value) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchUnit(searchUnitName);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchUnitName]);

  const searching = searchUnitName === '' ? searchUnitName : searchUnit;

  const { data, loading } = useFetchUnits(isEdit, searching, selectedLevel, 'question');

  console.log(data);

  return (
    <div className={styles.materials}>
      <div className={styles.filtersContainer}>
        <div className={styles.levelsContainer}>
          <Levels
            list={levels}
            selectedLevel={isEdit ? '' : selectedLevel}
            onChangeLevel={levelHandler}
            setSearchUnitName={setSearchUnitName}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            className={styles.input}
            variant='outlined'
            label='search unit'
            size='small'
            value={searchUnitName}
            onChange={handleCangeSearchUnit}
          />
        </div>
      </div>
      {loading ? <Loader /> : <Units units={data} baseUrl={baseUrl} />}
    </div>
  );
};

export default Questions;
