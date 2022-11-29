import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Content from 'components/Content/Content';

const PublicRoutes = () => (
  <Routes>
    <Route path='/home' element={<Content />} />
  </Routes>
);

export default PublicRoutes;
