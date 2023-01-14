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

// HOC
import { withSnackbar } from 'components/withSnackbar/withSnackbar';

// Components
import AddWord from 'components/Dictionary/AddWord';
import SearchWord from 'components/Dictionary/SearchWord';
import Loader from 'components/common/Loader/Loader';
import Table from 'components/Dictionary/Table';

// Styles
import styles from './Dictionary.module.scss';

const Dictionary = ({ snackbarShowMessage }) => {
  const {
    currentUser: { roleId },
  } = useContext(CurrentUserContext);
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  const searchByWord = useCallback(async () => {
    try {
      setIsLoading(true);
      const newWords = await getDictionaryByStudentId({ studentId: roleId, search: searchWord });
      setWords(newWords);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  }, [roleId, searchWord]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      return searchByWord();
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchByWord]);

  const handleCreateDictionary = async (word, translation) => {
    try {
      setIsLoading(true);
      const newInstance = await createDictionary({ word, translation, studentId: roleId });
      setWords((prev) => [newInstance, ...prev]);
      snackbarShowMessage({
        message: 'Created word!',
        severity: 'success',
      });
    } catch (error) {
      snackbarShowMessage({
        message: error.response.data,
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDictionary = useCallback(async () => {
    try {
      setIsLoading(true);
      const dictionaryOfStudent = await getDictionaryByStudentId({ studentId: roleId });
      setWords(dictionaryOfStudent);
    } catch (error) {
      snackbarShowMessage({
        message: 'Something went wrong!',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, [roleId, snackbarShowMessage]);

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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDictionary();
  }, [fetchDictionary]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.wrap}>
      <h1 className={styles.title}>My dictionary</h1>
      <div className={styles.inputsWrap}>
        <AddWord isLoading={isLoading} createDictionary={handleCreateDictionary} />
        <SearchWord word={searchWord} handleInput={(e) => setSearchWord(e.target.value)} />
      </div>
      <Table
        loading={isLoading}
        dictionary={words}
        updateDictionary={handleUpdateDictionary}
        deleteWordById={deleteWordById}
      />
    </div>
  );
};

Dictionary.propTypes = {
  snackbarShowMessage: PropTypes.func,
};

export default withSnackbar(Dictionary);
