import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Context
import { CurrentUserContext } from 'context/AppProvider';

//Styles
import styles from './UnitImg.module.scss';
import EditIcon from '@mui/icons-material/Edit';

const UnitImg = ({ url, unit, image }) => {
  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);
  return (
    <div className={styles.unitImg}>
      {isAuthenticated && currentUser.role === 'admin' && (
        <Link to={`/app/materials/edit/${url}`}>
          <EditIcon className={styles.editIcon} fontSize='large' />
        </Link>
      )}
      {image && (
        <Link to={`/app/materials/${url}`}>
          <img src={image} />
        </Link>
      )}
      {!image && (
        <Link to={`/app/materials/${url}`}>
          <p className={styles.noImage}>{unit}</p>
        </Link>
      )}
    </div>
  );
};

//propTypes
UnitImg.propTypes = {
  url: PropTypes.string,
  unit: PropTypes.string,
  image: PropTypes.string,
};
UnitImg.defaultProps = {
  url: '',
  unit: '',
  image: '',
};

export default UnitImg;
