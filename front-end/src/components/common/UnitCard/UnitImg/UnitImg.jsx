import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Context
import { CurrentUserContext } from 'context/AppProvider';

//Styles
import styles from './UnitImg.module.scss';
import EditIcon from '@mui/icons-material/Edit';

// Constants
import { ADMIN_ROLE } from 'constants/userRoles';

const UnitImg = ({ url, unit, level, image, editLink, type }) => {
  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);
  return (
    <div className={styles.unitImg}>
      {isAuthenticated && currentUser.role === ADMIN_ROLE && type === 'materials' && (
        <Link to={editLink} state={{ unit, level }}>
          <EditIcon className={styles.editIcon} fontSize='large' />
        </Link>
      )}
      {image && (
        <Link to={url} state={{ unit, level }}>
          <img src={image} />
        </Link>
      )}
      {!image && (
        <Link to={url} state={{ unit, level }}>
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
  level: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
};
UnitImg.defaultProps = {
  url: '',
  editLink: '',
  level: '',
  image: '',
  type: '',
};

export default UnitImg;
