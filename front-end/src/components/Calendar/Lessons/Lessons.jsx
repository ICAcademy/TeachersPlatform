import React from 'react';
import { Box, IconButton, Fade, Modal, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import styles from './Lessons.module.scss';

const Lessons = ({ isOpen, closeModal }) => {
  const addLesson = () => {};
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      disableAutoFocus
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box className={styles.modal}>
          <Box className={styles.modal__header}>
            <Typography variant='h6'>Lessons</Typography>
            <IconButton className={styles.modal__closeBtn} onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className={styles.modal__content}>
            <Box className={styles.modal__addBtn}>
              <Button startIcon={<AddIcon />} variant='text' onClick={addLesson}>
                <Typography variant='body1' className={styles.modal__addBtn__title}>
                  Add lesson
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

Lessons.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default Lessons;
