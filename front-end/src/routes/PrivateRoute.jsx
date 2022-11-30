import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

// Context
import { CurrentUserContext } from 'context/AppProvider';

const PrivateRoute = ({ children }) => {
  const { currentUser, isLoading } = useContext(CurrentUserContext);
  if (!isLoading) {
    return children;
  }

  if (!isLoading || Object.keys(currentUser).length === 0) {
    return <Navigate to='/login' replace />;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default PrivateRoute;
