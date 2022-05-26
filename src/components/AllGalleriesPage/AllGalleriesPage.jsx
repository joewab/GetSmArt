//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';


//components--------------------------------------------

import GalleryLink from '../GalleryLink/GalleryLink';
import Nav from '../Nav/Nav';

//material--------------------------------------------
import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { Button } from '@material-ui/core';
import { TextField } from '@mui/material';



function AllGalleriesPage() {

    useEffect(() => {
        dispatch({ type: 'FETCH_GALLERIES' });
    }, []);

    const dispatch = useDispatch();
    const history = useHistory();

    const galleries = useSelector(store => store.gallery.galleries)
    console.log('here are all the galleries', galleries);

    const [newGalleryName, setNewGalleryName] = useState('')

    function createGallery() {
        console.log('in createGallery');
        dispatch({
            type:'CREATE_GALLERY',
            payload: newGalleryName
        })
        history.push(`/addgallery/${newGalleryName}`)
    }

    return (
        <Container>
            <Nav/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="outlined-required"
                        label="new gallery name"
                        defaultValue={newGalleryName}
                        onChange={(event) => setNewGalleryName(event.target.value)}
                    />
                    <Button onClick={createGallery}>create new gallery</Button>
                </Grid>
                {galleries.map((gal) => {
                    return(
                        <GalleryLink key={gal.id} gal={gal} />
                    )
                })}
                
            </Grid>
        </Container>
    )
}

export default AllGalleriesPage