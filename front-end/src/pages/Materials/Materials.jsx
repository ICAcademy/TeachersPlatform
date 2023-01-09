import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

//Services
import {
  getLevels,
  getUnitsOnLevel,
  getMaterialsByUnit,
} from 'services/MaterialsService/MaterialsService';

//HOC
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

//Components
import Levels from 'components/common/Levels/Levels';
import Units from 'components/Materials/Units/Units';
import Loader from 'components/common/Loader/Loader';

// Context
import { CurrentUserContext } from 'context/AppProvider';

//Styles
import styles from './Materials.module.scss';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';

const Materials = ({ snackbarShowMessage }) => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [unitsByLevel, setUnitsByLevel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchByUnitName, setSearchByUnitName] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);

  const location = useLocation();

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
      const units = await getUnitsOnLevel(level);
      setUnitsByLevel(units);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMaterialsByUnitName = useCallback(async (searchByUnit) => {
    try {
      setIsLoading(true);
      const data = await getMaterialsByUnit({ unitName: searchByUnit });
      setUnitsByLevel(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const changeLevelHandler = (level) => {
    setIsEdit(false);
    setSelectedLevel(level);
    setSearchByUnitName('');
  };

  const handleInput = (e) => {
    setSearchByUnitName(e.target.value);
    if (e.target.value) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  const saveMaterialBtn = isAuthenticated && currentUser.role === 'admin' && (
    <Button component={Link} to='/app/materials/edit/new' variant='contained' endIcon={<Add />}>
      Create material
    </Button>
  );

  useEffect(() => {
    fetchLevels();
  }, []);

  useEffect(() => {
    if (location.state === 'delete') {
      snackbarShowMessage({
        message: 'Material successfully deleted',
        severity: 'success',
      });
      window.history.replaceState({}, document.title);
    }
  }, [location, snackbarShowMessage]);

  useEffect(() => {
    if (!isEdit) {
      unitsByLevelData(selectedLevel);
    }
    if (isEdit) {
      const timer = setTimeout(() => {
        fetchMaterialsByUnitName(searchByUnitName);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [fetchMaterialsByUnitName, isEdit, searchByUnitName, selectedLevel]);

  return (
    <div className={styles.materials}>
      <div className={styles.materialsHeader}>
        <div className={styles.navigationRow}>
          <Levels
            list={levels}
            selectedLevel={isEdit ? '' : selectedLevel}
            onChangeLevel={changeLevelHandler}
          />
          <TextField
            sx={{
              width: '360px',
            }}
            variant='outlined'
            size='small'
            label='Enter here to find a lesson'
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
            onChange={handleInput}
            value={searchByUnitName}
          />
        </div>
        {saveMaterialBtn}
      </div>
      {isLoading ? <Loader /> : <Units materials={unitsByLevel} />}
    </div>
  );
};

//propTypes
Materials.propTypes = {
  snackbarShowMessage: PropTypes.func,
};

export default withSnackbar(Materials);
