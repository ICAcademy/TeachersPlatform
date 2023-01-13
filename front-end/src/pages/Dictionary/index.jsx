import React, { useContext, useEffect, useState, useCallback } from 'react';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Services
import {
  createDictionary,
  getDictionaryByStudentId,
  updateDictionary,
  deleteDictionary,
} from 'services/dictionaryService';

// Components
import AddWord from 'components/Dictionary/AddWord';
import Loader from 'components/common/Loader/Loader';
import Table from 'components/Dictionary/Table';

// Styles
import styles from './Dictionary.module.scss';

const Dictionary = () => {
  const {
    currentUser: { roleId },
  } = useContext(CurrentUserContext);
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateDictionary = async (word, translation) => {
    try {
      setIsLoading(true);
      const newInstance = await createDictionary({ word, translation, studentId: roleId });
      setWords((prev) => [newInstance, ...prev]);
    } catch (error) {
      return error;
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
      return error;
    } finally {
      setIsLoading(false);
    }
  }, [roleId]);

  const handleUpdateDictionary = async (id, data) => {
    try {
      setIsLoading(true);
      const updatedWord = await updateDictionary(id, data);
      const updatedDictionary = words.map((item) => {
        return item._id === id ? updatedWord : item;
      });
      setWords(updatedDictionary);
    } catch (error) {
      return error;
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
    } catch (error) {
      return error;
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
      <AddWord isLoading={isLoading} createDictionary={handleCreateDictionary} />
      <Table
        loading={isLoading}
        dictionary={words}
        updateDictionary={handleUpdateDictionary}
        deleteWordById={deleteWordById}
      />
    </div>
  );
};

export default Dictionary;
