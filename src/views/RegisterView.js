import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../services/users';

import { Box } from '../components/Box/Box';

import { Button } from '@mui/material';
import { TextField } from '@mui/material';

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

export default function RegisterView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [register, { error }] = useRegisterMutation()

  useEffect(() => {
    if (error?.data.name === 'MongoError') {
      toast.error('You already have an account  or your name entered incorrectly!')
    };

    if (error?.data.errors?.email) {
      toast.error(`${error.data.errors.email.message}`);
    }
    
    if (error?.data.errors?.password) {
      toast.error(`${error.data.errors.password.message}`);
    };
  
  }, [error]);


  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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

    await register({ name, email, password });
    
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Box>
      <h1>Registration</h1>

      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <div style={styles.inputWrapped}>
          {/* <label style={styles.label}>
          Name
          <input type="text" name="name" value={name}
            onChange={handleChange}
            // placeholder="Enter Name..."
          />
        </label> */}

        <TextField label="Name" variant="outlined"
            type="text" name="name" value={name} onChange={handleChange} autoFocus margin="normal"/>

        {/* <label style={styles.label}>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            // placeholder="Enter Email..."
          />
        </label> */}

        <TextField label="Email" variant="outlined"
            type="email" name="email" value={email} onChange={handleChange} margin="normal"/>

        {/* <label style={styles.label}>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            autoComplete="off"
            // placeholder='Enter Password...'
          />
        </label> */}

        <TextField label="Password" variant="outlined"
        type="password" name="password" value={password} onChange={handleChange} autoComplete="off" margin="normal"/>
        </div>
        
        {/* <button type="submit" >Register</button> */}
        <Button type="submit" variant="contained" >Register</Button>
      </form>

      {(error?.data.name === 'MongoError') && <p>
        Already have an account then please <Link to="/login">Login</Link>
      </p>}
    </Box>
  );
}