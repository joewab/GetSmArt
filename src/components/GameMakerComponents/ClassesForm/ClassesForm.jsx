import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

//components---------------------------------------------
import LogOutButton from '../../LogOutButton/LogOutButton';
import GalleryList from '../GalleryList/GalleryList';
import MediaPicker from '../MediaPicker/MediaPicker';
import Nav from '../../Nav/Nav';
import UserPage from '../../UserPage/UserPage';


//materialUI----------------------------------------------
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import {Grid} from '@material-ui/core';
import {Drawer} from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { SwipeableDrawer } from '@material-ui/core';

function ClassesForm(){

    useEffect(() => {
        dispatch({ type: 'FETCH_GALLERIES' });
    }, []);

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const galleries = useSelector(store => store.gallery.galleries);
    const history = useHistory();


    function handleClick(){
        history.push('/gallery')
    }

    return(
        <Container>
            <Grid>
                <Grid item>
                    <Typography>{user.name}</Typography>
                </Grid>
                <Grid item>
                    <Typography onClick={handleClick}>Go to Gallery</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}


export default ClassesForm