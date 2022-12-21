import React, { useState, useMemo, useContext } from 'react';
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
import { CurrentUserContext } from 'context/AppProvider';
import { changePassword } from 'services/userService';

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
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordAgain: '',
  });
  console.log(data.password);

  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handlePasswordChange = (prop) => (e) => {
    setData({ ...data, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCurrentPassword = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleChangePassword = async (id, data) => {
    console.log(id, data);
    try {
      const updatePassword = await changePassword(id, data);
      console.log(updatePassword);
    } catch (error) {
      console.log(error);
    }
  };

  // const isDisabledBtn = useMemo(() => !data.password.trim().length, [data.password]);

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
            name='currentPassword'
            value={data.currentPassword}
            onChange={handlePasswordChange('password')}
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
            name='New password'
            value={newPassword}
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
            name='newPasswordAgain'
            value={newPasswordAgain}
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
            <Button
              // disabled={isDisabledBtn}
              onClick={() => {
                handleChangePassword(currentUser._id, data);
              }}
            >
              Confirm
            </Button>
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
