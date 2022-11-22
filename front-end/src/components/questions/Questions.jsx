/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { getLevels, getUnitsByLevel } from 'services/questions';
import Levels from 'components/Levels/Levels';
import Units from 'components/Units/Units';

const Questions = () => {
  const [levels, setLevels] = useState([]);
  const [units, setUnits] = useState([]);

  const fetchLevels = async () => {
    const data = await getLevels();
    setLevels(data);
  };

  const fetchUnits = async (level) => {
    const data = await getUnitsByLevel(level);
    setUnits(data);
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
    <Box>
      <Typography variant='h3'>Questions</Typography>
      <Levels list={levels} handleUnits={fetchUnits} />
      <Units list={units} />
    </Box>
  );
};

export default Questions;
