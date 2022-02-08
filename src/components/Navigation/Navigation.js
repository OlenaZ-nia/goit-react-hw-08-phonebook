import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/authSlice';

import s from './Navigation.module.css';

const Navigation = () => {
const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <>

      <nav>
      <NavLink to="/" className={({isActive})=> isActive ? s.activeLink : s.link}>
        Home
      </NavLink> |{" "}
      
      {isLoggedIn && <NavLink to="contacts" className={({ isActive }) => isActive ? s.activeLink : s.link}>
        Contacts
      </NavLink>}
      
      </nav>
    
    </>
  );
};

export default Navigation;