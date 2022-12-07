import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Private route
import PrivateRoute from 'routes/PrivateRoute';

// Components
import { Sidebar } from 'components/Sidebar/Sidebar';
import Header from 'components/common/Header/Header';
import Footer from 'components/common/Footer/Footer';
import Profile from 'components/Profile/Profile';

// Pages
import Login from 'pages/Login';
import Registration from 'pages/Registration';
import Main from 'pages/Main/Main';
import Material from 'pages/Material/Material';
import Materials from 'pages/Materials/Materials';

import NotFound from 'pages/NotFound';
import GeneralInfo from 'components/Profile/GeneralInfo/GeneralInfo';

const RouterWrapper = () => (
  <Routes>
    <Route
      index
      element={
        <>
          <Header />
          <Main />
          <Footer />
        </>
      }
    />
    <Route
      path='/app'
      element={
        <PrivateRoute>
          <Sidebar />
        </PrivateRoute>
      }
    >
      <Route path='/app/profile' element={<Profile />}>
        <Route path='general-info' element={<GeneralInfo />} />
        <Route path='contact-info' element={<h1>This route is not created!!!</h1>} />
        <Route path='subjects' element={<h1>This route is not created!!!</h1>} />
        <Route path='languages' element={<h1>This route is not created!!!</h1>} />
      </Route>
      <Route
        path='/app/materials'
        element={
          <PrivateRoute>
            <Materials />
          </PrivateRoute>
        }
      />
      <Route
        path='/app/materials/:url'
        element={
          <PrivateRoute>
            <Material />
          </PrivateRoute>
        }
      />
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/registration' element={<Registration />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default RouterWrapper;
