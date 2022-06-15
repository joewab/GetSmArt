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
import { Grid } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { SwipeableDrawer } from '@material-ui/core';

function ClassesForm() {

    useEffect(() => {
        dispatch({ type: 'FETCH_CLASSES' });
    }, []);

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const galleries = useSelector(store => store.gallery.galleries);
    const history = useHistory();

    const [newClassName, setNewClassName] = useState('')

    function createClass() {
        console.log('in createClass');
        if(newClassName === ''){
            swal("Please enter a class name!");
            return false
        }
        dispatch({
            type:'CREATE_CLASS',
            payload: newClassName
        })
    }


    function handleClick() {
        history.push('/gallery')
    }

    return (
        <Container>
            <Grid>
                <Grid item>
                    <Typography>{user.username}</Typography>
                </Grid>
                <Grid item>
                    <Typography>create new class:</Typography>
                </Grid>
                <Grid>
                    <TextField
                        required
                        id="outlined-required"
                        label="new class name"
                        defaultValue={newClassName}
                        onChange={(event) => setNewClassName(event.target.value)}
                    />

                    <Button variant='outlined' onClick={createClass}>create new class</Button>
                </Grid>
                <Grid item>
                    <Typography onClick={handleClick}>Go to Gallery</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}


export default ClassesForm