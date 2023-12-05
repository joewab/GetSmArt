//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';


//components--------------------------------------------

import GalleryLink from '../GalleryLink/GalleryLink';
import Nav from '../../Nav/Nav';
import AllGamesPage from '../../GamePlayerComponents/AllGamesPage/AllGamesPage';

//material--------------------------------------------
import { Container, 
         Grid, 
         Button, 
         TextField,  
         Box } from '@material-ui/core';


function AllGalleriesPage() {
    useEffect(() => {
        dispatch({
            type: 'FETCH_GALLERIES',
            payload: {className, classId}
        });
    }, []);

    const params = useParams();
    const dispatch = useDispatch();
    const galleries = useSelector(store => store.gallery.galleries);
    const user = useSelector(store => store.user);
    const className = params.className;
    const classId = params.classId;

    const [newGalleryName, setNewGalleryName] = useState('')

    function createGallery() {
        if (newGalleryName === '') {
            swal("Please enter a gallery name!");
            return false
        }
        dispatch({
            type: 'CREATE_GALLERY',
            payload: {newGalleryName, classId}
        })
    }




    return (user.admin ?
        <>
            <Nav />

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
                        return (
                            <Grid item key={gal.id} xs={4} >
                                <GalleryLink gal={gal} />
                            </Grid>

                        )
                    })}

                </Grid>
            </Container>
        </>

        :
        <AllGamesPage />
    )
}

export default AllGalleriesPage