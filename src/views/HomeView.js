import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import textImg from '../images/imagehand.png';
import { selectIsLoggedIn } from '../redux/auth/authSlice';

import Icon from '@mui/material/Icon';

const styles = {
  container: {
    minHeight: 'calc(100vh - 100px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 500,
    fontSize: 48,
    textAlign: 'center',
  },
  section: {
    position: 'relative',
    // margin: '0 auto',
    // backgroundImage: `url(${phonImg})`,
    // backgroundColor: 'transparent',
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // opacity: '0.3',
    backgroundImage: 'linear-gradient(to right top, #d18ba5, #c777b9, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #48eefa, #5ffbf1)',
  },
  messege: {
    position: 'absolute',
    top: '0%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

const HomeView = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
    <section style={styles.section}>
      <div style={styles.container}>
    <h1 style={styles.title}>
      Welcome to Phonebook{' '}
      <span role="img" aria-label="Иконка приветствия">
        <Icon color="primary" fontSize="large">settings_phone</Icon>
      </span>
    </h1>
      
        </div>
        <p style={styles.text}>Be always in touch<img src={textImg} alt='' width={32}></img></p>

        {!isLoggedIn &&
          <div style={styles.messege}>
            <h2>It seem's like you are not login</h2>
            <h3>
              If you have an account, then please <Link to="/login">Login</Link>
            </h3>
            <h3>
              Don't have an account, then please do{" "}
              <Link to="/register">Register</Link>
            </h3>
          </div>}
        
      </section>
      
  
  </>
  )
};

export default HomeView;