import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { CurrentUserContext } from 'context/AppProvider';

import TodoItem from './TodoItem/TodoItem';

import useInput from 'hooks/useInput';

import { changeTodoStatus, createTodo, deleteTodoById, getAllTodo } from 'services/todoService';

import { REGEX_TODO } from 'helpers/regex';

import styles from './Todo.module.scss';

const todoHelperText = 'Must be less than 30 symbols';

const sx = {
  modal: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    borderRadius: '20px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  },
  modalTitle: {
    ml: '10px',
  },
};

const filterTodo = (list) => list.filter((item) => !item.isComplete);

const sortTodo = (list) =>
  list.sort((prev, curr) => new Date(curr.createdAt) - new Date(prev.createdAt));

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    value: enteredTodo,
    hasError: todoHasError,
    valueChangeHandler: todoChangeHandler,
    valueOnBlurHandler: todoOnBlurHandler,
    resetValue: resetTodo,
  } = useInput('todo', '', REGEX_TODO);

  const {
    currentUser: { roleId },
  } = useContext(CurrentUserContext);

  const fetchAllTodo = async (id) => {
    try {
      const response = await getAllTodo(id);
      setTodoList(response);
    } catch (error) {
      console.error(error);
    }
  };

  const createNewTodo = async () => {
    try {
      const body = {
        description: enteredTodo,
        creatorId: roleId,
      };
      const newTodo = await createTodo(body);
      setTodoList((prev) => sortTodo([...prev, newTodo]));
      resetTodo();
    } catch (error) {
      console.error(error);
    }
  };

  const changeStatus = async (id, body) => {
    try {
      const updatedTodo = await changeTodoStatus(id, body);
      const updatedList = todoList.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo,
      );
      setTodoList(updatedList);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const updatedTodo = await deleteTodoById(id);
      const updatedList = todoList.filter((todo) => todo._id !== updatedTodo._id);
      setTodoList(updatedList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllTodo(roleId);
  }, [roleId]);

  return (
    <Box className={styles.todo}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={sx.modal}>
          <Typography
            variant='h6'
            color='primary'
            className={styles.todo__title}
            sx={sx.modalTitle}
          >
            All todo:
          </Typography>
          {todoList.map((todo) => (
            <TodoItem
              key={todo._id}
              id={todo._id}
              description={todo.description}
              isComplete={todo.isComplete}
              handleChange={changeStatus}
              handleDelete={deleteTodo}
              filtered={false}
            />
          ))}
        </Box>
      </Modal>
      <Box className={styles.todo__header}>
        <Typography variant='h6' color='primary' className={styles.todo__title}>
          Todo list:
        </Typography>
        <Button variant='outlined' size='small' onClick={handleOpen}>
          Show All
        </Button>
      </Box>
      <Box className={styles.todo__list}>
        {filterTodo(todoList).length === 0 ? (
          <Box variant='span' className={styles.noTodo}>
            {`You have no unfinished todo for now :\(`}
          </Box>
        ) : (
          filterTodo(todoList).map((todo) => (
            <TodoItem
              key={todo._id}
              id={todo._id}
              description={todo.description}
              isComplete={todo.isComplete}
              handleChange={changeStatus}
              handleDelete={deleteTodo}
              filtered={true}
            />
          ))
        )}
      </Box>
      <Box className={styles.todo__add}>
        <TextField
          label='Description'
          size='small'
          fullWidth
          value={enteredTodo}
          onChange={todoChangeHandler}
          onBlur={todoOnBlurHandler}
          error={todoHasError}
          helperText={todoHasError ? todoHelperText : ''}
        />
        <Button variant='contained' disabled={todoHasError} onClick={createNewTodo}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default Todo;
