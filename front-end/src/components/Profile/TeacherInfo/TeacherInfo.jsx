import React, { useContext, useState, useEffect } from 'react';

// context
import { CurrentUserContext } from 'context/AppProvider';

// services
import { getTeacher, updateTeacher } from 'services/teacherService';

// styles
import styles from './TeacherInfo.module.scss';
import SelectItem from './SelectItem/SelectItem';
import TextAreaInfo from './TextAreaItem/TextAreaInfo';
import TeacherPhone from './TeacherPhone/TeacherPhone';
import { Button } from '@mui/material';
import AgePreferences from './AgePreferences/AgePreferences';

const languages = ['English', 'German', 'Italian'];

const TeacherInfo = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [language, setLanguage] = useState('');
  const [biography, setBiography] = useState('');
  const [socialMedias, setSocialMedias] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');

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
      await updateTeacher(currentUser.roleId, patchTeacher);
    } catch (error) {
      console.log(error);
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
      <TextAreaInfo header='Biography' value={biography} setValue={setBiography} />
      <TeacherPhone phoneInput={phoneInput} setPhoneInput={setPhoneInput} />
      <AgePreferences minAge={minAge} setMinAge={setMinAge} maxAge={maxAge} setMaxAge={setMaxAge} />
      <TextAreaInfo header='Social Medias' value={socialMedias} setValue={setSocialMedias} />
      <div className={styles.buttonContainer}>
        <Button onClick={changeProfile} variant='contained'>
          Change Profile
        </Button>
      </div>
    </div>
  );
};

export default TeacherInfo;
