import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Context
import { CurrentUserContext } from 'context/AppProvider';

//Styles
import styles from './UnitImg.module.scss';
import EditIcon from '@mui/icons-material/Edit';

const UnitImg = ({ url, unit, image, editLink, type }) => {
  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);
  return (
    <div className={styles.unitImg}>
      {isAuthenticated && currentUser.role === 'admin' && type === 'materials' && (
        <Link to={editLink}>
          <EditIcon className={styles.editIcon} fontSize='large' />
        </Link>
      )}
      {image && (
        <Link to={url}>
          <img src={image} />
        </Link>
      )}
      {!image && (
        <Link to={url}>
          <p className={styles.noImage}>{unit}</p>
        </Link>
      )}
    </div>
  );
};

//propTypes
UnitImg.propTypes = {
  url: PropTypes.string,
  editLink: PropTypes.string,
  unit: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
};
UnitImg.defaultProps = {
  url: '',
  editLink: '',
  unit: '',
  image: '',
  type: '',
};

export default UnitImg;
