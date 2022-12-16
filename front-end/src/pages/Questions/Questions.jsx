import React, { useEffect, useState } from 'react';

import Loader from 'components/common/Loader/Loader';
import Levels from 'components/common/Levels/Levels';
import Units from 'components/questions/Units/Units';

import { getLevels, getUnitsByLevel, getQuestionsByUnit } from 'services/questionService';

import styles from './Questions.module.scss';
import { TextField } from '@mui/material';

const baseUrl = 'questions';

const Questions = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchUnitName, setSearchUnitName] = useState('');
  const [prevLevel, setPrevLevel] = useState('beginner');

  const fetchLevels = async () => {
    try {
      const levels = await getLevels();
      setLevels(levels);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const fetchUnits = async (level) => {
    try {
      setIsLoading(true);
      const units = await getUnitsByLevel(level);
      setUnits(units);
      setIsLoading(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const levelHandler = (level) => {
    setSelectedLevel(level);
  };

  const fetchQuestionsByUnitName = async (searchUnit) => {
    try {
      setIsLoading(true);
      const questionsFromInput = await getQuestionsByUnit(searchUnit);
      setPrevLevel(selectedLevel);
      setSelectedLevel('');
      setUnits(questionsFromInput);
      setIsLoading(false);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleCangeSearchUnit = (event) => {
    setSearchUnitName(event.target.value);
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  useEffect(() => {
    if (searchUnitName.length === 0) {
      setSelectedLevel(prevLevel);
    }
    if (searchUnitName.length > 3) {
      const timer = setTimeout(() => {
        return fetchQuestionsByUnitName(searchUnitName);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchUnitName]);

  useEffect(() => {
    if (searchUnitName.length < 3) {
      const timer = setTimeout(() => {
        fetchUnits(selectedLevel);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedLevel, searchUnitName]);

  return (
    <div className={styles.materials}>
      <div className={styles.filtersContainer}>
        <div className={styles.levelsContainer}>
          <Levels
            list={levels}
            selectedLevel={selectedLevel}
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
      {isLoading ? <Loader /> : <Units units={units} baseUrl={baseUrl} />}
    </div>
  );
};

export default Questions;
