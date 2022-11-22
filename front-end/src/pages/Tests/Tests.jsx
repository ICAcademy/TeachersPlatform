import { Button, Checkbox, Input } from '@mui/material';
import React, { useState } from 'react';

// styles
import styles from './Tests.module.scss';

const Tests = () => {
  const [question, setQuestion] = useState('Question');
  const [form, setForm] = useState({
    question: '',
    variants: [
      { id: 0, variant: 'variant' },
      { id: 1, variant: 'variant' },
    ],
  });

  console.log('form', form);

  const handleAddVariant = (id) => {
    setForm({ ...form, variants: [...form.variants, { id: id, variant: 'variant' }] });
  };

  const handleChangeInput = (id, event) => {
    setForm({
      ...form,
      variants: form.variants.map((item) => {
        return id === item.id ? { id: item.id, variant: event } : { ...item };
      }),
    });
  };

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    setForm({ ...form, question: question });
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>New Test</h1>
      </div>
      <form className={styles.newTestForm} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <Input value={question} onChange={handleChange} />
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
