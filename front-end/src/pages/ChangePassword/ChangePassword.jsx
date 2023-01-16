import ChangeForgottenPassword from 'components/ChangeForgottenPassword/ChangeForgottenPassword';
import RequestChangePassword from 'components/RequestChangePassword/RequestChangePassword';
import { withSnackbar } from 'components/withSnackbar/withSnackbar';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// service
import { resetPasswordService, requestChangePasswordService } from 'services/authService';

const ChangePassword = ({ snackbarShowMessage }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  const hangleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const requestChangePassword = async (email) => {
    try {
      const changePassword = await requestChangePasswordService(email);
      snackbarShowMessage({
        message: 'Email was sent',
        severity: 'success',
      });
      setError('');
      return changePassword;
    } catch (error) {
      setError(error.response.data.error);
      console.log('error', error);
    }
  };

  const changePassword = async () => {
    try {
      if (password === confirmPassword) {
        const changePassword = await resetPasswordService(token, id, password);
        setPassword('');
        setConfirmPassword('');
        snackbarShowMessage({
          message: 'Password was sent',
          severity: 'success',
        });
        setError('');
        return changePassword;
      }
      throw new Error('Passwords do not match');
    } catch (error) {
      setError(error.response.data.error);
      snackbarShowMessage({
        message: 'Error',
        severity: 'error',
      });
      console.log('error', error);
    }
  };

  const handleSubmitEmail = async () => {
    await requestChangePassword(email);
    setEmail('');
  };

  const handleSubmitChangePassword = async () => {
    await changePassword();
  };

  return (
    <>
      {token && id ? (
        <ChangeForgottenPassword
          handleChangePassword={handleChangePassword}
          handleChangeConfirmPassword={handleChangeConfirmPassword}
          handleSubmitChangePassword={handleSubmitChangePassword}
          password={password}
          confirmPassword={confirmPassword}
          error={error}
        />
      ) : (
        <RequestChangePassword
          handleChangeEmail={hangleChangeEmail}
          handleSubmitEmail={handleSubmitEmail}
          email={email}
          error={error}
        />
      )}
    </>
  );
};

ChangePassword.propTypes = {
  snackbarShowMessage: PropTypes.func,
};

export default withSnackbar(ChangePassword);
