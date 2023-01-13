import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

//Services
import { getLevels } from 'services/MaterialsService/MaterialsService';

//HOC
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

//Components
import Levels from 'components/common/Levels/Levels';
import Units from 'components/Materials/Units/Units';
import Loader from 'components/common/Loader/Loader';
import useFetchUnits from 'hooks/useFetchUnits';

// Context
import { CurrentUserContext } from 'context/AppProvider';

//Styles
import styles from './Materials.module.scss';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';

// Constants
import { ADMIN_ROLE } from 'constants/userRoles';

const Materials = ({ snackbarShowMessage }) => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [searchByUnitName, setSearchByUnitName] = useState('');
  const [searchUnit, setSearchUnit] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

  const location = useLocation();

  const fetchLevels = async () => {
    try {
      const levels = await getLevels();
      setLevels(levels);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const changeLevelHandler = (level) => {
    setSelectedLevel(level);
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

  const saveMaterialBtn = currentUser.role === ADMIN_ROLE && (
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
    const timer = setTimeout(() => {
      setSearchUnit(searchByUnitName);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchByUnitName]);

  const searching = searchByUnitName === '' ? searchByUnitName : searchUnit;

  const { data, loading } = useFetchUnits(isEdit, searching, selectedLevel, 'materials');

  return (
    <div className={styles.materials}>
      <div className={styles.materialsHeader}>
        <div className={styles.navigationRow}>
          <Levels
            list={levels}
            selectedLevel={isEdit ? '' : selectedLevel}
            onChangeLevel={changeLevelHandler}
            searchByUnitName={searchByUnitName}
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
      {loading ? <Loader /> : <Units materials={data} />}
    </div>
  );
};

//propTypes
Materials.propTypes = {
  snackbarShowMessage: PropTypes.func,
};

export default withSnackbar(Materials);
