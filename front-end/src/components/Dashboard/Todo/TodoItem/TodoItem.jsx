import React from 'react';
import { Box, Checkbox, IconButton } from '@mui/material';
import PropTypes from 'prop-types';

import styles from './TodoItem.module.scss';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const TodoItem = ({ id, description, isComplete, handleChange, handleDelete, filtered }) => {
  return (
    <Box className={styles.todo__item}>
      <Box className={styles.todo__info}>
        <Box className={isComplete && styles.todo__complete}>{description}</Box>
        <Checkbox
          checked={isComplete}
          onChange={(e) => handleChange(id, { isComplete: e.target.checked })}
          sx={{ ml: 'auto' }}
        />
      </Box>
      {!filtered && (
        <Box className={styles.todo__delete}>
          <IconButton edge='end' aria-label='delete' onClick={() => handleDelete(id)}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  isComplete: PropTypes.bool,
  handleChange: PropTypes.func,
  handleDelete: PropTypes.func,
  filtered: PropTypes.bool,
};

export default TodoItem;
