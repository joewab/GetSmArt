//react, redux, saga -------------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

//components--------------------------------------------

//material--------------------------------------------
import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Card } from '@material-ui/core';
import CardHeader from '@mui/material/CardHeader';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    
    galleryHeading: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        fontSize: 20
        
    }

})




function GalleryLink({ gal }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();


    console.log('this is gal', gal);

    function goToGallery() {
        history.push(`/addgallery/${gal.id}/${gal.name}`)
    }

    function deleteGallery(){
        console.log('in deleteGallery');
        dispatch({
            type: 'DELETE_GALLERY',
            payload: gal.id
        })
    }

    return (
        <>
            <Grid item key={gal.id} xs={4}>
                <Card>
                <CardHeader
                disableTypography = 'true'
                className={classes.galleryHeading}
                title={gal.name}
            />
            
                    <Button onClick={goToGallery}
                        variant='filled'>
                        go to gallery</Button>
                    <Button onClick={deleteGallery}
                        variant='filled'>
                        delete gallery</Button>
                </Card>
            </Grid>
        </>
    )
}

export default GalleryLink