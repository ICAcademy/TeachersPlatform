import React, { useState } from 'react';

// MUI library
import { Box, Typography, Modal, IconButton, TextField, Button } from '@mui/material';

// FontAwesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

// Styles
import styles from './EditModal.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 300,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  borderRadius: 4,
};

const EditModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.wrapper}>
      <IconButton onClick={handleOpen} aria-label='update'>
        <FontAwesomeIcon icon={faPen} width={15} height={15} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className={styles.headOfModal}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Edit word
            </Typography>
            <div className={styles.btnWrapper}>
              <IconButton>
                <FontAwesomeIcon icon={faBookBookmark} />
              </IconButton>
              <IconButton onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </div>
          </div>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '45ch' },
            }}
            noValidate
            autoComplete='off'
          >
            <div className={styles.block}>
              <TextField
                required
                id='outlined-required'
                name='word'
                // value={word}
                // onChange={handleWordChange}
                label='Word'
                size='small'
                align='center'
              />
              <TextField
                required
                id='outlined-required'
                name='translation'
                // value={translation}
                // onChange={handleTranslationChange}
                label='Translation'
                size='small'
                align='center'
              />
              <Button
                variant='contained'
                size='small'
                sx={{ width: 100, height: 40, my: 1.5 }}
                type='submit'
              >
                Update
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
