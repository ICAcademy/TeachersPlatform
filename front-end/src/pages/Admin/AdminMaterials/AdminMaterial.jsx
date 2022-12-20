import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMaterialByUrl } from 'services/LessonsService/LessonsService';

//Components
import MaterialForm from './MaterialForm/MaterialForm';

//Services
import { getLevels } from 'services/MaterialsService/MaterialsService';

//Styles
import styles from './AdminMaterial.module.scss';
import Loader from 'components/common/Loader/Loader';

const AdminMaterials = () => {
  const [material, setMaterial] = useState({});
  const [levels, setLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { url } = useParams();

  //Understanding create or edit page by url
  const createAction = url === 'new' ? 'create' : '';

  const getData = async (url) => {
    try {
      setIsLoading(true);
      const material = await getMaterialByUrl(url);
      const levels = await getLevels();
      setMaterial(material);
      setLevels(levels);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const newMaterial = {
    level: '',
    unit: '',
    lessons: [],
    image: '',
    url: '',
  };

  useEffect(() => {
    getData(url);
  }, [url]);

  return (
    <div className={styles.adminMaterials}>
      <h1>Materials</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.formWrapper}>
          <MaterialForm material={material || newMaterial} levels={levels} create={createAction} />
        </div>
      )}
      {/* {snackbarShow && <SnackBar show={snackbarShow} message={snackbarMessage}></SnackBar>} */}
    </div>
  );
};

export default AdminMaterials;
