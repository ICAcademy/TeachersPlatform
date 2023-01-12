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
import DictionaryTable from 'components/Dictionary/DictionaryTable';

// Styles
import styles from './Dictionary.module.scss';

const Dictionary = () => {
  const {
    currentUser: { roleId },
  } = useContext(CurrentUserContext);
  const [dictionary, setDictionary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateDictionary = async (word, translation) => {
    try {
      setIsLoading(true);
      const newInstance = await createDictionary({ word, translation, studentId: roleId });
      setDictionary((prev) => [newInstance, ...prev]);
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
      setDictionary(dictionaryOfStudent);
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
      const updatedDictionary = dictionary.map((item) => {
        return item._id === id ? updatedWord : item;
      });
      setDictionary(updatedDictionary);
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
      const updatedDictionary = dictionary.filter((word) => word._id !== id);
      setDictionary(updatedDictionary);
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
      <DictionaryTable
        loading={isLoading}
        dictionary={dictionary}
        updateDictionary={handleUpdateDictionary}
        deleteWordById={deleteWordById}
      />
    </div>
  );
};

export default Dictionary;
