import React from 'react';

// Components
import AddWord from 'components/Dictionary/AddWord';
import DictionaryTable from 'components/Dictionary/DictionaryTable';

// Styles
import styles from './Dictionary.module.scss';

const subscriptions = [{}, {}];

const Dictionary = () => {
  return (
    <div className={styles.wrapper}>
      <h1>My dictionary</h1>
      <AddWord />
      <DictionaryTable subscriptions={subscriptions} />
    </div>
  );
};

export default Dictionary;
