import { Button, Checkbox, Input } from '@mui/material';
import React, { useState } from 'react';

// styles
import styles from './Tests.module.scss';

const Tests = () => {
  const [question, setQuestion] = useState('Question');
  const [variant, setVariant] = useState('variant');
  const [variants, setVariants] = useState([]);
  const [form, setForm] = useState({
    question: '',
    variants: [
      { id: 1, variant: variant },
      { id: 2, variant: variant },
    ],
  });

  console.log('form', form);
  console.log('variant', variant);
  console.log('variants', variants);

  const handleAddVariant = (variant) => {
    setForm({ ...form, variants: [...form.variants, variant] });
  };

  const handleChangeInput = (id, event) => {
    setVariant(event);
    console.log(id);
    /* setForm({
      ...form,
      variants: form.variants.map((item) => {
        id === item.id ? { ...form.variants, variant: event } : { ...item };
        console.log(item);
      }),
    }); */
    const res = { id: id, variant: event };
    setVariants([...variants, res]);
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
                  defaultValue={variant}
                  onChange={(event) => handleChangeInput(item.id, event.target.value)}
                />
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
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Tests;
