import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppBar from './components/AppBar/AppBar';

import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

import 'modern-normalize/modern-normalize.css';

import { useGetCurrentUserQuery } from './services/users';
import { Spinner } from './components/Spinner/Spinner';

import HomeView from './views/HomeView';

const LoginView = lazy(() => import('./views/LoginView' /* webpackChunkName: "login-page" */));
const RegisterView = lazy(() => import('./views/RegisterView' /* webpackChunkName: "register-page" */));
const ContactsView = lazy(()=>import ('./views/ContactsView' /* webpackChunkName: "contacts-page" */)) ;


export default function App() {

  const { error}=useGetCurrentUserQuery();

  useEffect(() => {
    if (error) {
      console.log("Error:", error.data.message);
    }
  }, [error])

  return (

    <>
      <Suspense fallback={<div style={{display: 'flex', height:'100vh', justifyContent: 'center', alignItems:'center'}}><Spinner/></div>}>
        <Routes>
        <Route path="/" element={<AppBar />}>

          <Route index element={<HomeView />} />
          <Route path="contacts" element={<PrivateRoute element={<ContactsView />} redirectTo="/login"/>} />
          <Route path="register" element={<PublicRoute element={<RegisterView />} redirectTo="/contacts" restricted/>} />
          <Route path="login" element={<PublicRoute element={<LoginView />} redirectTo="/contacts" restricted />} />
          
          <Route path="*" element={<Navigate to="/" />} />
          
        </Route>
      </Routes> 
      </Suspense>
      <ToastContainer autoClose={3000} theme={'dark'} />
      
    </>
    
    );
}






