import React from 'react';

// styles
import styles from './Topic.module.scss';

const Topic = ({
    topic
}) => {
    return(
        <span className={styles.topic}>{topic}</span>
    );
};

export default Topic;
