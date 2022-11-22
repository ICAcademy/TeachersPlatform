import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import { Content } from 'components/Content/Content';
import Main from 'pages/Main/Main';

const PublicRoutes = () => (
  <Routes>
    <Route path='/home' element={<Content />} />
    <Route path='/main' element={<Main />} />
  </Routes>
);

export default PublicRoutes;
