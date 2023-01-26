import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, FormControl, Select, MenuItem, Button } from '@mui/material';

//Services
import { getLevels } from 'services/MaterialsService/MaterialsService';

const style = {
  position: 'absolute',
  top: '50%',
  right: '30%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  padding: '30px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const ChangeLevel = ({ isOpen, handleIsClose, level, changeLevel, studentName }) => {
  const [selectedLevel, setSelectedLevel] = useState(level || '');
  const [levels, setLevels] = useState([]);

  const fetchLevels = async () => {
    try {
      const levels = await getLevels();
      setLevels(levels);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateLevelHandler = () => {
    changeLevel(selectedLevel);
    handleIsClose();
  };

  const handleChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
    <Modal open={isOpen} onClose={handleIsClose}>
      <Box sx={style}>
        <Typography variant='h5' marginBottom='30px'>
          {studentName}
        </Typography>
        <FormControl sx={{ width: '100%' }}>
          <Select
            value={selectedLevel}
            onChange={handleChange}
            size='small'
            sx={{ marginBottom: '35px' }}
          >
            {levels.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            <Button variant='contained' onClick={handleIsClose}>
              Close
            </Button>
            <Button variant='contained' onClick={updateLevelHandler}>
              Confirm
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Modal>
  );
};

ChangeLevel.propTypes = {
  isOpen: PropTypes.bool,
  handleIsClose: PropTypes.func,
  level: PropTypes.string,
  changeLevel: PropTypes.func,
  studentName: PropTypes.string,
};

export default ChangeLevel;
