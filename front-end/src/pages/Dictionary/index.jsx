import React, { useContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Services
import {
  createDictionary,
  getDictionaryByStudentId,
  updateDictionary,
  deleteDictionary,
} from 'services/dictionaryService';
import { getTeachersSubscription } from 'services/subscriptionService';

// Constants
import { TEACHER_ROLE } from 'constants/userRoles';

// HOC
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

// Components
import Table from 'components/Dictionary/Table';
import AddWord from 'components/Dictionary/AddWord';
import Loader from 'components/common/Loader/Loader';
import SearchWord from 'components/Dictionary/SearchWord';
import StudentsSelect from 'components/Dictionary/StudentsSelect';

// Styles
import styles from './Dictionary.module.scss';

const sx = {
  formControl: {
    my: 1,
    ml: 0,
    mr: 1,
    width: '30ch',
    ['@media (max-width: 1100px)']: { width: '24ch' },
    ['@media (max-width: 550px)']: { width: '97%', mx: 1 },
  },
};

const Dictionary = ({ snackbarShowMessage }) => {
  const {
    currentUser: { roleId, role },
  } = useContext(CurrentUserContext);

  const [words, setWords] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const isTeacher = role === TEACHER_ROLE;
  const selectHasError = isTeacher && selectedStudentId === '';

  const getId = useCallback(() => {
    if (isTeacher) {
      return selectedStudentId;
    }
    return roleId;
  }, [isTeacher, roleId, selectedStudentId]);

  const fetchSubscriptions = useCallback(async (id) => {
    try {
      const subscriptions = await getTeachersSubscription(id);
      setStudents(subscriptions);
    } catch (error) {
      return error;
    }
  }, []);

  const handleCreateDictionary = async (word, translation) => {
    try {
      setIsLoading(true);
      const newInstance = await createDictionary({ word, translation, studentId: getId() });
      setWords((prev) => [newInstance, ...prev]);
      snackbarShowMessage({
        message: 'Created word!',
        severity: 'success',
      });
    } catch (error) {
      snackbarShowMessage({
        message:
          error.response.data === 'This word already exist'
            ? error.response.data
            : 'Something went wrong!',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDictionary = useCallback(async () => {
    try {
      setIsLoading(true);
      const dictionaryOfStudent = await getDictionaryByStudentId({ studentId: getId() });
      setWords(dictionaryOfStudent);
    } catch (error) {
      snackbarShowMessage({
        message: 'Something went wrong!',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [getId, snackbarShowMessage]);

  const searchByWord = useCallback(async () => {
    try {
      setIsLoading(true);
      const newWords = await getDictionaryByStudentId({
        studentId: getId(),
        search: searchWord,
      });
      setWords(newWords);
    } catch (error) {
      snackbarShowMessage({
        message: 'Something went wrong',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [getId, searchWord, snackbarShowMessage]);

  useEffect(() => {
    if (searchWord !== '') {
      const delayDebounceFn = setTimeout(() => {
        return searchByWord();
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchByWord, searchWord]);

  const handleUpdateDictionary = async (id, data) => {
    try {
      setIsLoading(true);
      const updatedWord = await updateDictionary(id, data);
      const updatedDictionary = words.map((item) => {
        return item._id === id ? updatedWord : item;
      });
      setWords(updatedDictionary);
      snackbarShowMessage({
        message: 'Successfully updated!',
        severity: 'success',
      });
    } catch (error) {
      snackbarShowMessage({
        message: 'Something went wrong!',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWordById = async (id) => {
    try {
      await deleteDictionary(id);
      const updatedDictionary = words.filter((word) => word._id !== id);
      setWords(updatedDictionary);
      snackbarShowMessage({
        message: 'Successfully deleted!',
        severity: 'success',
      });
    } catch (error) {
      snackbarShowMessage({
        message: 'Something went wrong!',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    if (selectedStudentId !== '' && searchWord === '') {
      fetchDictionary();
    }
  }, [fetchDictionary, searchWord, selectedStudentId]);

  useEffect(() => {
    if (!isTeacher && searchWord === '') {
      fetchDictionary();
    }
  }, [fetchDictionary, isTeacher, searchWord]);

  useEffect(() => {
    if (isTeacher) {
      fetchSubscriptions(roleId);
    }
  }, [fetchSubscriptions, isTeacher, roleId]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.wrap}>
      <h1 className={styles.title}>My dictionary</h1>
      {role === TEACHER_ROLE ? (
        <StudentsSelect
          students={students}
          style={sx.formControl}
          selectError={selectHasError}
          studentId={selectedStudentId}
          handleStudentId={(student) => setSelectedStudentId(student)}
        />
      ) : (
        ''
      )}
      <div className={styles.inputsWrap}>
        <AddWord
          isLoading={isLoading}
          selectError={selectHasError}
          createDictionary={handleCreateDictionary}
        />
        <SearchWord
          word={searchWord}
          selectError={selectHasError}
          handleInput={(e) => setSearchWord(e.target.value)}
        />
      </div>
      <Table
        dictionary={words}
        loading={isLoading}
        isTeacher={isTeacher}
        deleteWordById={deleteWordById}
        updateDictionary={handleUpdateDictionary}
      />
    </div>
  );
};

Dictionary.propTypes = {
  snackbarShowMessage: PropTypes.func,
};

export default withSnackbar(Dictionary);
