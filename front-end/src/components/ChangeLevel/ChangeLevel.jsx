import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, FormControl, Select, MenuItem, Button } from '@mui/material';
import { updateStudentData } from 'services/studentService';
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

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

const ChangeLevel = ({
  isOpen,
  handleIsClose,
  selectedIdx,
  updateHandler,
  snackbarShowMessage,
}) => {
  const [level, setLevel] = useState('');

  const addStudentLevel = useCallback(async () => {
    try {
      const updatedSubscription = await updateStudentData(selectedIdx, { level });
      updateHandler(updatedSubscription);
      snackbarShowMessage({
        message: 'Level updated',
        severity: 'success',
      });
      handleIsClose();
    } catch (error) {
      console.log(error);
    }
  }, [selectedIdx, level, updateHandler, handleIsClose, snackbarShowMessage]);

  const handleChange = (e) => {
    setLevel(e.target.value);
  };

  return (
    <Modal open={isOpen} onClose={handleIsClose}>
      <Box sx={style}>
        <Typography variant='h5' marginBottom='30px'>
          Student Name
        </Typography>
        <FormControl sx={{ width: '100%' }}>
          <Select value={level} onChange={handleChange} size='small' sx={{ marginBottom: '35px' }}>
            <MenuItem value={'Elementary'}>Elementary</MenuItem>
            <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
            <MenuItem value={'Advanced'}>Advanced</MenuItem>
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
            <Button variant='contained' onClick={addStudentLevel}>
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
  selectedIdx: PropTypes.string,
  getSubscriptions: PropTypes.func,
  updateHandler: PropTypes.func,
  snackbarShowMessage: PropTypes.func,
};

export default withSnackbar(ChangeLevel);
