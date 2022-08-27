import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Box} from '@material-ui/core';
import {Button, Checkbox, FormControlLabel} from '@material-ui/core';




function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Box pt={15}>
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>

      <FormControlLabel 
        control={<Checkbox defaultChecked color="success"/>} 
        label="Register as an Instructor?" />

      <div>
      <Button
          variant ='contained'
          type="button"
          className="btn btn_asLink"
          onClick={registerUser}
        >
          Register
        </Button>
        </div>      
      </div>
    </form>
    </Box>
  );
}

export default RegisterForm;
