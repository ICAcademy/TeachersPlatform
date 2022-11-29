import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMaterialByUrl } from 'services/LessonsService/LessonsService';

//Components
import MaterialForm from './MaterialForm/MaterialForm';

//Styles
import styles from './AdminMaterial.module.scss';

const AdminMaterials = () => {
  const [material, setMaterial] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  const { url } = useParams();

  const getMaterialData = async (url) => {
    //setIsLoading(true);
    const material = await getMaterialByUrl(url);
    setMaterial(material);
    //setIsLoading(false);
  };

  useEffect(() => {
    getMaterialData(url);
  }, [url]);

  console.log(material);

  return (
    <div className={styles.adminMaterials}>
      <h1>Materials</h1>
      <MaterialForm material={material} />
    </div>
  );
};

export default AdminMaterials;
