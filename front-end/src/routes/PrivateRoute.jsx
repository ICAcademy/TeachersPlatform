import React from 'react';
import PropTypes from 'prop-types';
import Login from 'pages/Login';

const PrivateRoute = ({ children }) => {
  const activated = localStorage.getItem('token');
  return activated ? children : <Login />;
};

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default PrivateRoute;
