import React from 'react';

// styles
import styles from './Explanation.module.scss';

const Explanation = ({
    explanation
}) => {
    return (
        <p className={styles.explanation}>{explanation}</p>
    );
};

export default Explanation;
