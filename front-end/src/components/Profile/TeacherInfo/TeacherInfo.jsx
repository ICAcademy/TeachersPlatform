import React, { useContext, useState } from 'react';

// context
import { CurrentUserContext } from 'context/AppProvider';

// styles
import styles from './TeacherInfo.module.scss';
import SelectItem from './SelectItem/SelectItem';
import TextAreaInfo from './TextAreaItem/TextAreaInfo';
import TeacherPhone from './TeacherPhone/TeacherPhone';

const languages = ['English', 'German', 'Italian'];
const operators = ['+38', '+98'];
const agePreferences = ['6 - 10', '11 - 15', '16 - 17', '18 - ...'];

const TeacherInfo = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [language, setLanguage] = useState('');
  const [biography, setBiography] = useState('');
  const [phone, setPhone] = useState(0);
  const [operator, setOperator] = useState('');
  const [agePreference, setAgePreference] = useState('');

  console.log('currentUser', currentUser);
  console.log('language', language);
  console.log('biography', biography);
  console.log('operator', operator);
  console.log('phone', phone);

  return (
    <div className={styles.content}>
      <SelectItem
        nameSelect='Language'
        value={language}
        setValue={setLanguage}
        selectArray={languages}
      />
      <TextAreaInfo value={biography} setValue={setBiography} />
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
    </div>
  );
};

export default TeacherInfo;
