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



function GalleryLink({gal}) {
    const history = useHistory();

    function goToGallery() {
        history.push(`/addgallery/${gal.id}`)
    }

    return (
        <>
            <Grid item key={gal.id}>
                <Typography>{gal.name}</Typography>
            </Grid>
            <Grid item>
                <Button onClick={goToGallery}
                    variant='filled'>
                    go to gallery</Button>
            </Grid>
        </>
    )
}

export default GalleryLink