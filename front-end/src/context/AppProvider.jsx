import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Services
import userServices from 'services/userServices';

// Context
export const CurrentUserContext = createContext();

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const fetchUser = async () => {
    const accessToken = localStorage.getItem('token');
    try {
      const { data } = await userServices.getUser(accessToken);
      if (data) {
        setCurrentUser(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default AppProvider;
