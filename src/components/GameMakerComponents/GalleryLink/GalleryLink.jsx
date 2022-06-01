//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

//components--------------------------------------------

//material--------------------------------------------
import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { Button, Paper } from '@material-ui/core';
import { Card } from '@material-ui/core';
import {CardHeader} from '@material-ui/core';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/styles';
import Carousel from 'react-material-ui-carousel';
import Theme from '../../_theme/_theme';



const useStyles = makeStyles({

    galleryHeading: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        fontSize: 20

    },
    galleryCard: {
        width: 'auto',

    }

})




function GalleryLink({ gal }) {

    useEffect(() => {
        dispatch({
            type: 'FETCH_GALLERY',
            payload: gal.id
        });

    }, [])

    // const Theme = useTheme({
    //     palette: {
    //         primary: {
    //             main: '#9fc8a5',
    //             contrastText: '#e1f0e2'
    //         },
    //         secondary: {
    //             main: '#e1f0e2',
    //             contrastText: '#9fc8a5'
    //         }
    //     }
    // })

    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const galleryImages = useSelector(store => store.gallery.gallery);

    console.log('galleryImages in gallery link:', galleryImages);


    console.log('this is gal', gal);

    function goToGallery() {
        history.push(`/addgallery/${gal.id}/${gal.name}`)
    }

    function deleteGallery() {
        console.log('in deleteGallery');
        dispatch({
            type: 'DELETE_GALLERY',
            payload: gal.id
        })
    }

    return (
        <>
            <ThemeProvider theme={Theme}>
                <Card item key={gal.id} xs={4}>
                    <CardHeader
                        disableTypography={true}
                        className={classes.galleryHeading}
                        title={gal.name}
                    />

                    <ThemeProvider theme={Theme}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={goToGallery}>
                            go to gallery</Button>
                    </ThemeProvider>
                    <Button onClick={deleteGallery}
                        variant='filled'>
                        delete gallery</Button>
                </Card>
            </ThemeProvider>
        </>
    )
}

export default GalleryLink