import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Private route
import PrivateRoute from 'routes/PrivateRoute';

// Components
import { Sidebar } from 'components/Sidebar/Sidebar';
import Header from 'components/common/Header/Header';
import Footer from 'components/common/Footer/Footer';

// Pages
import Login from 'pages/Login';
import Registration from 'pages/Registration';
import Main from 'pages/Main/Main';
import Material from 'pages/Material/Material';
import Materials from 'pages/Materials/Materials';

import NotFound from 'pages/NotFound';
import Tests from 'pages/Tests/Tests';

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
    <Route
      path='/app/tests'
      element={
        <PrivateRoute>
          <Tests />
        </PrivateRoute>
      }
    />
    <Route path='/login' element={<Login />} />
    <Route path='/registration' element={<Registration />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default RouterWrapper;
