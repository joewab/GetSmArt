import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

import { makeStyles } from '@material-ui/core';
import {Button} from '@material-ui/core';


import Nav from '../Nav/Nav';




function RegisterPage() {
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundImage: 'url(https://sothebys-com.brightspotcdn.com/dims4/default/765e4e3/2147483647/strip/true/crop/2000x1131+0+184/resize/1156x654!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2Fed%2Ff5%2F66e534af231091f14c402ea26a78%2F1-14-west-gallery-b-2010-2000.jpg)',
      backgroundSize: "cover",
      minHeight: '100vh'
    }
  }))

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Nav />
      <RegisterForm />

      <center>
        <Button
          variant='contained'
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
