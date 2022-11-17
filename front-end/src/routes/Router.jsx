import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Questions from 'components/questions/Questions';

const Router = () => {
  return (
    <Routes location='/questions'>
      <Route path='/questions' element={<Questions />} />
    </Routes>
  );
};

export default Router;
