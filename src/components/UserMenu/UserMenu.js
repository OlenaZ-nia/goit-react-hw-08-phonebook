import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/auth/authSlice';
import { useLogoutMutation } from '../../services/users';
// import defaultAvatar from './default-avatar.png';
import icone from '../../images/imageok.png';
import Button from '@mui/material/Button';

import s from './UserMenu.module.css';



export default function UserMenu() {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const [logOut] = useLogoutMutation();

  return (
    <div className={s.container}>
      {/* <img src={avatar} alt="" width="32" className={styles.avatar} /> */}
      <span className={s.avatar}></span>
      <span className={s.name}>Welcome, {userName} </span>
      <img src={icone} alt="" width="32" className={s.icone} />

      <Button variant="outlined" type='button' onClick={()=> logOut()} size="small">
        Logout
      </Button>

    </div>
  );
}