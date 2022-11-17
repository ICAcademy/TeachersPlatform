import React from 'react';
import styles from './Container.module.scss';
import { Sidebar } from 'components/sidebar/Sidebar';
import { Content } from 'components/content/Content';

export const Container = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Content />
    </div>
  );
};
