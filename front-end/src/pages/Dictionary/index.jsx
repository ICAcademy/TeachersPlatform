import React, { useContext, useEffect, useState, useCallback } from 'react';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Services
import {
  createDictionary,
  getDictionaryByStudentId,
  updateDictionaryById,
  deleteDictionary,
} from 'services/dictionaryService';

// Components
import AddWord from 'components/Dictionary/AddWord';
import AddWordModal from 'components/Dictionary/AddWordModal';
import DictionaryTable from 'components/Dictionary/DictionaryTable';

// Styles
import styles from './Dictionary.module.scss';

const Dictionary = () => {
  const {
    currentUser: { roleId },
  } = useContext(CurrentUserContext);
  const [dictionary, setDictionary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCreateDictionary = async (word, translation) => {
    try {
      setIsLoading(true);
      const newInstance = await createDictionary({ studentId: roleId, word, translation });
      setDictionary((prev) => [newInstance, ...prev]);
    } catch (error) {
      setIsLoading(false);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDictionary = useCallback(async () => {
    try {
      setIsLoading(true);
      const dictionaryOfStudent = await getDictionaryByStudentId({
        studentId: roleId,
      });
      setDictionary(dictionaryOfStudent);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  }, [roleId]);

  const updateDictionary = async (id, data) => {
    try {
      setIsLoading(true);
      const updatedWord = await updateDictionaryById(id, data);
      const updatedDictionary = dictionary.map((item) => {
        return item._id === id ? updatedWord : item;
      });
      setDictionary(updatedDictionary);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWordById = async (id) => {
    try {
      setIsLoading(true);
      await deleteDictionary(id);
      const updatedDictionary = dictionary.filter((word) => {
        return word._id !== id;
      });
      setDictionary(updatedDictionary);
    } catch (e) {
      return e;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDictionary();
  }, [fetchDictionary]);

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>My dictionary</h1>
      <AddWord isLoading={isLoading} createDictionary={fetchCreateDictionary} />
      <DictionaryTable
        loading={isLoading}
        dictionary={dictionary}
        createDictionary={fetchCreateDictionary}
        updateDictionary={updateDictionary}
        deleteWordById={deleteWordById}
      />
    </div>
  );
};

export default Dictionary;
