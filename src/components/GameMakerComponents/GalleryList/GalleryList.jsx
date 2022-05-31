import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import GalleryItem from '../GalleryItem/GalleryItem';
import { makeStyles } from '@material-ui/styles';
import { createTheme, ThemeProvider, Typography } from '@material-ui/core';


const useStyles = makeStyles({

    root: {
        display: 'flex',
        fontFamily: 'Quicksand'
        
    },
    

})

function GalleryList({galleryId, galleryName, imageId }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const gallery = useSelector(store => store.gallery.gallery);
    console.log('galleryName in GalleryList component:', galleryName);


    return (
        <Container>
        <Grid container spacing={2} className={classes.root}>
            {gallery && gallery.map((image) => {
                return (
                    <Grid key = {image.id} item sm={12} md={6} className={classes.root}>
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