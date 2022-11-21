import React from 'react';

// styles
import styles from './Title.module.scss';

const Title = ({
    title
}) => {
    return(
        <h2 className={styles.title}>{title}</h2>
    );
};

export default Title;
