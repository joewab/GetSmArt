import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import GalleryItem from '../GalleryItem/GalleryItem';

function GalleryList() {

    const dispatch = useDispatch();
    const gallery = useSelector(store => store.gallery);

    useEffect(() => {
        dispatch({ type: 'FETCH_GALLERY' });
    }, []);

    return (
        <Container>
        <Grid container spacing={2}>
            {gallery && gallery.gallery.map((image) => {
                return (
                    <Grid key={image.id} item xs={12}>
                    <GalleryItem image={image} />
                    </Grid>
                )
            }
            )}
        </Grid>
        </Container>
    );
}

export default GalleryList;