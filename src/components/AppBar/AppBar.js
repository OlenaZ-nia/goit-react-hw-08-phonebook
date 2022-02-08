import React from 'react';
import s from './AppBar.module.css';

import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import { selectIsLoggedIn } from '../../redux/auth/authSlice';

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>
      <header className={s.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </header>
      <Outlet/>
    </>
  );
}