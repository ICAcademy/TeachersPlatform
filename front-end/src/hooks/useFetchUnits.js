import { useState, useEffect } from 'react';
import { getQuestionsByUnitName, getUnitsByLevel } from 'services/questionService';
import { getUnitsOnLevel, getMaterialsByUnit } from 'services/MaterialsService/MaterialsService';

const useFetchUnits = (isEdit, searchUnit, selectedLevel, materialsOrQuestions) => {
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
              ? await getUnitsByLevel(selectedLevel)
              : await getUnitsOnLevel(selectedLevel);
          setData(units);
          setLoading(false);
          setError(null);
        }
        if (isEdit && searchUnit !== '') {
          setLoading(true);
          const questionsFromInput =
            materialsOrQuestions === 'question'
              ? await getQuestionsByUnitName({ searchUnit })
              : await getMaterialsByUnit({ unitName: searchUnit });
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
  }, [searchUnit, isEdit, selectedLevel, materialsOrQuestions]);
  return { data, loading, error };
};

export default useFetchUnits;
