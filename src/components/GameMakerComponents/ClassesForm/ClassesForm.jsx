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
import ClassLink from '../ClassLink/ClassLink';


//materialUI----------------------------------------------
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

function ClassesForm() {

    useEffect(() => {
        dispatch({ type: 'FETCH_CLASSES' });
    }, []);

    //variables that are react functions--------------------------------
    const dispatch = useDispatch();
    const history = useHistory();

    //variables that evaluate to something specific from the store or params---------
    const user = useSelector((store) => store.user);
    const classes = useSelector(store => store.classes.classes);


    //local state--------------------------------------------------------------
    const [newClassName, setNewClassName] = useState('');
    const [newClass, setNewClass] = React.useState('');


    function createClass() {
        console.log('in createClass');
        if (newClassName === '') {
            swal("Please enter a class name!");
            return false
        }
        dispatch({
            type: 'CREATE_CLASS',
            payload: newClassName
        })
    }

    function goToClassGalleries() {
        history.push(`/gallery/${newClass}`);
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
                
                    
                        {classes.map((thisClass) => {
                            return (
                                <Grid item>
                                    <ClassLink thisClass={thisClass}/>
                                </Grid>
                            )
                            
                        })}
                    
                
                <Grid item>
                    <Button variant='outlined' onClick={goToClassGalleries}>Go to class galleries</Button>

                </Grid>
            </Grid>
        </Container>
    )
}


export default ClassesForm