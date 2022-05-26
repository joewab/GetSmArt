import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import GalleryItem from '../GalleryItem/GalleryItem';

function GalleryList({galleryId}) {

    const dispatch = useDispatch();
    const gallery = useSelector(store => store.gallery.gallery);
    console.log('this is the gallery reducer:', gallery);
    console.log('this is the galleryId:', galleryId);


    return (
        <Container>
        <Grid container spacing={2}>
            {gallery && gallery.map((image) => {
                return (
                    <Grid key = {image.id} item xs={12}>
                    <GalleryItem galleryId={galleryId} image={image} />
                    </Grid>
                )
            }
            )}
        </Grid>
        </Container>
    );
}

export default GalleryList;