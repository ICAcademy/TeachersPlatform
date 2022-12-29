import React, { useEffect, useState, useCallback } from 'react';

import Loader from 'components/common/Loader/Loader';
import Levels from 'components/common/Levels/Levels';
import Units from 'components/questions/Units/Units';

import { getLevels, getUnitsByLevel, getQuestionsByUnitName } from 'services/questionService';
import { TextField } from '@mui/material';

// styles
import styles from './Questions.module.scss';

const baseUrl = 'questions';

const Questions = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [units, setUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchUnitName, setSearchUnitName] = useState('');
  const [isEdit, setIsEdit] = useState(false);

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
    setIsEdit(false);
    setSelectedLevel(level);
    setSearchUnitName('');
  };

  const fetchQuestionsByUnitName = useCallback(async (searchUnit) => {
    try {
      setIsLoading(true);
      const questionsFromInput = await getQuestionsByUnitName({ searchUnit });
      setUnits(questionsFromInput);
      setIsLoading(false);
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

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
    if (!isEdit) {
      fetchUnits(selectedLevel);
    }
    if (isEdit) {
      const timer = setTimeout(() => {
        fetchQuestionsByUnitName(searchUnitName);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchUnitName, fetchQuestionsByUnitName, isEdit, selectedLevel]);

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
      {isLoading ? <Loader /> : <Units units={units} baseUrl={baseUrl} />}
    </div>
  );
};

export default Questions;
