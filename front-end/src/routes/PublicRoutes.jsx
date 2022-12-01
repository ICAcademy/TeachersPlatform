import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import { Content } from 'components/Content/Content';
import Materials from 'pages/Materials/Materials';
import Material from 'pages/Material/Material';
import Main from 'pages/Main/Main';

import Questions from 'pages/Questions/Questions';
// import Quiz from 'pages/Quiz/Quiz';

const PublicRoutes = () => (
  <Routes>
    <Route path='/home' element={<Content />} />
    <Route path='/main' element={<Main />} />
    <Route path='/materials' element={<Materials />} />
    <Route path='/materials/:url' element={<Material />} />
    <Route path='/questions'>
      <Route index element={<Questions />} />
      {/* <Route path=':url' element={<Quiz />} /> */}
    </Route>
    <Route path='/main' element={<Main />} />
  </Routes>
);

export default PublicRoutes;
