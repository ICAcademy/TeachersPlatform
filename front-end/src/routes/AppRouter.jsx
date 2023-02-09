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
import QuickAddWord from 'components/Dictionary/QuickAddWord';
import TeacherInfo from 'components/Profile/TeacherInfo/TeacherInfo';

// Constants
import { ADMIN_ROLE, STUDENT_ROLE, TEACHER_ROLE } from 'constants/userRoles';
import ChangePassword from 'pages/ChangePassword/ChangePassword';

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
const TeachersList = lazy(() => import('pages/TeachersList'));
const Teacher = lazy(() => import('pages/Teacher'));
const TeacherSubscriptions = lazy(() => import('pages/TeacherSubscriptions'));
const AdminMaterials = lazy(() => import('pages/Admin/AdminMaterials/AdminMaterial'));
const StudentSubscriptions = lazy(() => import('pages/StudentSubscriptions'));
const Finances = lazy(() => import('pages/Finances/Finances'));
const Dictionary = lazy(() => import('pages/Dictionary'));
const Lessons = lazy(() => import('pages/Lessons/Lessons'));
const Lesson = lazy(() => import('pages/Lesson/Lesson'));
const Dashboard = lazy(() => import('pages/Dashboard/Dashboard'));

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
          <Route
            index
            element={
              <PrivateRoute>
                {currentUser.role !== ADMIN_ROLE ? <Dashboard /> : <Navigate to='/app/materials' />}
              </PrivateRoute>
            }
          />
          <Route path='/app/profile' element={<Profile />}>
            <Route path='general-info' element={<GeneralInfo />} />
            <Route
              path='teacher-info'
              element={currentUser.role === TEACHER_ROLE && <TeacherInfo />}
            />
          </Route>
          <Route
            path='/app/materials'
            element={
              <PrivateRoute>
                <Materials />
                {currentUser.role !== ADMIN_ROLE && <QuickAddWord />}
              </PrivateRoute>
            }
          />
          <Route
            path='/app/materials/:url'
            element={
              <PrivateRoute>
                <Material />
                {currentUser.role !== ADMIN_ROLE && <QuickAddWord />}
              </PrivateRoute>
            }
          />
          <Route
            path='/app/materials/edit/:url'
            element={
              currentUser.role === ADMIN_ROLE && (
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
                {currentUser.role !== ADMIN_ROLE && <QuickAddWord />}
              </PrivateRoute>
            }
          />
          <Route
            path='/app/questions/:url'
            element={
              <PrivateRoute>
                <Topics />
                {currentUser.role !== ADMIN_ROLE && <QuickAddWord />}
              </PrivateRoute>
            }
          />
          <Route
            path='/app/questions/edit/:id'
            element={
              currentUser.role === ADMIN_ROLE && (
                <PrivateRoute>
                  <Tests />
                </PrivateRoute>
              )
            }
          />
          <Route
            path='/app/questions/new'
            element={
              currentUser.role === ADMIN_ROLE && (
                <PrivateRoute>
                  <Tests />
                </PrivateRoute>
              )
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
          <Route
            path='/app/teachers'
            element={
              currentUser?.role === STUDENT_ROLE ? (
                <PrivateRoute>
                  <TeachersList />
                </PrivateRoute>
              ) : (
                <Navigate to='/app' />
              )
            }
          />
          <Route
            path='/app/teachers/:id'
            element={
              currentUser?.role === STUDENT_ROLE ? (
                <PrivateRoute>
                  <Teacher />
                </PrivateRoute>
              ) : (
                <Navigate to='/app' />
              )
            }
          />
          <Route
            path='/app/subscriptions'
            element={
              currentUser?.role !== ADMIN_ROLE ? (
                <PrivateRoute>
                  {currentUser?.role === STUDENT_ROLE && <StudentSubscriptions />}
                  {currentUser?.role === TEACHER_ROLE && <TeacherSubscriptions />}
                </PrivateRoute>
              ) : (
                <Navigate to='/app/calendar' />
              )
            }
          />
          <Route
            path='/app/finances'
            element={
              <PrivateRoute>
                {currentUser?.role !== TEACHER_ROLE ? <Finances /> : <Navigate to='/app' />}
              </PrivateRoute>
            }
          />
          <Route
            path='/app/dictionary'
            element={
              <PrivateRoute>
                {currentUser?.role !== ADMIN_ROLE ? (
                  <Dictionary />
                ) : (
                  <Navigate to='/app/calendar' />
                )}
              </PrivateRoute>
            }
          />
          <Route
            path='/app/lessons'
            element={
              <PrivateRoute>
                {currentUser?.role !== ADMIN_ROLE ? <Lessons /> : <Navigate to='/app/calendar' />}
              </PrivateRoute>
            }
          />
          <Route
            path='/app/lessons/:id'
            element={
              <PrivateRoute>
                {currentUser?.role !== ADMIN_ROLE ? <Lesson /> : <Navigate to='/app/calendar' />}
                {currentUser.role !== ADMIN_ROLE && <QuickAddWord />}
              </PrivateRoute>
            }
          />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/reset-password' element={<ChangePassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterWrapper;
