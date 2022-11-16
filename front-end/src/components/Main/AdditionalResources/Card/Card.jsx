import Dollar from 'assets/icons/Dollar';
import FullArrowRight from 'assets/icons/FullArrowRight';
import React from 'react';

// styles
import styles from './Card.module.scss';

const Card = () => {
    return(
        <div className={styles.container}>
            <div className={styles.labelContainer}>
                <Dollar className={styles.dollar} width='20' height='20' fill='#fff' />
            </div>
            <div>
                <h3 className={styles.title}>Scolarships</h3>
            </div>
            <div className={styles.explanationContainer}>
                <p className={styles.explanation}>ScholarshipPortal is the best scholarship website for international students looking to meet their financial needs.</p>
            </div>
            <div className={styles.learnMoreContainer}>
                <a className={styles.learnMore}>Learn more</a>
                <FullArrowRight className={styles.arrow} width='15' height='15' fill='#9000FF' />
            </div>
        </div>
    );
};

export default Card;
