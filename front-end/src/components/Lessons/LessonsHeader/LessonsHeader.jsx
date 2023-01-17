import React, { useState } from 'react';
import { Popover, Typography } from '@mui/material';
import PropTypes from 'prop-types';

//Styles
import styles from './LessonsHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const LessonsHeader = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [participantName, setParticipantName] = useState('');

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setParticipantName(event.currentTarget.dataset.value);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const lessonsCount = props.numberOfLessons ? (
    <div className={`${styles.lessonInfoItem}`}>
      <div className={`${styles.roundedCircle}  ${styles.yellow}`}>
        <FontAwesomeIcon icon={faBook} />
      </div>
      <div className={styles.infoLabel}>
        <h5>Lessons</h5>
        <div className={styles.infoValue}>{props.numberOfLessons}</div>
      </div>
    </div>
  ) : (
    ''
  );

  const getStatus = (img, alt, name) => (
    <>
      <img
        className={styles.statusItem}
        src={img}
        alt={alt}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        data-value={name}
      />
      <Popover
        id='mouse-over-popover'
        sx={{
          pointerEvents: 'none',
        }}
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{participantName}</Typography>
      </Popover>
    </>
  );

  const teacherStatus =
    props.teacherStatus === 'online' &&
    getStatus(props.teacherImg, 'Student img', props.teacherName);

  const studentStatus =
    props.studentStatus === 'online' &&
    getStatus(props.studentImg, 'Student img', props.studentName);

  return (
    <div className={styles.lessonHeader}>
      <h1>{props.title}</h1>
      <div className={styles.lessonHeaderInfo}>
        <div className={styles.lessonInfoItem}>
          <div className={`${styles.roundedCircle}  ${styles.red}`}>
            <FontAwesomeIcon icon={faGraduationCap} />
          </div>
          <div className={styles.infoLabel}>
            <h5>Level</h5>
            <div className={styles.infoValue}>{props.level}</div>
          </div>
          {lessonsCount}
        </div>
        <div className={styles.statuses}>
          {teacherStatus}
          {studentStatus}
        </div>
      </div>
    </div>
  );
};

LessonsHeader.propTypes = {
  title: PropTypes.string,
  level: PropTypes.string,
  numberOfLessons: PropTypes.number,
  teacherStatus: PropTypes.string,
  studentStatus: PropTypes.string,
  teacherName: PropTypes.string,
  studentName: PropTypes.string,
  teacherImg: PropTypes.string,
  studentImg: PropTypes.string,
};
LessonsHeader.defaultProps = {
  title: '',
  level: '',
  numberOfLessons: 0,
  teacherStatus: 'offline',
  studentStatus: 'offline',
  teacherName: '',
  studentName: '',
  teacherImg: '',
  studentImg: '',
};

export default LessonsHeader;
