import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, FormControl, Select, MenuItem, Button } from '@mui/material';

//Services

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
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

const ChangeLevel = ({ isOpen, handleIsClose, level, levels, changeLevel, studentName }) => {
  const [selectedLevel, setSelectedLevel] = useState(level || '');

  const updateLevelHandler = () => {
    changeLevel(selectedLevel);
    handleIsClose();
  };

  const handleChange = (e) => {
    setSelectedLevel(e.target.value);
  };

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
            <Button
              variant='contained'
              onClick={() => {
                setSelectedLevel(level);
                handleIsClose();
              }}
            >
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
  levels: PropTypes.array,
  changeLevel: PropTypes.func,
  studentName: PropTypes.string,
};

export default ChangeLevel;
