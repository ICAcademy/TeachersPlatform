import React from 'react';

// assets
import teacher from '../../../../assets/images/teacher.jpeg';

// styles
import styles from './Card.module.scss';

const Card = () => {
    return (
        <div className={styles.container}>
            <div className={styles.teacherContainer}>
                <img className={styles.teacher} src={teacher} alt="teacher" />
            </div>
            <div className={styles.nameContainer}>
                <a className={styles.name} href="*">Jenny Wilson</a>
            </div>
            <div className={styles.paymentContainer}>
                <p className={styles.payment}>8,425 Pts</p>
            </div>
        </div>
    );
};

export default Card;
