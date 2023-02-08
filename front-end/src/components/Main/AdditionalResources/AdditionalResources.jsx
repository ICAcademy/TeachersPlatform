import React from 'react';

// components
import Topic from '../common/Topic/Topic';
import Title from '../common/Title/Title';
import Card from '../common/Card/Card';

// assets
import { faDollarSign, faRectangleList } from '@fortawesome/free-solid-svg-icons';

// styles
import styles from './AdditionalResources.module.scss';

const AdditionalResources = () => {
  const infoForScolarship =
    ' ScholarshipPortal is the best scholarship website for international students looking to meet their financial needs.';

  const infoForCatalog =
    'Throughout the General Catalog, and in every class offered at National University, you will see a consistent focus on quality.';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topicContainer}>
          <Topic topic={'FALL 2021 & SPRING 2022'} />
        </div>
        <div>
          <Title title={'Additional Resources'} />
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.cardContainer}>
            <Card img={faDollarSign} header={'Scolarship'} info={infoForScolarship} />
          </div>
          <div className={styles.cardContainer}>
            <Card img={faRectangleList} header={'University catalog'} info={infoForCatalog} />
          </div>
          <div className={styles.cardContainer}>
            <Card img={faDollarSign} header={'Scolarship'} info={infoForScolarship} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalResources;
