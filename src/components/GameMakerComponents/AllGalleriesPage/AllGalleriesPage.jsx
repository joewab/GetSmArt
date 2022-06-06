//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';


//components--------------------------------------------

import GalleryLink from '../GalleryLink/GalleryLink';
import Nav from '../../Nav/Nav';
import UserPage from '../../UserPage/UserPage';

//material--------------------------------------------
import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { Paper, Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { Box } from '@material-ui/core';






function AllGalleriesPage() {

    useEffect(() => {
        dispatch({ type: 'FETCH_GALLERIES' });
    }, []);

    const theme = createTheme({
        typography: {
            fontFamily: 'Quicksand'
        }
    })

    
    const dispatch = useDispatch();
    const history = useHistory();

    const galleries = useSelector(store => store.gallery.galleries);
    const user = useSelector(store => store.user)
    console.log('here are all the galleries', galleries);

    const [newGalleryName, setNewGalleryName] = useState('')

    function createGallery() {
        console.log('in createGallery');
        if(newGalleryName === ''){
            swal("Please enter a gallery name!");
            return false
        }
        dispatch({
            type:'CREATE_GALLERY',
            payload: newGalleryName
        })
    }

    


    return ( user.admin ?
        <>
        <Nav/>

        <Container>
            
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="outlined-required"
                        label="new gallery name"
                        defaultValue={newGalleryName}
                        onChange={(event) => setNewGalleryName(event.target.value)}
                    />
                    
                    <Button variant='outlined' onClick={createGallery}>create new gallery</Button>
                    </Grid>
                    </Grid>
        </Container>

        <Box pt={1} mb={5}>  </Box>
        
        <Container>
            <Grid container spacing={5}>
                
                {galleries.map((gal) => {
                    return(
                        <Grid item key={gal.id} xs={4} >
                        <GalleryLink gal={gal} />
                        </Grid>
                        
                    )
                })}
                
            </Grid>
        </Container>
        </>
        
        :
        <UserPage/>
    )
}

export default AllGalleriesPage