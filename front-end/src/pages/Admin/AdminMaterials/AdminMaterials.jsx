import React from 'react';
import CreateMaterial from './CreateMaterial/CreateMaterial';

//Styles
import styles from './AdminMaterials.module.scss';

const AdminMaterials = () => {
  return (
    <div className={styles.adminMaterials}>
      <h1>Materials</h1>
      <CreateMaterial />
    </div>
  );
};

export default AdminMaterials;
