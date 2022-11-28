import React, { useState } from 'react';
import CreateMaterial from './CreateMaterial/CreateMaterial';

//Styles
import styles from './AdminMaterials.module.scss';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const AdminMaterials = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.adminMaterials}>
      <h1>Materials</h1>
      <Button onClick={handleOpen} variant='contained' endIcon={<Add />}>
        Create material
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={styles.modalForm}>
          <CreateMaterial />
        </Box>
      </Modal>
    </div>
  );
};

export default AdminMaterials;
