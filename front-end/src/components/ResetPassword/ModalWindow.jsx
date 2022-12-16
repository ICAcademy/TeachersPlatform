import React, { useState } from 'react';
import PropTypes, { bool } from 'prop-types';

//styles
//import styles from './ModalWindow.module.scss';
import { Modal, Box, TextField, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  right: '416px',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  padding: '30px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const ModalWindow = ({ open, handleClose }) => {
  const [password, setPassword] = useState('');
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <TextField
          sx={{
            '& .MuiFormControl': { width: '100%' },
          }}
          variant='outlined'
          size='small'
          label='Current password'
          defaultValue={password}
          onChange={handlePassword}
        />
        <TextField
          variant='outlined'
          size='small'
          label='New password'
          defaultValue={password}
          onChange={handlePassword}
        />
        <TextField
          variant='outlined'
          size='small'
          label='New password again'
          defaultValue={password}
          onChange={handlePassword}
        />
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button>Confirm</Button>
        </Box>
      </Box>
    </Modal>
  );
};

ModalWindow.propTypes = {
  children: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

ModalWindow.defaultProps = {
  children: '',
  open: bool,
  handleClose: () => {},
};

export default ModalWindow;
