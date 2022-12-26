import React, { useContext, useState, useEffect } from 'react';

// context
import { CurrentUserContext } from 'context/AppProvider';

// services
import { getTeacher, updateTeacher } from '../../../services/teacherService';

// styles
import styles from './TeacherInfo.module.scss';
import SelectItem from './SelectItem/SelectItem';
import TextAreaInfo from './TextAreaItem/TextAreaInfo';
import TeacherPhone from './TeacherPhone/TeacherPhone';
import { Button } from '@mui/material';

const languages = ['English', 'German', 'Italian'];
const agePreferences = ['6 - 10', '11 - 15', '16 - 17', '18 - ...'];

const TeacherInfo = () => {
  const { currentUser } = useContext(CurrentUserContext);
  console.log('user', currentUser);
  const [language, setLanguage] = useState('');
  const [biography, setBiography] = useState('');
  const [agePreference, setAgePreference] = useState('');
  const [socialMedias, setSocialMedias] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  console.log('phoneInput', phoneInput);

  const changeProfile = async () => {
    try {
      const patchTeacher = {
        language,
        biography,
        phone: phoneInput,
        preferences: agePreference,
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
      setLanguage(teacher.language);
      setBiography(teacher.biography);
      setPhoneInput(teacher.phone);
      setAgePreference(teacher.preferences);
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
      <SelectItem
        nameSelect='Age Preferences'
        value={agePreference}
        setValue={setAgePreference}
        selectArray={agePreferences}
      />
      <TextAreaInfo header='Social Medias' value={socialMedias} setValue={setSocialMedias} />
      <div className={styles.buttonContainer}>
        <Button onClick={changeProfile}>Change Profile</Button>
      </div>
    </div>
  );
};

export default TeacherInfo;
