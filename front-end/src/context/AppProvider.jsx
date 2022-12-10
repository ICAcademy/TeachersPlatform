import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Services
import { userService } from 'services/userService';

// Context
export const CurrentUserContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const { data } = accessToken ? await userService.getUser(accessToken) : isAuthenticated;
      if (data) {
        setCurrentUser(data);
        setIsLoading(false);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error(e);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchUser, isLoading, isAuthenticated }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AppProvider;
