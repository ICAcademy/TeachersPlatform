import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

//Services
import { getLevels, getUnitsByLevel } from 'services/MaterialsService/MaterialsService';

//Components
import Levels from 'components/common/Levels/Levels';
import Units from 'components/Materials/Units/Units';
import Loader from 'components/common/Loader/Loader';

// Context
import { CurrentUserContext } from 'context/AppProvider';

//Styles
//import styles from './Materials.module.scss';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';

const Materials = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [unitsByLevel, setUnitsByLevel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);

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

  const saveMaterialBtn = isAuthenticated && currentUser.role === 'admin' && (
    <Button component={Link} to='/app/materials/edit/new' variant='contained' endIcon={<Add />}>
      Create material
    </Button>
  );

  useEffect(() => {
    fetchLevels();
    unitsByLevelData(selectedLevel);
  }, [selectedLevel]);

  return (
    <div>
      {/* <div className={styles.navigationRow}>
        <Levels list={levels} selectedLevel={selectedLevel} onChangeLevel={changeLevelHandler} />
        {saveMaterialBtn}
      </div>
      {isLoading ? <Loader /> : <Units materials={unitsByLevel} />} */}
      materials
    </div>
  );
};

export default Materials;
