import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Context
import { CurrentUserContext } from 'context/AppProvider';

//Styles
import styles from './UnitImg.module.scss';
import EditIcon from '@mui/icons-material/Edit';

const UnitImg = (props) => {
  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);
  return (
    <div className={styles.unitImg}>
      {isAuthenticated && currentUser.role === 'admin' && (
        <Link to={`/app/materials/edit/${props.item.url}`}>
          <EditIcon className={styles.editIcon} fontSize='large' />
        </Link>
      )}
      {props.item.image && (
        <Link to={`/app/materials/${props.item.url}`}>
          <img src={props.item.image} />
        </Link>
      )}
      {!props.item.image && (
        <Link to={`/app/materials/${props.item.url}`}>
          <p className={styles.noImage}>{props.item.unit}</p>
        </Link>
      )}
    </div>
  );
};

//propTypes
UnitImg.propTypes = {
  item: PropTypes.object,
};
UnitImg.defaultProps = {
  item: {},
};

export default UnitImg;
