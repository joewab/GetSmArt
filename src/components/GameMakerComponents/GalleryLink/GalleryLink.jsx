//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

//components--------------------------------------------

//material--------------------------------------------
import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Card } from '@material-ui/core';



function GalleryLink({ gal }) {
    const history = useHistory();
    const dispatch = useDispatch();

    console.log('this is gal', gal);

    function goToGallery() {
        history.push(`/addgallery/${gal.id}/${gal.name}`)
    }

    function deleteGallery(){
        console.log('in deleteGallery');
        dispatch({
            type: 'DELETE_GALLERY',
            payload: gal.id
        })
    }

    return (
        <>
            <Grid item key={gal.id} xs={4}>
                <Card>
                    <Typography>{gal.name}</Typography>
                    <Button onClick={goToGallery}
                        variant='filled'>
                        go to gallery</Button>
                    <Button onClick={deleteGallery}
                        variant='filled'>
                        delete gallery</Button>
                </Card>
            </Grid>
        </>
    )
}

export default GalleryLink