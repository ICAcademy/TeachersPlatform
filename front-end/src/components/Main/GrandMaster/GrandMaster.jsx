import React from 'react';

// components
import Topic from '../common/Topic/Topic';

// assets
import adminSign from '../../../assets/images/adminSign.png';
import students from '../../../assets/images/students.jpeg';

// styles
import styles from './GrandMaster.module.scss';
import Title from '../common/Title/Title';

const GrandMaster = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.grandMasterContainer}>
                    <div className={styles.topicContainer}>
                        <Topic topic={'grandmaster talk'} />
                    </div>
                    <div className={styles.titleContainer}>
                        <Title title={'Education runs you towards success rapidly'} />
                    </div>
                    <div className={styles.infoContainer}>
                        <p className={styles.info}>
                            Education is the essential thing for our life, and it helps in the growth
                            of human civilization. Education is necessary to understand the
                            universe around us and convert it into something more beneficial.
                            With the help of knowledge, we can develop a new perspective for
                            our life.
                        </p>
                    </div>
                    <div className={styles.adminSignContainer}>
                        <div>
                            <img src={adminSign} />
                        </div>
                        <div className={styles.adminContainer}>
                            <p className={styles.admin}>Calvart luin</p>
                        </div>
                    </div>
                </div>
                <div className={styles.imgContainer}>
                    <img className={styles.studentsImg} src={students} />
                    <div className={styles.colorBackground}></div>
                </div>
            </div>
        </div>
    );
};

export default GrandMaster;
