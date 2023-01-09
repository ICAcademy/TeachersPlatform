import React, { useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// components
import SelectItem from './SelectItem/SelectItem';
import TextAreaInfo from './TextAreaItem/TextAreaInfo';
import TeacherPhone from './TeacherPhone/TeacherPhone';
import { Button } from '@mui/material';
import AgePreferences from './AgePreferences/AgePreferences';

// hoc
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

// context
import { CurrentUserContext } from 'context/AppProvider';

// services
import { getTeacher, updateTeacher } from 'services/teacherService';

// styles
import styles from './TeacherInfo.module.scss';

const languages = ['English', 'German', 'Italian'];

const TeacherInfo = ({ snackbarShowMessage }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [language, setLanguage] = useState('');
  const [biography, setBiography] = useState('');
  const [socialMedias, setSocialMedias] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [error, setError] = useState(false);

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
        snackbarShowMessage({
          message: 'Error',
          severity: 'error',
        });
        return;
      }
      await updateTeacher(currentUser.roleId, patchTeacher);
      snackbarShowMessage({
        message: 'Changes saved',
        severity: 'success',
      });
      return;
    } catch (error) {
      snackbarShowMessage({
        message: 'Error',
        severity: 'error',
      });
    }
  };

  const getTeacherFromUser = useCallback(async () => {
    try {
      const teacher = await getTeacher(currentUser.roleId);
      const agePreferences = teacher.preferences.split(' ');
      setLanguage(teacher.language);
      setBiography(teacher.biography);
      setPhoneInput(teacher.phone);
      setMinAge(agePreferences[0]);
      setMaxAge(agePreferences[2]);
      setSocialMedias(teacher.socialMedias);
    } catch (error) {
      console.log(error);
    }
  }, [currentUser.roleId]);

  useEffect(() => {
    getTeacherFromUser();
  }, [getTeacherFromUser]);

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

TeacherInfo.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  snackbarShowMessage: PropTypes.func,
};

export default withSnackbar(TeacherInfo);
