import React from 'react';

// components
import Topic from '../common/Topic/Topic';
import Title from '../common/Title/Title';
import Card from '../common/Card/Card';

// styles
import styles from './AdditionalResources.module.scss';

const AdditionalResources = () => {
    return(
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
                        <Card />
                    </div>
                    <div className={styles.cardContainer}>
                        <Card />
                    </div>
                    <div className={styles.cardContainer}>
                        <Card />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditionalResources;
