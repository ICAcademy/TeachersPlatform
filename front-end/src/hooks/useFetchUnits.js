import { useState, useEffect } from 'react';
import { getQuestionsByUnitName, getUnitsByLevel } from 'services/questionService';

const useFetchUnits = (isEdit, searchUnit, selectedLevel) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        if (!isEdit) {
          setLoading(true);
          const units = await getUnitsByLevel(selectedLevel);
          setData(units);
          setLoading(false);
          setError(null);
        }
        if (isEdit && searchUnit !== '') {
          setLoading(true);
          const questionsFromInput = await getQuestionsByUnitName({ searchUnit });
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
  }, [searchUnit, isEdit, selectedLevel]);
  return { data, loading, error };
};

export default useFetchUnits;
