import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Styles
import styles from './UnitImg.module.scss';
import EditIcon from '@mui/icons-material/Edit';

const UnitImg = (props) => {
  return (
    <div className={styles.unitImg}>
      <Link to={`/materials/edit/${props.item.url}`}>
        <EditIcon className={styles.editIcon} fontSize='large' />
      </Link>
      {props.item.image && (
        <Link to={`/materials/${props.item.url}`}>
          <img src={`http://localhost:5000/uploads/${props.item.image}`} />
        </Link>
      )}
      {!props.item.image && (
        <Link to={`/materials/${props.item.url}`}>
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
