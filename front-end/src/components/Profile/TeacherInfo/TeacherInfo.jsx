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
const operators = ['+38', '+98'];
const agePreferences = ['6 - 10', '11 - 15', '16 - 17', '18 - ...'];

const TeacherInfo = () => {
  const { currentUser } = useContext(CurrentUserContext);
  console.log('user', currentUser);
  const [language, setLanguage] = useState('');
  const [biography, setBiography] = useState('');
  const [phone, setPhone] = useState(0);
  const [operator, setOperator] = useState('');
  const [agePreference, setAgePreference] = useState('');
  const [socialMedias, setSocialMedias] = useState('');

  const changeProfile = async () => {
    const mobile = `${operator}${phone}`;
    try {
      const patchTeacher = {
        language,
        biography,
        phone: mobile,
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
      setPhone(Number(teacher.phone.slice(3)));
      setOperator(teacher.phone.slice(0, 3));
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
      <TeacherPhone
        operator={operator}
        setOperator={setOperator}
        phone={phone}
        setPhone={setPhone}
        operators={operators}
      />
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
