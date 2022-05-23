import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '@mui/material';
import { Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

const drawerWidth = 300

const useStyles = makeStyles({
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    root: {
        display: 'flex'
    },
    img: {
        width: 400
    }
    
})



function TeacherPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const gallery = useSelector(store => store.gallery)
    const history = useHistory();
    const classes = useStyles();
    const image = useSelector(store => store.image)

    function handleSubmit(e){
        e.preventDefault();
        console.log('in handleSubmit');
        }

  return (
    <div className="container">
      <h2>Welcome, teacher {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      
      <div className={classes.root}>
            <Container key={user.id}>
                <Grid container spacing={2}>
                    <Grid item key={user.id} xs={6}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="artist required"
                                    defaultValue='artist'
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="title required"
                                    defaultValue='title'
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="year required"
                                    defaultValue='year'
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="media required"
                                    defaultValue='media'
                                />
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Button onClick={handleSubmit}>submit</Button>
            <LogOutButton className="btn" />
            
            <Drawer
                className={classes.drawer}
                variant='permanent'
                anchor='right'
                classes={{ paper: classes.drawerPaper }}>
            </Drawer>
        </div>
    </div>
    
  );
}

// this allows us to use <App /> in index.js
export default TeacherPage;
