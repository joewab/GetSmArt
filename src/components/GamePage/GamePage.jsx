
//react, redux, saga stuff-------------------------------
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//material stuff-----------------------------------------
import { Button } from '@mui/material';
import { Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

const useStyles = makeStyles({
    root: {
        display: 'flex'
    },
    img: {
        height: 400
    }
    
})


function GamePage(){

    useEffect(() => {
        dispatch({ type: 'FETCH_GALLERY' });
    }, []);

    const classes = useStyles();
    const gallery = useSelector(store => store.gallery.gallery);
    const gallerySlideNumber = useSelector(store => store.gallery.galleryCount)
    const dispatch = useDispatch();

    console.log('this is gallery on gamepage:',gallery);


    const handleGallerySlideIncrement = () => {
        dispatch({
            type: 'INCREMENT_GALLERY',
        })
    }

    return(
        
        <Container className={classes.root}>
            <Grid>
                 <Grid item xs={6}>
                    <img className={classes.img} src={gallery[gallerySlideNumber] && gallery[gallerySlideNumber].url}/>
                </Grid>
                <Grid item xs={6}>
                   <Box component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off">
                       <Typography>Game!</Typography>
                       {/* Only show the first image in the gallery 
                       ideas: conditional rendering based on image id
                       use incrementing state to pull image out of an array*/}
                       <Typography>{gallerySlideNumber}</Typography>

                       <Button onClick={handleGallerySlideIncrement}>Skip to next</Button>

                   </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default GamePage