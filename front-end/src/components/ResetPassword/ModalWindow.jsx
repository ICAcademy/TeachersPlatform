import React, { useState, useContext } from 'react';
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
import { REGEX_PASSWORD } from 'helpers/regex';
import useInput from 'hooks/useInput';
import Loader from 'components/common/Loader/Loader';
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  padding: '30px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& .MuiBox-root': {
    px: 1,
    width: '30ch',
    ['@media (max-width: 550px)']: { width: '100%', px: 3 },
  },
};

const newPasswordAgainHelperText = 'Passwords do not match';

const ModalWindow = ({ open, handleClose, snackbarShowMessage }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const [enteredCurrentPassword, setEnteredCurrentPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentPasswordChangeHandler = (e) => {
    setIsError({});
    setEnteredCurrentPassword(e.target.value);
  };

  const {
    value: enteredNewPassword,
    isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    valueChangeHandler: newPasswordChangeHandler,
    valueOnBlurHandler: newPasswordBlurHandler,
    resetValue: resetNewPassword,
  } = useInput('newPassword', '', REGEX_PASSWORD);

  const {
    value: enteredNewPasswordAgain,
    isValid: newPasswordAgainIsValid,
    hasError: newPasswordAgainHasError,
    valueChangeHandler: newPasswordAgainChangeHandler,
    valueOnBlurHandler: newPasswordAgainBlurHandler,
    resetValue: resetNewPasswordAgain,
  } = useInput('newPasswordAgain', '', REGEX_PASSWORD);

  const formIsValid = newPasswordIsValid && newPasswordAgainIsValid;

  const [isError, setIsError] = useState({});

  const handleMouseDownPassword = (e) => e.preventDefault();

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    newPasswordAgain: false,
  });

  const handleClickShowPassword = ({ currentTarget }, value) => {
    setShowPassword({ ...showPassword, [currentTarget.name]: value });
  };

  const savePassword = async (id, data) => {
    try {
      setIsLoading(true);
      await changePassword(id, data);
      setIsError('');
      snackbarShowMessage({
        message: 'Password changed',
        severity: 'success',
      });
      reset();
      setIsLoading(false);
    } catch (error) {
      setIsError(error.response.data);
    }
  };

  const reset = () => {
    setEnteredCurrentPassword('');
    resetNewPassword();
    resetNewPasswordAgain();
    handleClose();
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            margin='normal'
            variant='outlined'
            size='small'
            label='Current password'
            type={showPassword.currentPassword ? 'text' : 'password'}
            name='currentPassword'
            value={enteredCurrentPassword}
            error={isError.status === 'error'}
            helperText={isError.status === 'error' ? isError.message : ''}
            onChange={currentPasswordChangeHandler}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    name='currentPassword'
                    aria-label='toggle password visibility'
                    onClick={(e) => handleClickShowPassword(e, !showPassword.currentPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword.currentPassword ? (
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
            type={showPassword.newPassword ? 'text' : 'password'}
            name='New password'
            value={enteredNewPassword}
            onChange={newPasswordChangeHandler}
            onBlur={newPasswordBlurHandler}
            error={newPasswordHasError}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    name='newPassword'
                    aria-label='toggle password visibility'
                    onClick={(e) => handleClickShowPassword(e, !showPassword.newPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword.newPassword ? (
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
            type={showPassword.newPasswordAgain ? 'text' : 'password'}
            name='newPasswordAgain'
            value={enteredNewPasswordAgain}
            onChange={newPasswordAgainChangeHandler}
            onBlur={newPasswordAgainBlurHandler}
            error={newPasswordAgainHasError}
            helperText={newPasswordAgainHasError ? newPasswordAgainHelperText : ''}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    name='newPasswordAgain'
                    aria-label='toggle password visibility'
                    onClick={(e) => handleClickShowPassword(e, !showPassword.newPasswordAgain)}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword.newPasswordAgain ? (
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
              disabled={!formIsValid}
              onClick={() =>
                savePassword(currentUser._id, {
                  currentPassword: enteredCurrentPassword,
                  newPassword: enteredNewPassword,
                  newPasswordAgain: enteredNewPasswordAgain,
                })
              }
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
  snackbarShowMessage: PropTypes.func,
};

ModalWindow.defaultProps = {
  children: '',
  open: bool,
  handleClose: () => {},
};

export default withSnackbar(ModalWindow);
