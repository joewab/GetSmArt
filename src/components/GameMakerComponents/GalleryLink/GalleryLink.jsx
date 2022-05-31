//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

//components--------------------------------------------

//material--------------------------------------------
import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { Button, Paper } from '@mui/material';
import { Card } from '@material-ui/core';
import CardHeader from '@mui/material/CardHeader';
import { makeStyles } from '@material-ui/styles';
import Carousel from 'react-material-ui-carousel';


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
            <Carousel className={classes.galleryCard}
            autoPlay = {false}>
                {galleryImages.map((gallery) => {
                    return (

                        
                            <Card item key={gal.id} xs={4}>
                                <CardHeader
                                    disableTypography={true}
                                    className={classes.galleryHeading}
                                    title={gal.name}
                                />
                                <img src = {gallery.url}/>

                                <Button onClick={goToGallery}
                                    variant='filled'>
                                    go to gallery</Button>
                                <Button onClick={deleteGallery}
                                    variant='filled'>
                                    delete gallery</Button>
                            </Card>
                        


                    )
                })}
            </Carousel>

        </>
    )
}

export default GalleryLink