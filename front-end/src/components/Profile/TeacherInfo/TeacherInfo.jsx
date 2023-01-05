import React, { useContext, useState, useEffect } from 'react';

// components
import SelectItem from './SelectItem/SelectItem';
import TextAreaInfo from './TextAreaItem/TextAreaInfo';
import TeacherPhone from './TeacherPhone/TeacherPhone';
import { Button } from '@mui/material';
import AgePreferences from './AgePreferences/AgePreferences';

// context
import { CurrentUserContext } from 'context/AppProvider';

// services
import { getTeacher, updateTeacher } from 'services/teacherService';

// styles
import styles from './TeacherInfo.module.scss';

const languages = ['English', 'German', 'Italian'];

const TeacherInfo = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [language, setLanguage] = useState('');
  const [biography, setBiography] = useState('');
  const [socialMedias, setSocialMedias] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [error, setError] = useState(false);

  console.log('phoneInput', phoneInput);

  const changeProfile = async () => {
    try {
      const agePreferences = `${minAge} - ${maxAge}`;
      const patchTeacher = {
        language,
        biography,
        phone: phoneInput,
        preferences: agePreferences,
        socialMedias,
      };
      if (language === '' || biography.length < 10 || minAge === '' || maxAge === '') {
        setError(true);
      } else {
        await updateTeacher(currentUser.roleId, patchTeacher);
      }
    } catch (error) {
      snackbarShowMessage({
        message: 'Error',
        severity: 'error',
      });
    }
  };

  const getTeacherFromUser = async () => {
    try {
      const teacher = await getTeacher(currentUser.roleId);
      const preferences = teacher.preferences.split(' ');
      setLanguage(teacher.language);
      setBiography(teacher.biography);
      setPhoneInput(teacher.phone);
      setMinAge(preferences[0]);
      setMaxAge(preferences[2]);
      setSocialMedias(teacher.socialMedias);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeacherFromUser();
  }, []);

  return (
    <div className={styles.content}>
      <SelectItem
        nameSelect='Language'
        value={language}
        setValue={setLanguage}
        selectArray={languages}
      />
      <div className={styles.infoContainer}>
        <TeacherPhone phoneInput={phoneInput} setPhoneInput={setPhoneInput} />
        <AgePreferences
          minAge={minAge}
          setMinAge={setMinAge}
          maxAge={maxAge}
          setMaxAge={setMaxAge}
          error={error}
        />
      </div>
      <div className={styles.infoContainer}>
        <TextAreaInfo header='Biography' value={biography} setValue={setBiography} error={error} />
        <TextAreaInfo header='Social Medias' value={socialMedias} setValue={setSocialMedias} />
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={changeProfile} variant='contained'>
          Change Profile
        </Button>
      </div>
    </div>
  );
};

export default TeacherInfo;
