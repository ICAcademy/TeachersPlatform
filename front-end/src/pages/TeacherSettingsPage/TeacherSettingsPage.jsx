import React, { useState, useContext } from 'react';

// services
import { updateUserById } from '../../services/userService';

// context
import { CurrentUserContext } from 'context/AppProvider';

// styles
import styles from './TeacherSettingsPage.module.scss';
import ItemSetting from 'components/TeachersSettingsPage/ItemSetting/ItemSetting';
import { Button } from '@mui/material';

const TeacherSettingsPage = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [email, setEmail] = useState(currentUser.email);

  console.log('currentUser', currentUser);
  console.log('email', email);

  const updateUser = async () => {
    try {
      const patchUser = { fullName, email };
      await updateUserById(currentUser._id, patchUser);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('fullName', fullName);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ItemSetting itemName='Full Name' itemValue={fullName} handleItem={setFullName} />
        <ItemSetting itemName='email' itemValue={email} handleItem={setEmail} />
      </div>
      <div>
        <Button onClick={updateUser}>Change Profile</Button>
      </div>
    </div>
  );
};

export default TeacherSettingsPage;
