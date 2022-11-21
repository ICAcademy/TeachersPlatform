import { Button, Checkbox, Input } from '@mui/material';
import React, { useState } from 'react';

// styles
import styles from './Tests.module.scss';

const Tests = () => {
  const [question, setQuestion] = useState('Question');
  const [form, setForm] = useState({
    question: '',
    variants: [
      { id: 1, variant: 'variant1' },
      { id: 2, variant: 'variant2' },
    ],
  });

  console.log(question);
  console.log(form);

  const handleAddVariant = (variant) => {
    setForm({ ...form, variants: [...form.variants, variant] });
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
                {item.variant}
              </div>
            );
          })}
        </div>
        <div>
          <Button onClick={() => handleAddVariant({ id: 3, variant: 'Variant3' })}>
            Add Variant
          </Button>
        </div>
        <div>
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Tests;
