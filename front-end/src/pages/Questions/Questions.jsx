import React, { useEffect, useState } from 'react';

import Loader from 'components/common/Loader/Loader';
import Levels from 'components/common/Levels/Levels';
import Units from 'components/questions/Units/Units';

import { getLevels, getUnitsByLevel, getQuestionsByLevelAndUnit } from 'services/questionService';

import styles from './Questions.module.scss';
import { TextField } from '@mui/material';

const baseUrl = 'questions';

const Questions = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchUnit, setSearchUnit] = useState('');
  const [prevLevel, setPrevLevel] = useState('beginner');

  console.log('prevLevel', prevLevel);

  console.log('selectedLevel', selectedLevel);

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

  const fetchQuestionsByLevelAndUnit = async (searchUnit) => {
    try {
      const questionsFromInput = await getQuestionsByLevelAndUnit(searchUnit);
      setUnits(questionsFromInput);
      setPrevLevel(selectedLevel);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleCangeSearchUnit = (event) => {
    setSearchUnit(event.target.value);
  };

  useEffect(() => {
    if (searchUnit.length > 3) {
      const timer = setTimeout(() => {
        return fetchQuestionsByLevelAndUnit(searchUnit);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchUnit]);

  useEffect(() => {
    fetchLevels();
  }, []);

  useEffect(() => {
    if (searchUnit.length < 3) {
      const timer = setTimeout(() => {
        fetchUnits(selectedLevel);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedLevel, searchUnit]);

  return (
    <div className={styles.materials}>
      <div className={styles.filtersContainer}>
        <div className={styles.levelsContainer}>
          <Levels
            list={levels}
            selectedLevel={selectedLevel}
            onChangeLevel={levelHandler}
            setSearchUnit={setSearchUnit}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            className={styles.input}
            variant='outlined'
            label='search unit'
            size='small'
            value={searchUnit}
            onChange={handleCangeSearchUnit}
          />
        </div>
      </div>
      {isLoading ? <Loader /> : <Units units={units} baseUrl={baseUrl} />}
    </div>
  );
};

export default Questions;
