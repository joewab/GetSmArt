import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { CardContent } from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CardActions } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { createTheme, ThemeProvider, Typography } from '@material-ui/core';


const useStyles = makeStyles({

    root: {

        fontFamily: 'Quicksand'
        
    },
    

})


function GalleryItem({ image, galleryId, galleryName }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('galleryName in GalleryItem component:', galleryName);

    const theme = createTheme({
        typography: {
            fontFamily: 'Quicksand'
        }
    })

    const editImage = () => {
        dispatch({
            type: 'EDIT_IMAGE',
            payload: image.id
        });
        history.push(`/editimage/${galleryId}/${image.id}/${galleryName}`);
    }

    const deleteImage = () => {
        dispatch({
            type: 'DELETE_IMAGE',
            payload: {imageId: image.id, galleryId}
        })
    }

    return (
        <ThemeProvider theme={theme}>
        <Card key={image.id} elevation={10} >
            <CardHeader
                disableTypography = 'true'
                title={image.title}
            />
            <CardMedia
                component="img"
                height="194"
                image={image.url}
                alt={image.title}
            />
            <CardActions disableSpacing>
           
                <IconButton onClick={editImage}  aria-label="edit">
                    <EditIcon />
                </IconButton>
               
                <IconButton onClick={deleteImage} aria-label="delete">
                    <DeleteForeverIcon  />
                </IconButton>
            </CardActions>
        </Card>
        </ThemeProvider>
    )
}

export default GalleryItem