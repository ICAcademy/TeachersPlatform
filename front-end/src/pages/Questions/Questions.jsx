import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from 'context/AppProvider';

//components
import Loader from 'components/common/Loader/Loader';
import Levels from 'components/common/Levels/Levels';
import Units from 'components/questions/Units/Units';

import { getLevels } from 'services/questionService';

// styles
import styles from './Questions.module.scss';
import { TextField, Button } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { InputAdornment } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

import useFetchUnits from 'hooks/useFetchUnits';

const baseUrl = 'questions';

const Questions = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [searchUnitName, setSearchUnitName] = useState('');
  const [searchUnit, setSearchUnit] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);

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

  const { data, loading } = useFetchUnits(isEdit, searching, selectedLevel);

  const saveMaterialBtn = isAuthenticated && currentUser.role === 'admin' && (
    <Button component={Link} to='/app/tests' variant='contained' endIcon={<Add />}>
      Create new test
    </Button>
  );

  return (
    <div className={styles.questions}>
      <div className={styles.questionsHeader}>
        <div className={styles.navigationRow}>
          <Levels
            list={levels}
            selectedLevel={isEdit ? '' : selectedLevel}
            onChangeLevel={levelHandler}
            setSearchUnitName={setSearchUnitName}
          />
          <TextField
            sx={{
              width: '360px',
            }}
            className={styles.input}
            variant='outlined'
            label='search unit'
            size='small'
            value={searchUnitName}
            onChange={handleCangeSearchUnit}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {saveMaterialBtn}
      </div>
      {loading ? <Loader /> : <Units units={data} baseUrl={baseUrl} />}
    </div>
  );
};

export default Questions;
