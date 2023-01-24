import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

import { CurrentUserContext } from 'context/AppProvider';

import TodoItem from './TodoItem/TodoItem';

import useInput from 'hooks/useInput';

import { changeTodoStatus, createTodo, deleteTodoById, getAllTodo } from 'services/todoService';

import { REGEX_TODO } from 'helpers/regex';

import styles from './Todo.module.scss';

const todoHelperText = 'Must be less than 30 symbols';

const sortTodo = (list) =>
  list.sort((prev, curr) => new Date(curr.createdAt) - new Date(prev.createdAt));

const Todo = () => {
  const [todoList, setTodoList] = useState([]);

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
      <Typography variant='h6' color='primary' className={styles.todo__title}>
        Todo list:
      </Typography>
      <Box className={styles.todo__list}>
        {todoList.length === 0 ? (
          <Box variant='span' className={styles.noTodo}>
            {`You have no todo for now :\(`}
          </Box>
        ) : (
          todoList.map((todo) => (
            <TodoItem
              key={todo._id}
              id={todo._id}
              description={todo.description}
              isComplete={todo.isComplete}
              handleChange={changeStatus}
              handleDelete={deleteTodo}
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
