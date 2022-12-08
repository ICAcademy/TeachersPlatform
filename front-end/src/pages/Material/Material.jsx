import Lessons from 'components/common/Lessons/Lessons';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//Services
import { getMaterialByUrl } from 'services/LessonsService/LessonsService';

//Styles
import styles from './Material.module.scss';

//Components
import Loader from 'components/common/Loader/Loader';

const Material = () => {
  const [material, setMaterial] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { url } = useParams();

  const getMaterialData = async (url) => {
    try {
      setIsLoading(true);
      const material = await getMaterialByUrl(url);
      setMaterial(material);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMaterialData(url);
  }, [url]);

  return (
    <div className={styles.materials}>
      {!isLoading && material != '' && (
        <Lessons level={material.level} unit={material.unit} lessons={material.lessons} />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default Material;
