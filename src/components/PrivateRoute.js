import { useSelector } from 'react-redux';
import {  Navigate } from 'react-router-dom';

import { selectIsLoggedIn } from '../redux/auth/authSlice';

export default function PrivateRoute({
  element,
  redirectTo = "/",
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return <>{isLoggedIn ? element : <Navigate to={ redirectTo}/>}</>
}