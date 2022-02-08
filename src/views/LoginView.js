import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Box } from '../components/Box/Box';

import { Button } from '@mui/material';
import { TextField } from '@mui/material';


import { useLoginMutation } from '../services/users';

const styles = {
  form: {
    width: 320,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
  },
  inputWrapped: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
  }
};

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { error }] = useLoginMutation();
  
  useEffect(() => {
    error && toast.error('Incorrect login or password')
  }, [error])

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Box>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <div style={styles.inputWrapped}>
          <TextField label="Email" variant="outlined"
            type="email" name="email" value={email} onChange={handleChange} autoFocus margin="normal"/>

        {/* <label style={styles.label}>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label> */}

        <TextField label="Password" variant="outlined"
        type="password" name="password" value={password} onChange={handleChange} autoComplete="off" margin="normal"/>

        {/* <label style={styles.label}>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            autoComplete="off"
          />
        </label> */}

        </div>

        <Button type="submit" variant="contained" >Enter</Button>
      </form>

      {error && <p>
        Don't have an account then please do{" "}
        <Link to="/register">Register</Link> yourself
      </p>}
    </Box>
    </>
  );
}