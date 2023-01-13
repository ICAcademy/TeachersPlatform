import ChangeForgottenPassword from 'components/ChangeForgottenPassword/ChangeForgottenPassword';
import RequestChangePassword from 'components/RequestChangePassword/RequestChangePassword';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// service
import { resetPasswordService, requestChangePasswordService } from 'services/authService';

const ChangePassword = () => {
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
      return changePassword;
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const changePassword = async () => {
    try {
      const changePassword = await resetPasswordService(token, id, password);
      return changePassword;
    } catch (error) {
      setError(error.message);
      console.log('error', error.message);
    }
  };

  const handleSubmitEmail = async () => {
    await requestChangePassword(email);
    setEmail('');
  };

  const handleSubmitChangePassword = async () => {
    await changePassword();
    setPassword('');
    setConfirmPassword('');
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
        />
      )}
    </>
  );
};

export default ChangePassword;
