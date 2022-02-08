import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auth/authSlice';


export default function PublicRoute({
  redirectTo="/",
  restricted = false,
  element,
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return <>{isLoggedIn && restricted ? <Navigate to={redirectTo} /> : element}</>
}