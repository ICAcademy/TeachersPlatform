import { Button, Checkbox, Input } from '@mui/material';
import React, { useState } from 'react';

// styles
import styles from './Tests.module.scss';

const inputTitleStyles = {
  fontWeight: 400,
  fontSize: '24pt',
  lineHeight: 1.25,
  letterSpacing: 0,
  border: 0,
};

const Tests = () => {
  const [question, setQuestion] = useState('Question');
  const [title, setTitle] = useState('New Test');
  const [description, setDescription] = useState('Description');
  const [form, setForm] = useState({
    title: 'Title',
    description: 'Description',
    question: '',
    variants: [
      { id: 0, variant: 'variant' },
      { id: 1, variant: 'variant' },
    ],
  });

  console.log('form', form);

  const handleChangeQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeInput = (id, event) => {
    setForm({
      ...form,
      variants: form.variants.map((item) => {
        return id === item.id ? { id: item.id, variant: event } : { ...item };
      }),
    });
  };

  const handleAddVariant = (id) => {
    setForm({ ...form, variants: [...form.variants, { id: id, variant: 'variant' }] });
  };

  const handleDelete = (id) => {
    setForm({ ...form, variants: form.variants.filter((variant) => variant.id !== id) });
  };

  const handleSubmit = (event) => {
    setForm({
      ...form,
      title: title,
      description: description,
      question: question,
    });
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form className={styles.newTestForm} onSubmit={handleSubmit}>
        <header className={styles.headerContainer}>
          <div className={styles.titleContainer}>
            <Input sx={inputTitleStyles} value={title} onChange={handleChangeTitle} />
          </div>
          <div className={styles.descriptionContainer}>
            <Input value={description} onChange={handleChangeDescription} />
          </div>
        </header>
        <div className={styles.inputContainer}>
          <Input value={question} onChange={handleChangeQuestion} />
        </div>
        <div>
          {form.variants.map((item) => {
            return (
              <div key={item.id}>
                <Checkbox />
                <Input
                  defaultValue={item.variant}
                  onChange={(event) => handleChangeInput(item.id, event.target.value)}
                />
                <Button onClick={() => handleDelete(item.id)}>Delete</Button>
              </div>
            );
          })}
        </div>
        <div>
          <Button onClick={() => handleAddVariant(form.variants.length)}>Add Variant</Button>
        </div>
        <div>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Tests;
