import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

// Context
import { CurrentUserContext } from 'context/AppProvider';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return Object.keys(currentUser).length !== 0 ? children : <Navigate to='/login' replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default PrivateRoute;
