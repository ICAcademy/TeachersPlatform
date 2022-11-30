import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import { Content } from 'components/Content/Content';
import { Box } from '@mui/material';
import Materials from 'pages/Materials/Materials';
import Material from 'pages/Material/Material';
import Main from 'pages/Main/Main';

import Questions from 'components/Questions/Questions';
import Topics from 'components/Topics/Topics';
import Quiz from 'components/Quiz/Quiz';

const PublicRoutes = () => (
  <Box sx={{ backgroundColor: '#f6f9fb', minHeight: '970px', marginLeft: '16rem', px: '2.5rem' }}>
    <Routes>
      <Route path='/home' element={<Content />} />
      <Route path='/main' element={<Main />} />
      <Route path='/materials' element={<Materials />} />
      <Route path='/materials/:url' element={<Material />} />
      <Route path='/questions'>
        <Route index element={<Questions />} />
        <Route path='topic/:unit' element={<Topics />} />
        <Route path='topic/quiz/:topic' element={<Quiz />} />
      </Route>
      <Route path='/main' element={<Main />} />
    </Routes>
  </Box>
);

export default PublicRoutes;
