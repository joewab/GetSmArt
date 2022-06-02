import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import GalleryItem from '../GalleryItem/GalleryItem';




function GalleryList({galleryId, galleryName, imageId }) {

    const gallery = useSelector(store => store.gallery.gallery);
    console.log('galleryName in GalleryList component:', galleryName);


    return (
        <Container container spacing={2}>
        <Grid container spacing={2}>
            {gallery && gallery.map((image) => {
                return (
                    <Grid key = {image.id} item sm={4}>
                    <GalleryItem galleryId={galleryId} image={image} galleryName={galleryName} imageId={imageId} />
                    </Grid>
                )
            }
            )}
        </Grid>
       
        </Container>
    );
}

export default GalleryList;