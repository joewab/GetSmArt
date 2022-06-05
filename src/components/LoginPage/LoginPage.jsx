import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import {Box} from '@material-ui/core';

function LoginPage() {
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
      
      <LoginForm />
    
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
     
    </div>
  );
}

export default LoginPage;
