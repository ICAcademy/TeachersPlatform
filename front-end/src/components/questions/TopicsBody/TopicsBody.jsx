import React, { useContext } from 'react';
import { CurrentUserContext } from 'context/AppProvider';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './TopicsBody.module.scss';
import EditIcon from '@mui/icons-material/Edit';

const TopicsBody = ({ topics, selectHandler, fullscreen }) => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);

  const topicsList = topics.map((item, i) => (
    <div className={styles.topic} key={item._id} onClick={() => selectHandler(item._id)}>
      <div className={styles.topic__index}>{i + 1}</div>
      {!fullscreen && (
        <>
          <p className={styles.topic__title}>{item.topic}</p>
          <FontAwesomeIcon icon={faArrowRight} />
          {isAuthenticated && currentUser.role === 'admin' && (
            <Link to={`/app/questions/edit/${item.url}`}>
              <EditIcon className={styles.editIcon} fontSize='medium' />
            </Link>
          )}
        </>
      )}
    </div>
  ));

  return (
    <>
      <div className={styles.section__head}>
        {!fullscreen && <h3>Topics</h3>}
        <div className={styles.section__backBtn} onClick={() => navigate(-1)}>
          Back to units
        </div>
      </div>
      <div className={styles.section__body}>{topicsList}</div>
    </>
  );
};

TopicsBody.propTypes = {
  topics: PropTypes.array,
  selectHandler: PropTypes.func,
  fullscreen: PropTypes.bool,
};

TopicsBody.defaultProps = {
  topics: [],
};

export default TopicsBody;
