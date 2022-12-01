import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Context
import { CurrentUserContext } from 'context/AppProvider';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(CurrentUserContext);

  if (!isLoading) {
    return isAuthenticated ? children || <Outlet /> : <Navigate to={'/login'} />;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default PrivateRoute;
