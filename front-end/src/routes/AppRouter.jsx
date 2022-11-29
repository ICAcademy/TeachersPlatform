import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Private route
import PrivateRoute from 'routes/PrivateRoute';

// Components
import Content from 'components/Content/Content';
import { NotFound } from 'components/NotFound/NotFound';
import { Sidebar } from 'components/Sidebar/Sidebar';

// Pages
import Login from 'pages/Login';
import Registration from 'pages/Registration';

const RouterWrapper = () => (
  <Routes>
    <Route index element={<Content />} />
    <Route
      path='/app'
      element={
        <PrivateRoute>
          <Sidebar />
          <h1>App</h1>
        </PrivateRoute>
      }
    />
    <Route path='/login' element={<Login />} />
    <Route path='/registration' element={<Registration />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

export default RouterWrapper;
