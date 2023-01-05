import React, { useState, useContext, useEffect } from 'react';

// services
import { updateUserById } from '../../services/userService';

// context
import { CurrentUserContext } from 'context/AppProvider';

// styles
import styles from './TeacherSettingsPage.module.scss';
import ItemSetting from 'components/TeachersSettingsPage/ItemSetting/ItemSetting';
import { Button } from '@mui/material';
import { getTeacher, updateTeacher } from 'services/teacherService';

const TeacherSettingsPage = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [teacher, setTeacher] = useState({});
  const [language, setLanguage] = useState('');

  console.log('currentUser', currentUser);
  console.log('teacher', teacher);
  console.log('language', teacher.language);

  const getTeacherFromUser = async () => {
    try {
      const teacher = await getTeacher(currentUser.roleId);
      setTeacher(teacher);
    } catch (error) {
      console.log(error);
    }
  };

  const patchTeacher = async () => {
    try {
      const patchUser = { language };
      console.log('language', language);
      await updateTeacher(teacher._id, patchUser);
      const teacher = await getTeacher(currentUser.roleId);
      setTeacher(teacher);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeacherFromUser();
  }, []);

  useEffect(() => {
    if (teacher.language !== undefined) {
      setLanguage(teacher.language);
    }
  }, [teacher]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ItemSetting itemName='Language' itemValue={language} handleItem={setLanguage} />
      </div>
      <div>
        <Button onClick={patchTeacher}>Change Profile</Button>
      </div>
    </div>
  );
};

export default TeacherSettingsPage;
