import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import { Content } from 'components/Content/Content';
import { Box } from '@mui/material';
import Questions from 'components/Questions/Questions';
import Topics from 'components/Topics/Topics';
import Quiz from 'components/Quiz/Quiz';

const PublicRoutes = () => (
  <Box sx={{ backgroundColor: '#f6f9fb', minHeight: '970px', marginLeft: '16rem' }}>
    <Routes>
      <Route path='/home' element={<Content />} />
      <Route path='/questions' element={<Questions />} />
      <Route path='/questions/topic/:unit' element={<Topics />} />
      <Route path='/questions/topic/quiz/:topic' element={<Quiz />} />
    </Routes>
  </Box>
);

export default PublicRoutes;
