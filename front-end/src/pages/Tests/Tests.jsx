import { Button, Checkbox, Input } from '@mui/material';
import React, { useState } from 'react';

// styles
import styles from './Tests.module.scss';
import {
  inputTitleStyles,
  inputDescriptionStyles,
  inputQuestinStyles,
  inputVariantStyles,
} from './styles';

const Tests = () => {
  const [question, setQuestion] = useState('Question');
  const [title, setTitle] = useState('New Test');
  const [description, setDescription] = useState('Description');
  const [form, setForm] = useState({
    title: 'Title',
    description: 'Description',
    question: '',
    variants: [
      { id: 0, variant: 'variant', right: false },
      { id: 1, variant: 'variant', right: false },
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

  const handleChangeRightAnswer = (id) => {
    setForm({
      ...form,
      variants: form.variants.map((variant) => {
        return id === variant.id
          ? { ...variant, right: !variant.right }
          : { ...variant, right: false };
      }),
    });
  };

  const handleChangeInput = (id, event) => {
    setForm({
      ...form,
      variants: form.variants.map((item) => {
        return id === item.id ? { id: item.id, variant: event } : { ...item };
      }),
    });
  };

  const handleDelete = (id) => {
    setForm({ ...form, variants: form.variants.filter((variant) => variant.id !== id) });
  };

  const handleAddVariant = (id) => {
    setForm({
      ...form,
      variants: [...form.variants, { id: id, variant: 'variant', right: false }],
    });
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
            <Input
              sx={inputDescriptionStyles}
              value={description}
              onChange={handleChangeDescription}
            />
          </div>
        </header>
        <div className={styles.configurateContainer}>
          <div className={styles.questionContainer}>
            <Input sx={inputQuestinStyles} value={question} onChange={handleChangeQuestion} />
          </div>
          <div className={styles.variantsContainer}>
            {form.variants.map((item) => {
              return (
                <div className={styles.variantContainer} key={item.id}>
                  <div>
                    <Checkbox
                      checked={item.right}
                      onChange={() => handleChangeRightAnswer(item.id)}
                    />
                  </div>
                  <div className={styles.inputVariantContainer}>
                    <Input
                      sx={inputVariantStyles}
                      defaultValue={item.variant}
                      onChange={(event) => handleChangeInput(item.id, event.target.value)}
                    />
                  </div>
                  <div>
                    <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.addVariantContainer}>
            <Button onClick={() => handleAddVariant(form.variants.length)}>Add Variant</Button>
          </div>
          <div className={styles.submitContainer}>
            <Button type='submit'>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Tests;
