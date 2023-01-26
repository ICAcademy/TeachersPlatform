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

// Socket
import { socket } from 'services/socketService';

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
      await createDictionary({ word, translation, studentId: getId() });
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
      return error;
    } finally {
      setIsLoading(false);
    }
  }, [getId]);

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

  const handleUpdateDictionary = useCallback(
    async (id, data) => {
      try {
        setIsLoading(true);
        await updateDictionary(id, data);
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
    },
    [snackbarShowMessage],
  );

  const deleteWordById = useCallback(
    async (id) => {
      try {
        await deleteDictionary(id);
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
    },
    [snackbarShowMessage],
  );

  useEffect(() => {
    if (searchWord === '') {
      if (selectedStudentId !== '' || !isTeacher) {
        fetchDictionary();
      }
    }
  }, [fetchDictionary, isTeacher, searchWord, selectedStudentId]);

  useEffect(() => {
    if (isTeacher) {
      fetchSubscriptions(roleId);
    }
  }, [fetchSubscriptions, isTeacher, roleId]);

  const fnSetWords = useCallback(
    (data) => {
      if (
        data?.studentId === roleId ||
        (role === TEACHER_ROLE && selectedStudentId === data?.studentId)
      ) {
        setWords((prev) => [data, ...prev]);
      }
    },
    [role, roleId, selectedStudentId],
  );

  useEffect(() => {
    socket.on('create_dictionary', (data) => fnSetWords(data));

    return () => {
      socket.removeAllListeners('create_dictionary');
    };
  }, [fnSetWords]);

  const fnUpdateDictionary = useCallback(
    (data) => {
      const updatedDictionary = words.map((item) => {
        return item._id === data._id ? data : item;
      });
      setWords(updatedDictionary);
    },
    [words],
  );

  useEffect(() => {
    socket.on('update_dictionary', (data) => fnUpdateDictionary(data));

    return () => {
      socket.removeAllListeners('update_dictionary');
    };
  }, [fnUpdateDictionary]);

  useEffect(() => {
    socket.on('delete_dictionary', (id) => {
      const updatedDictionary = words.filter((word) => word._id !== id);
      setWords(updatedDictionary);
    });

    return () => {
      socket.removeAllListeners('delete_dictionary');
    };
  }, [words]);

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
