import { useState, useEffect } from 'react';
import { getQuestionsByUnitName, getQuestionsUnitsByLevel } from 'services/questionService';
import {
  getMaterialsUnitsByLevel,
  getMaterialsByUnit,
} from 'services/MaterialsService/MaterialsService';

const useFetchUnits = (isEdit, searchUnit, selectedLevel, materialsOrQuestions, level) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        if (!isEdit) {
          setLoading(true);
          const units =
            materialsOrQuestions === 'question'
              ? await getQuestionsUnitsByLevel(selectedLevel)
              : await getMaterialsUnitsByLevel(selectedLevel);
          setData(units);
          setLoading(false);
          setError(null);
        }
        if (isEdit && searchUnit !== '') {
          setLoading(true);
          const questionsFromInput =
            materialsOrQuestions === 'question'
              ? await getQuestionsByUnitName({ searchUnit })
              : await getMaterialsByUnit({ level, unitName: searchUnit });
          setData(questionsFromInput);
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(error);
          setLoading(false);
          setData(null);
        }
      }
    })();
    return () => controller.abort();
  }, [searchUnit, isEdit, selectedLevel, materialsOrQuestions, level]);
  return { data, loading, error };
};

export default useFetchUnits;
