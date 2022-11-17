import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Questions from 'components/quiz/Quiz';

const Router = () => {
  return (
    <Routes location='/questions'>
      <Route path='/questions' element={<Questions />} />
    </Routes>
  );
};

export default Router;
