import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Services
import userServices from 'services/userServices';

// Context
export const CurrentUserContext = createContext();

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    const accessToken = localStorage.getItem('token');
    try {
      const { data } = await userServices.getUser(accessToken);
      if (isLoading) {
        if (data) {
          setIsLoading(false);
          setCurrentUser(data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchUser, isLoading }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AppProvider;
