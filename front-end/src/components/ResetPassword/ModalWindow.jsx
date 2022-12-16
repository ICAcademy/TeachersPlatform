import React, { useState } from 'react';
import PropTypes, { bool } from 'prop-types';
import {
  Modal,
  Box,
  TextField,
  Button,
  FormControl,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            margin='normal'
            variant='outlined'
            size='small'
            label='Current password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: <InputAdornment position='start'></InputAdornment>,
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ width: '20px', height: '20px' }} />
                    ) : (
                      <Visibility sx={{ width: '20px', height: '20px' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin='normal'
            variant='outlined'
            size='small'
            label='New password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: <InputAdornment position='start'></InputAdornment>,
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ width: '20px', height: '20px' }} />
                    ) : (
                      <Visibility sx={{ width: '20px', height: '20px' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ marginBottom: '20px' }}
            margin='normal'
            variant='outlined'
            size='small'
            label='New password again'
            type={showPassword ? 'text' : 'password'}
            name='password'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: <InputAdornment position='start'></InputAdornment>,
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ width: '20px', height: '20px' }} />
                    ) : (
                      <Visibility sx={{ width: '20px', height: '20px' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button>Confirm</Button>
          </Box>
        </FormControl>
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
