import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { CurrentUserContext } from 'context/AppProvider';

import TodoItem from './TodoItem/TodoItem';

import { changeTodoStatus, deleteTodoById, getAllTodo } from 'services/todoService';

import styles from './Todo.module.scss';
import AddIcon from '@mui/icons-material/Add';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);

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
        {todoList.map((todo) => (
          <TodoItem
            key={todo._id}
            id={todo._id}
            description={todo.description}
            isComplete={todo.isComplete}
            handleChange={changeStatus}
            handleDelete={deleteTodo}
          />
        ))}
      </Box>
      <Button startIcon={<AddIcon />} variant='contained' sx={{ display: 'flex', m: '0 auto' }}>
        Add new task
      </Button>
    </Box>
  );
};

export default Todo;
