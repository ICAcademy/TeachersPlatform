import React, { useContext, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Private route
import PrivateRoute from 'routes/PrivateRoute';

// Context
import { CurrentUserContext } from 'context/AppProvider';

// Components
import Profile from 'components/Profile/Profile';
import Loader from 'components/common/Loader/Loader';
import GeneralLayout from 'components/generalLayout/GeneralLayout';
import GeneralInfo from 'components/Profile/GeneralInfo/GeneralInfo';

// Pages
const Login = lazy(() => import('pages/Login'));
const Registration = lazy(() => import('pages/Registration'));
const Main = lazy(() => import('pages/Main/Main'));
const Material = lazy(() => import('pages/Material/Material'));
const Materials = lazy(() => import('pages/Materials/Materials'));
const NotFound = lazy(() => import('pages/NotFound'));
const Tests = lazy(() => import('pages/Tests/Tests'));
const Questions = lazy(() => import('pages/Questions/Questions'));
const Topics = lazy(() => import('pages/Topics/Topics'));
const Calendar = lazy(() => import('pages/Calendar/Calendar'));
const AdminMaterials = lazy(() => import('pages/Admin/AdminMaterials/AdminMaterial'));

const RouterWrapper = () => {
  const { isAuthenticated, currentUser } = useContext(CurrentUserContext);
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={isAuthenticated ? <Navigate to='/app' /> : <Main />} />
        <Route
          path='/app'
          element={
            <PrivateRoute>
              <GeneralLayout />
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
          <Route
            path='/app/materials/edit/:url'
            element={
              isAuthenticated &&
              currentUser.role === 'admin' && (
                <PrivateRoute>
                  <AdminMaterials />
                </PrivateRoute>
              )
            }
          />
          <Route
            path='/app/questions'
            element={
              <PrivateRoute>
                <Questions />
              </PrivateRoute>
            }
          />
          <Route
            path='/app/questions/:url'
            element={
              <PrivateRoute>
                <Topics />
              </PrivateRoute>
            }
          />
          <Route
            path='/app/calendar'
            element={
              <PrivateRoute>
                <Calendar />
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
    </Suspense>
  );
};

export default RouterWrapper;
